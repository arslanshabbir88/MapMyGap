# Stripe Setup: No-Card Trial (Email Only)

## Overview
This guide shows you how to set up a trial in Stripe that only requires an email address, no credit card information.

---

## Step 1: Create a $0/Month Trial Product in Stripe

### In Stripe Dashboard:

1. **Go to:** Products → Click **"+ Add product"**

2. **Product Details:**
   - **Name:** `14-Day Free Trial`
   - **Description:** `Free 14-day trial - No credit card required`
   - **Pricing model:** Select **"Recurring"**

3. **Price Configuration:**
   - **Price:** `$0.00 USD`
   - **Billing period:** `Monthly` (or `Yearly` - doesn't matter since it's $0)
   - **Recurring:** ✅ Yes
   - **Trial period:** `14 days` ⭐ **IMPORTANT: Set this here**
   - Click **"Save product"**

4. **Copy the Price ID:**
   - After creating, you'll see a Price ID like: `price_1XXXXX...`
   - **Copy this ID** - you'll need it for your code

---

## Step 2: Alternative Approach (Subscription with Trial Period)

If you prefer to use your existing paid plan prices with a trial period:

### Option A: Add Trial Period to Existing Plans

1. **Go to:** Products → Select your existing **"Trial"** product
2. **Edit the price:**
   - Set **Trial period:** `14 days`
   - This allows users to subscribe to a paid plan but get 14 days free before first charge

### Option B: Create a Separate $0 Trial Product (Recommended)

This is cleaner because:
- Users get access immediately without any payment intent
- No confusion about "when will I be charged"
- Easier to track trial vs. paid users

**Use the $0 product from Step 1.**

---

## Step 3: Configure Checkout Session (Code Changes Needed)

Your checkout session needs to:
1. **Not require payment method** for trial
2. **Use subscription mode** (not payment mode) with trial period
3. **Allow checkout without card**

### Current Code Analysis:

Looking at your `api/create-checkout-session.js`:
- Currently uses `mode: 'payment'` for trials
- Sets `payment_method_types: []` (good!)
- But `payment` mode might still show card fields

### What Needs to Change:

**For Trial Plans:**
- Use `mode: 'subscription'` (not `payment`)
- Set `payment_method_collection: 'if_required'` or `'never'`
- Use the $0 price with 14-day trial period
- Stripe will automatically skip payment collection for $0 subscriptions

---

## Step 4: Stripe Dashboard Settings

### Checkout Settings:

1. **Go to:** Settings → Checkout → Customer options
2. **Enable:**
   - ✅ "Collect phone number" (optional, but good for B2B)
   - ✅ "Collect billing address" (you already have this)

### Subscription Settings:

1. **Go to:** Settings → Subscriptions
2. **Trial behavior:**
   - ✅ "Allow customers to start subscriptions with a trial"
   - This should already be enabled

---

## Step 5: Webhook Configuration

Your existing webhook handler should already work, but verify:

### Events to Listen For:

- ✅ `checkout.session.completed` - When trial starts
- ✅ `customer.subscription.created` - When subscription is created
- ✅ `customer.subscription.updated` - When trial converts to paid
- ✅ `customer.subscription.trial_will_end` - 3 days before trial ends (optional, for email reminders)

### Important Webhook Behavior:

When a user signs up for a $0 trial:
1. `checkout.session.completed` fires immediately
2. `customer.subscription.created` fires with `status: 'trialing'`
3. `current_period_end` will be 14 days from now
4. After 14 days, if no payment method added:
   - Subscription status changes to `past_due` or `unpaid`
   - You can cancel it automatically

---

## Step 6: Code Implementation Outline

### What Your Code Needs to Do:

1. **Create Checkout Session for Trial:**
   ```javascript
   // Use subscription mode with $0 price
   mode: 'subscription',
   payment_method_collection: 'if_required', // or 'never' for pure email-only
   line_items: [{
     price: 'price_1SKBQKRxR84YWtKOnL7EH5CJ', // Your $0 trial price ID
   }],
   ```

2. **Handle Trial Conversion:**
   - Before trial ends, prompt user to add payment method
   - Use Stripe's "Update subscription" or "Add payment method" flow
   - Or redirect to pricing page to choose a paid plan

3. **Webhook Handling:**
   - Your existing webhook should handle `status: 'trialing'`
   - Store `trial_end` date in your database
   - Track when trial converts to `active` (paid)

---

## Step 7: Testing the Flow

### Test in Stripe Test Mode:

1. **Create test checkout session** with $0 trial price
2. **Verify:**
   - ✅ No card fields shown
   - ✅ Only email/name collection
   - ✅ Checkout completes successfully
   - ✅ Subscription created with `status: 'trialing'`
   - ✅ `trial_end` date is 14 days from now

### Test Scenarios:

- ✅ User signs up → Gets trial immediately
- ✅ User never adds card → Subscription expires after trial
- ✅ User adds card before trial ends → Converts to paid
- ✅ User upgrades to paid plan → Subscription updates correctly

---

## Important Considerations

### ⚠️ Conversion Rate Impact:

- **Lower conversion** from trial → paid (no card commitment)
- **Higher trial signups** (less friction)
- **Need strong in-app prompts** before trial ends

### 📧 Email Reminders:

Consider sending emails:
- Day 1: "Welcome! Here's how to use the tool"
- Day 11: "3 days left in your trial"
- Day 13: "1 day left - Add payment method to continue"
- Day 14: "Trial ended - Upgrade to keep access"

### 🔄 Trial-to-Paid Conversion:

**Option 1: In-App Prompt**
- Show modal before trial ends: "Add payment method to continue"
- Use Stripe's payment method collection API

**Option 2: Redirect to Pricing**
- Before trial ends, redirect to `/pricing`
- Let them choose a paid plan
- Create new subscription (cancel old trial)

**Option 3: Auto-Upgrade (Not Recommended)**
- Don't auto-charge without explicit consent
- Always get user approval first

---

## Summary Checklist

- [ ] Create $0/month product with 14-day trial period in Stripe
- [ ] Copy the new Price ID
- [ ] Update `src/config/stripe.js` with new trial price ID
- [ ] Modify `api/create-checkout-session.js` to use subscription mode for trials
- [ ] Set `payment_method_collection: 'if_required'` or `'never'` for trials
- [ ] Test checkout flow in Stripe test mode
- [ ] Verify webhook receives `trialing` status
- [ ] Update frontend to show trial end date
- [ ] Add in-app prompts before trial ends
- [ ] Set up email reminders (optional but recommended)

---

## Next Steps

Once you've completed the Stripe dashboard setup, I can help you:
1. Update the code to use the new $0 trial price
2. Modify checkout session creation
3. Add trial end date display in the UI
4. Implement trial-to-paid conversion flow

Let me know when you've created the $0 trial product in Stripe and I'll help with the code changes!
