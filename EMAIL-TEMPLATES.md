# 📧 MapMyGap Email Templates

## 🎨 **Professional Email Template (Confirm Signup)**

Replace the basic HTML with this professional template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MapMyGap</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .tagline {
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-title {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 16px;
            text-align: center;
        }
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 20px auto;
            display: block;
            width: fit-content;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .cta-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }
        .features {
            background: #f1f5f9;
            padding: 30px;
            margin: 30px 0;
            border-radius: 8px;
        }
        .features h3 {
            color: #1e293b;
            margin-bottom: 16px;
            text-align: center;
        }
        .feature-list {
            list-style: none;
            padding: 0;
        }
        .feature-list li {
            padding: 8px 0;
            color: #475569;
        }
        .feature-list li:before {
            content: "✓";
            color: #10b981;
            font-weight: bold;
            margin-right: 8px;
        }
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 8px 0;
            color: #64748b;
            font-size: 14px;
        }
        .security-note {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 16px;
            margin: 20px 0;
            color: #92400e;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MapMyGap</div>
            <div class="tagline">AI-Powered Compliance Analysis</div>
        </div>
        
        <div class="content">
            <h1 class="welcome-title">Welcome to MapMyGap! 🎉</h1>
            
            <p class="message">
                You're one step away from revolutionizing your compliance process. 
                Confirm your email to get started with AI-powered gap analysis.
            </p>
            
            <a href="{{ .ConfirmationURL }}" class="cta-button">
                Confirm Your Account
            </a>
            
            <div class="features">
                <h3>What you'll get with MapMyGap:</h3>
                <ul class="feature-list">
                    <li>AI-powered compliance gap analysis in 5 minutes</li>
                    <li>Support for 10+ frameworks (NIST, ISO 27001, SOC 2, PCI DSS, HIPAA)</li>
                    <li>Automated implementation text generation</li>
                    <li>Professional reports and exports</li>
                    <li>100x faster than traditional consulting</li>
                </ul>
            </div>
            
            <div class="security-note">
                <strong>Security Note:</strong> If you didn't create an account with MapMyGap, 
                you can safely ignore this email. Your email address will not be used for any other purpose.
            </div>
        </div>
        
        <div class="footer">
            <p><strong>MapMyGap</strong> - AI-Powered Compliance Analysis</p>
            <p>Questions? Contact us at support@mapmygap.com</p>
            <p>© 2026 MapMyGap. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

---

## 📧 **Other Email Templates**

### **Magic Link (Sign In)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your MapMyGap Login Link</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 16px;
        }
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .expiry-note {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 6px;
            padding: 16px;
            margin: 20px 0;
            color: #92400e;
            font-size: 14px;
        }
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MapMyGap</div>
        </div>
        
        <div class="content">
            <h1 class="title">Your Login Link</h1>
            <p class="message">
                You requested a login link for your MapMyGap account. 
                Click the button below to sign in securely.
            </p>
            
            <a href="{{ .ConfirmationURL }}" class="cta-button">
                Sign In to MapMyGap
            </a>
            
            <div class="expiry-note">
                <strong>Security:</strong> This link will expire in 1 hour for your security.
            </div>
        </div>
        
        <div class="footer">
            <p>If you didn't request this link, you can safely ignore this email.</p>
            <p><strong>MapMyGap</strong> - AI-Powered Compliance Analysis</p>
        </div>
    </div>
</body>
</html>
```

### **Password Reset**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your MapMyGap Password</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 16px;
        }
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .security-note {
            background: #fef2f2;
            border: 1px solid #f87171;
            border-radius: 6px;
            padding: 16px;
            margin: 20px 0;
            color: #dc2626;
            font-size: 14px;
        }
        .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MapMyGap</div>
        </div>
        
        <div class="content">
            <h1 class="title">Reset Your Password</h1>
            <p class="message">
                You requested to reset your password for your MapMyGap account. 
                Click the button below to create a new password.
            </p>
            
            <a href="{{ .ConfirmationURL }}" class="cta-button">
                Reset Password
            </a>
            
            <div class="security-note">
                <strong>Security:</strong> This link will expire in 1 hour. 
                If you didn't request this reset, please contact our support team immediately.
            </div>
        </div>
        
        <div class="footer">
            <p>Questions? Contact us at support@mapmygap.com</p>
            <p><strong>MapMyGap</strong> - AI-Powered Compliance Analysis</p>
        </div>
    </div>
</body>
</html>
```

---

## 🎯 **How to Update in Supabase**

### **Step 1: Go to Email Templates**
1. **Supabase Dashboard** → **Authentication** → **Email Templates**

### **Step 2: Update Each Template**
1. **Confirm Signup** → Replace with the first template above
2. **Magic Link** → Replace with the second template
3. **Reset Password** → Replace with the third template

### **Step 3: Test**
1. Try signing up with a test email
2. Check how the email looks
3. Verify links work correctly

---

## 💡 **Benefits of Professional Templates**

✅ **Brand consistency** - Matches your website design  
✅ **Professional appearance** - Builds trust  
✅ **Better engagement** - Clear call-to-actions  
✅ **Mobile responsive** - Looks good on all devices  
✅ **Security messaging** - Explains why they got the email  

---

**Want me to create any other email templates or help you customize these further?** 📧✨

