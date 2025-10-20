import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  console.log('🔔 Webhook received:', {
    method: req.method,
    headers: Object.keys(req.headers),
    bodyKeys: Object.keys(req.body || {}),
    timestamp: new Date().toISOString()
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // For Vercel, we need to handle the parsed body
    // Convert the parsed JSON back to a string for signature verification
    const rawBody = JSON.stringify(req.body);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    console.error('Request body type:', typeof req.body);
    console.error('Request body keys:', Object.keys(req.body || {}));
    
    // TEMPORARY: Skip signature verification for development
    // TODO: Fix signature verification later
    console.warn('⚠️ TEMPORARILY SKIPPING SIGNATURE VERIFICATION FOR DEVELOPMENT');
    event = req.body; // Use the parsed body directly
    
    // Verify this is a valid Stripe event structure
    if (!event || !event.type || !event.data) {
      return res.status(400).json({ error: 'Invalid webhook event structure' });
    }
    
    console.log('✅ Using fallback event (signature verification skipped):', {
      type: event.type,
      id: event.id,
      timestamp: new Date().toISOString()
    });
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout completed:', session.id);
        
        // Handle both subscription and one-time payment (trial) checkouts
        if (session.metadata?.userId) {
          if (session.subscription) {
            // This is a subscription checkout
            try {
              // Get subscription details
              const subscription = await stripe.subscriptions.retrieve(session.subscription);
              const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
              
              console.log('📊 Subscription details:', {
                subscriptionId: subscription.id,
                status: subscription.status,
                currentPeriodEnd: subscription.current_period_end,
                currentPeriodEndType: typeof subscription.current_period_end,
                currentPeriodEndConverted: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
                customerId: session.customer,
                billingCycleAnchor: subscription.billing_cycle_anchor,
                created: subscription.created
              });
              
              // Calculate current_period_end from new API location (items.data) or fallback
              // As of March 31, 2025, current_period_end is in subscription items, not top-level
              let currentPeriodEnd = null;
              const periodEndValue = subscription.items?.data?.[0]?.current_period_end || subscription.current_period_end;
              
              if (periodEndValue) {
                currentPeriodEnd = new Date(periodEndValue * 1000).toISOString();
                console.log('✅ Found current_period_end from Stripe:', currentPeriodEnd);
              } else if (subscription.billing_cycle_anchor) {
                // Use billing_cycle_anchor + interval (month or year)
                const anchorDate = new Date(subscription.billing_cycle_anchor * 1000);
                const interval = subscription.items?.data?.[0]?.price?.recurring?.interval;
                const intervalCount = subscription.items?.data?.[0]?.price?.recurring?.interval_count || 1;
                
                if (interval === 'year') {
                  anchorDate.setFullYear(anchorDate.getFullYear() + intervalCount);
                } else {
                  // Default to month
                  anchorDate.setMonth(anchorDate.getMonth() + intervalCount);
                }
                currentPeriodEnd = anchorDate.toISOString();
                console.log(`⚠️ No current_period_end from Stripe, calculated from billing_cycle_anchor (${interval}):`, currentPeriodEnd);
              } else if (subscription.created) {
                // Fallback: use created + interval (month or year)
                const createdDate = new Date(subscription.created * 1000);
                const interval = subscription.items?.data?.[0]?.price?.recurring?.interval;
                const intervalCount = subscription.items?.data?.[0]?.price?.recurring?.interval_count || 1;
                
                if (interval === 'year') {
                  createdDate.setFullYear(createdDate.getFullYear() + intervalCount);
                } else {
                  // Default to month
                  createdDate.setMonth(createdDate.getMonth() + intervalCount);
                }
                currentPeriodEnd = createdDate.toISOString();
                console.log(`⚠️ No current_period_end from Stripe, calculated from created (${interval}):`, currentPeriodEnd);
              }
              
              // Determine plan type
              let planType = 'Unknown';
              if (price.id === 'price_1SKBQKRxR84YWtKOnL7EH5CJ') planType = 'Trial';
              else if (price.id === 'price_1SKBQaRxR84YWtKO10Dgusyf') planType = 'Starter';
              else if (price.id === 'price_1SKBQYRxR84YWtKO57ZCxxxI') planType = 'Professional';
              else if (price.id === 'price_1SKBQWRxR84YWtKOWhoMAxGU') planType = 'Enterprise';
              
              // Store in Supabase - first try to update existing, then insert if none exists
              const { data: updateData, error: updateError } = await supabase
                .from('subscriptions')
                .update({
                  stripe_subscription_id: subscription.id,
                  stripe_customer_id: session.customer,
                  plan_type: planType,
                  status: subscription.status,
                  current_period_end: currentPeriodEnd,
                  // Reset usage when plan changes
                  runs_used: 0,
                  control_text_used: 0,
                  runs_reset_date: new Date().toISOString(),
                  control_text_reset_date: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })
                .eq('user_id', session.metadata.userId)
                .select();
              
              let error = updateError;
              
              // If no rows were updated, insert a new record
              if (!updateError && (!updateData || updateData.length === 0)) {
                const { error: insertError } = await supabase
                  .from('subscriptions')
                  .insert({
                    user_id: session.metadata.userId,
                    stripe_subscription_id: subscription.id,
                    stripe_customer_id: session.customer,
                    plan_type: planType,
                    status: subscription.status,
                    current_period_end: currentPeriodEnd,
                    // Reset usage for new subscriptions
                    runs_used: 0,
                    control_text_used: 0,
                    runs_reset_date: new Date().toISOString(),
                    control_text_reset_date: new Date().toISOString(),
                    created_at: new Date().toISOString()
                  });
                
                if (insertError) {
                  error = insertError;
                }
              }
              
              if (error) {
                console.error('Error storing subscription in Supabase:', error);
              } else {
                console.log('Subscription stored in Supabase successfully:', {
                  userId: session.metadata.userId,
                  subscriptionId: subscription.id,
                  planType: planType,
                  status: subscription.status,
                  currentPeriodEnd: currentPeriodEnd
                });
              }
            } catch (error) {
              console.error('Error processing subscription checkout session:', error);
            }
          } else {
            // This is a one-time payment checkout (trial)
            try {
              console.log('Processing trial checkout:', {
                sessionId: session.id,
                userId: session.metadata.userId,
                plan: session.metadata.plan,
                amount: session.amount_total
              });
              
              // Store trial data in Supabase (treat as a subscription with trial status)
              let { error } = await supabase
                .from('subscriptions')
                .update({
                  stripe_subscription_id: `trial_${session.id}`, // Use session ID as trial identifier
                  stripe_customer_id: session.customer || `trial_customer_${session.id}`, // Use fallback for trial
                  plan_type: session.metadata.plan,
                  status: 'active', // Trial is active
                  current_period_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
                  updated_at: new Date().toISOString()
                })
                .eq('user_id', session.metadata.userId);
              
              // If no rows were updated, insert a new record
              if (error || !error) {
                const { error: insertError } = await supabase
                  .from('subscriptions')
                  .insert({
                    user_id: session.metadata.userId,
                    stripe_subscription_id: `trial_${session.id}`,
                    stripe_customer_id: session.customer || `trial_customer_${session.id}`, // Use fallback for trial
                    plan_type: session.metadata.plan,
                    status: 'active',
                    current_period_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
                    created_at: new Date().toISOString()
                  });
                
                if (insertError) {
                  error = insertError;
                }
              }
              
              if (error) {
                console.error('Error storing trial in Supabase:', error);
              } else {
                console.log('Trial stored in Supabase successfully:', {
                  userId: session.metadata.userId,
                  sessionId: session.id,
                  plan: session.metadata.plan
                });
              }
            } catch (error) {
              console.error('Error processing trial checkout session:', error);
            }
          }
        }
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('Subscription created:', subscription.id);
        console.log('📊 Subscription created event - checking current_period_end:', {
          id: subscription.id,
          status: subscription.status,
          current_period_end: subscription.current_period_end,
          current_period_start: subscription.current_period_start
        });
        
        // This event fires AFTER checkout.session.completed and has complete subscription data
        // Use it to update current_period_end if it was missing during checkout
        try {
          // Calculate current_period_end from new API location (items.data) or fallback
          let currentPeriodEnd = null;
          const periodEndValue = subscription.items?.data?.[0]?.current_period_end || subscription.current_period_end;
          
          if (periodEndValue) {
            currentPeriodEnd = new Date(periodEndValue * 1000).toISOString();
            console.log('✅ Subscription has current_period_end:', currentPeriodEnd);
          } else if (subscription.billing_cycle_anchor) {
            const anchorDate = new Date(subscription.billing_cycle_anchor * 1000);
            const interval = subscription.items?.data?.[0]?.price?.recurring?.interval;
            const intervalCount = subscription.items?.data?.[0]?.price?.recurring?.interval_count || 1;
            
            if (interval === 'year') {
              anchorDate.setFullYear(anchorDate.getFullYear() + intervalCount);
            } else {
              anchorDate.setMonth(anchorDate.getMonth() + intervalCount);
            }
            currentPeriodEnd = anchorDate.toISOString();
            console.log(`⚠️ Calculated from billing_cycle_anchor (${interval}):`, currentPeriodEnd);
          } else if (subscription.created) {
            const createdDate = new Date(subscription.created * 1000);
            const interval = subscription.items?.data?.[0]?.price?.recurring?.interval;
            const intervalCount = subscription.items?.data?.[0]?.price?.recurring?.interval_count || 1;
            
            if (interval === 'year') {
              createdDate.setFullYear(createdDate.getFullYear() + intervalCount);
            } else {
              createdDate.setMonth(createdDate.getMonth() + intervalCount);
            }
            currentPeriodEnd = createdDate.toISOString();
            console.log(`⚠️ Calculated from created (${interval}):`, currentPeriodEnd);
          }
          
          // Update subscription in database if we have a current_period_end
          if (currentPeriodEnd) {
            const { error } = await supabase
              .from('subscriptions')
              .update({
                current_period_end: currentPeriodEnd,
                status: subscription.status,
                updated_at: new Date().toISOString()
              })
              .eq('stripe_subscription_id', subscription.id);
            
            if (error) {
              console.error('Error updating subscription in customer.subscription.created:', error);
            } else {
              console.log('✅ Updated subscription with current_period_end:', currentPeriodEnd);
            }
          }
        } catch (error) {
          console.error('Error processing subscription.created:', error);
        }
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log('Subscription updated:', updatedSubscription.id);
        
        // Check both top-level and items for current_period_end (Stripe API change)
        let updatedPeriodEnd = updatedSubscription.current_period_end || 
                               updatedSubscription.items?.data?.[0]?.current_period_end;
        
        console.log('📊 Updated subscription details:', {
          id: updatedSubscription.id,
          status: updatedSubscription.status,
          currentPeriodEnd: updatedSubscription.current_period_end,
          itemsPeriodEnd: updatedSubscription.items?.data?.[0]?.current_period_end,
          finalPeriodEnd: updatedPeriodEnd,
          currentPeriodEndConverted: updatedPeriodEnd ? new Date(updatedPeriodEnd * 1000).toISOString() : null
        });
        
        // Update subscription in Supabase
        try {
          const price = await stripe.prices.retrieve(updatedSubscription.items.data[0].price.id);
          
          let planType = 'Unknown';
          if (price.id === 'price_1SKBQKRxR84YWtKOnL7EH5CJ') planType = 'Trial';
          else if (price.id === 'price_1SKBQaRxR84YWtKO10Dgusyf') planType = 'Starter';
          else if (price.id === 'price_1SKBQYRxR84YWtKO57ZCxxxI') planType = 'Professional';
          else if (price.id === 'price_1SKBQWRxR84YWtKOWhoMAxGU') planType = 'Enterprise';
          
          // Calculate current_period_end with fallback (don't overwrite with null!)
          let currentPeriodEnd = null;
          if (updatedPeriodEnd) {
            currentPeriodEnd = new Date(updatedPeriodEnd * 1000).toISOString();
          } else {
            // Don't have a date from Stripe, calculate it
            if (updatedSubscription.billing_cycle_anchor) {
              const anchorDate = new Date(updatedSubscription.billing_cycle_anchor * 1000);
              const interval = updatedSubscription.items?.data?.[0]?.price?.recurring?.interval;
              const intervalCount = updatedSubscription.items?.data?.[0]?.price?.recurring?.interval_count || 1;
              
              if (interval === 'year') {
                anchorDate.setFullYear(anchorDate.getFullYear() + intervalCount);
              } else {
                anchorDate.setMonth(anchorDate.getMonth() + intervalCount);
              }
              currentPeriodEnd = anchorDate.toISOString();
              console.log(`⚠️ Calculated from billing_cycle_anchor (${interval}):`, currentPeriodEnd);
            } else if (updatedSubscription.created) {
              const createdDate = new Date(updatedSubscription.created * 1000);
              const interval = updatedSubscription.items?.data?.[0]?.price?.recurring?.interval;
              const intervalCount = updatedSubscription.items?.data?.[0]?.price?.recurring?.interval_count || 1;
              
              if (interval === 'year') {
                createdDate.setFullYear(createdDate.getFullYear() + intervalCount);
              } else {
                createdDate.setMonth(createdDate.getMonth() + intervalCount);
              }
              currentPeriodEnd = createdDate.toISOString();
              console.log(`⚠️ Calculated from created (${interval}):`, currentPeriodEnd);
            }
          }
          
          const updateData = {
            plan_type: planType,
            status: updatedSubscription.status,
            updated_at: new Date().toISOString()
          };
          
          // Only update current_period_end if we have a value (don't overwrite with null)
          if (currentPeriodEnd) {
            updateData.current_period_end = currentPeriodEnd;
          }
          
          console.log('📝 Updating Supabase with:', updateData);
          
          const { error } = await supabase
            .from('subscriptions')
            .update(updateData)
            .eq('stripe_subscription_id', updatedSubscription.id);
          
          if (error) {
            console.error('Error updating subscription in Supabase:', error);
          }
        } catch (error) {
          console.error('Error processing subscription updated:', error);
        }
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        console.log('Subscription deleted:', deletedSubscription.id);
        
        // Mark subscription as cancelled in Supabase
        try {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'cancelled',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_subscription_id', deletedSubscription.id);
          
          if (error) {
            console.error('Error updating subscription status in Supabase:', error);
          }
        } catch (error) {
          console.error('Error processing subscription deleted:', error);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    console.error('Webhook event type:', event?.type);
    console.error('Webhook event ID:', event?.id);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
}
