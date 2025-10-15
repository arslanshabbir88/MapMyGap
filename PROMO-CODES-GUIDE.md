# 🎟️ Promo Codes & Discounts Guide

## Overview
Stripe handles all promo codes and discounts automatically. With `allow_promotion_codes: true` enabled in your checkout, users can enter promo codes during payment.

---

## 📋 **How to Create Promo Codes**

### **Step 1: Create a Coupon in Stripe**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Products** → **Coupons**
2. Click **"Create coupon"**
3. Configure your coupon:

#### **Percentage Discount:**
- **Name**: `Launch Special - 25% Off`
- **ID**: `LAUNCH25` (what customers type)
- **Discount**: `25%` off
- **Duration**: 
  - `Once` - applies to first payment only
  - `Forever` - applies every billing cycle
  - `Repeating` - applies for X months (e.g., 3 months)
- **Applies to**: Specific products or all products

#### **Fixed Amount Discount:**
- **Name**: `$50 Off First Month`
- **ID**: `SAVE50`
- **Discount**: `$50.00` off
- **Currency**: `USD`
- **Duration**: `Once`

---

## 🎯 **Popular Promo Code Examples**

### **1. Launch Promotion**
```
Code: LAUNCH25
Type: 25% off
Duration: First month only
Use Case: Launch day promotion
```

### **2. Annual Discount**
```
Code: ANNUAL20
Type: 20% off
Duration: Forever (on annual plans only)
Use Case: Encourage annual subscriptions
```

### **3. Friend Referral**
```
Code: FRIEND50
Type: $50 off
Duration: Once
Use Case: Referral program
```

### **4. Extended Trial**
```
Code: EXTENDEDFREE
Type: 100% off
Duration: First month
Use Case: Give free extended trial to specific users
```

### **5. Partnership Discount**
```
Code: PARTNER15
Type: 15% off
Duration: Forever
Use Case: Partner organizations
```

---

## 🔧 **Advanced: Coupon Restrictions**

In Stripe Dashboard, you can set:

### **Usage Limits:**
- **Max redemptions**: Limit total uses (e.g., first 100 customers)
- **One per customer**: Each customer can only use once
- **Expiration date**: Code expires after specific date

### **Product-Specific:**
- Apply only to specific plans (e.g., only Professional, not Starter)
- Apply to recurring charges only (not setup fees)

### **Minimum Amount:**
- Require minimum purchase amount (e.g., $100 minimum)

---

## 💡 **How Customers Use Promo Codes**

1. Customer goes to your pricing page
2. Clicks "Get Started" or "Upgrade"
3. Stripe checkout opens
4. Customer sees **"Add promotion code"** link
5. Enters code (e.g., `LAUNCH25`)
6. Discount applies automatically
7. Customer completes payment

---

## 📊 **Tracking Promo Code Usage**

### **In Stripe Dashboard:**
1. Go to **Products** → **Coupons**
2. Click on a specific coupon
3. See:
   - Total redemptions
   - Revenue impact
   - Active subscriptions using this coupon

### **In Your Admin Reports:**

Add this query to your `admin-reports.sql`:

```sql
-- Promo Code Usage Report (requires querying Stripe API or webhook data)
-- Note: Stripe doesn't store coupon info in your DB by default
-- You'll need to add a 'coupon_code' column to subscriptions table

SELECT 
  s.stripe_customer_id,
  u.email,
  s.plan_type,
  s.status,
  s.created_at,
  s.coupon_code, -- Add this column if tracking coupons
  COUNT(*) as subscriptions_with_coupon
FROM subscriptions s
JOIN auth.users u ON s.user_id = u.id
WHERE s.coupon_code IS NOT NULL
GROUP BY s.stripe_customer_id, u.email, s.plan_type, s.status, s.created_at, s.coupon_code
ORDER BY s.created_at DESC;
```

---

## 🔐 **Storing Coupon Info in Your Database (Optional)**

If you want to track which users used which coupons:

### **1. Add column to subscriptions table:**
```sql
ALTER TABLE subscriptions 
ADD COLUMN coupon_code VARCHAR(255),
ADD COLUMN coupon_discount_percent INT,
ADD COLUMN coupon_discount_amount INT;
```

### **2. Update webhook handler** (`api/stripe-webhook.js`):

In the `checkout.session.completed` handler, add:

```javascript
// After retrieving the subscription from Stripe
const subscription = await stripe.subscriptions.retrieve(
  session.subscription
);

// Extract coupon info if present
const couponCode = subscription.discount?.coupon?.id || null;
const couponPercent = subscription.discount?.coupon?.percent_off || null;
const couponAmount = subscription.discount?.coupon?.amount_off || null;

// Include in database insert/update
await supabase
  .from('subscriptions')
  .update({
    // ... other fields ...
    coupon_code: couponCode,
    coupon_discount_percent: couponPercent,
    coupon_discount_amount: couponAmount,
  })
  .eq('user_id', userId);
```

---

## 🎨 **Marketing Your Promo Codes**

### **Where to Display:**
1. **Homepage banner**: "Use code LAUNCH25 for 25% off!"
2. **Email campaigns**: Send to mailing list
3. **Social media**: Share on LinkedIn, Twitter
4. **Partner websites**: Share with partners
5. **Pricing page**: Add a subtle note about promo codes

### **Example Banner Component:**

Create `src/components/PromoBanner.jsx`:
```jsx
export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 text-center">
      <p className="text-sm md:text-base">
        🎉 <strong>Limited Time:</strong> Get 25% off your first month with code{' '}
        <span className="font-bold bg-white/20 px-2 py-1 rounded">LAUNCH25</span>
      </p>
    </div>
  );
}
```

---

## ⚠️ **Important Notes**

1. **Test Mode First**: Create test coupons in Stripe test mode before going live
2. **Case Sensitive**: Promo codes are case-sensitive by default
3. **One at a Time**: Customers can only use one promo code per checkout
4. **Stackable**: You can create coupon combinations in Stripe settings
5. **Webhook Updates**: Stripe webhooks automatically include discount info

---

## 🚀 **Quick Start Checklist**

- [x] Enable `allow_promotion_codes: true` in checkout (✅ Done!)
- [ ] Create your first coupon in Stripe Dashboard
- [ ] Test the promo code in test mode
- [ ] Create live coupons for production
- [ ] Add promo banner to your website (optional)
- [ ] Track coupon usage in Stripe Dashboard

---

## 📞 **Example Launch Day Coupons**

Here are some ready-to-use coupon ideas for your launch:

1. **LAUNCH30** - 30% off first month (limited to 100 uses)
2. **EARLYBIRD** - 50% off first month (expires in 7 days)
3. **ANNUAL25** - 25% off forever (annual plans only)
4. **FREEMONTH** - 100% off first month (specific partners)

---

## 🎯 **Next Steps**

1. Go to Stripe Dashboard → Products → Coupons
2. Create your first test coupon
3. Test checkout with the promo code
4. Deploy the updated checkout code (already done!)
5. Create live coupons when ready to launch

**Everything is ready to go!** Just create the coupons in Stripe and they'll work automatically. 🎉

