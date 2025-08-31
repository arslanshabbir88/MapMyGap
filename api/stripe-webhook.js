import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout completed:', session.id);
        
        // Store subscription data in Supabase
        if (session.metadata?.userId && session.subscription) {
          try {
            // Get subscription details
            const subscription = await stripe.subscriptions.retrieve(session.subscription);
            const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
            
            // Determine plan type
            let planType = 'Unknown';
            if (price.id === 'price_1S1q8O2LOmx0fW2YpttvoaCs') planType = 'Trial';
            else if (price.id === 'price_1S1gdB2LOmx0fW2YClgvwNTc') planType = 'Starter';
            else if (price.id === 'price_1S1ghh2LOmx0fW2YWE0mjvJ0') planType = 'Professional';
            else if (price.id === 'price_1S1gjU2LOmx0fW2YkA4x8uKK') planType = 'Enterprise';
            
            // Store in Supabase
            const { error } = await supabase
              .from('subscriptions')
              .upsert({
                user_id: session.metadata.userId,
                stripe_subscription_id: subscription.id,
                stripe_customer_id: session.customer,
                plan_type: planType,
                status: subscription.status,
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                created_at: new Date().toISOString()
              }, {
                onConflict: 'user_id'
              });
            
            if (error) {
              console.error('Error storing subscription in Supabase:', error);
            } else {
              console.log('Subscription stored in Supabase successfully');
            }
          } catch (error) {
            console.error('Error processing checkout session:', error);
          }
        }
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object;
        console.log('Subscription created:', subscription.id);
        
        // Update subscription in Supabase
        try {
          const price = await stripe.prices.retrieve(subscription.items.data[0].price.id);
          
          let planType = 'Unknown';
          if (price.id === 'price_1S1q8O2LOmx0fW2YpttvoaCs') planType = 'Trial';
          else if (price.id === 'price_1S1gdB2LOmx0fW2YClgvwNTc') planType = 'Starter';
          else if (price.id === 'price_1S1ghh2LOmx0fW2YWE0mjvJ0') planType = 'Professional';
          else if (price.id === 'price_1S1gjU2LOmx0fW2YkA4x8uKK') planType = 'Enterprise';
          
          const { error } = await supabase
            .from('subscriptions')
            .upsert({
              stripe_subscription_id: subscription.id,
              stripe_customer_id: subscription.customer,
              plan_type: planType,
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'stripe_subscription_id'
            });
          
          if (error) {
            console.error('Error updating subscription in Supabase:', error);
          }
        } catch (error) {
          console.error('Error processing subscription created:', error);
        }
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log('Subscription updated:', updatedSubscription.id);
        
        // Update subscription in Supabase
        try {
          const price = await stripe.prices.retrieve(updatedSubscription.items.data[0].price.id);
          
          let planType = 'Unknown';
          if (price.id === 'price_1S1q8O2LOmx0fW2YpttvoaCs') planType = 'Trial';
          else if (price.id === 'price_1S1gdB2LOmx0fW2YClgvwNTc') planType = 'Starter';
          else if (price.id === 'price_1S1ghh2LOmx0fW2YWE0mjvJ0') planType = 'Professional';
          else if (price.id === 'price_1S1gjU2LOmx0fW2YkA4x8uKK') planType = 'Enterprise';
          
          const { error } = await supabase
            .from('subscriptions')
            .upsert({
              stripe_subscription_id: updatedSubscription.id,
              stripe_customer_id: updatedSubscription.customer,
              plan_type: planType,
              status: updatedSubscription.status,
              current_period_end: new Date(updatedSubscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'stripe_subscription_id'
            });
          
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
    res.status(500).json({ error: 'Failed to process webhook' });
  }
}
