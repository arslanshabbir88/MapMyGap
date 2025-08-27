# Workload Identity Federation Setup Guide

This guide explains how to configure your app to use GCP Workload Identity Federation instead of API keys.

## What We Fixed

✅ **Removed API key dependencies** - No more `GOOGLE_AI_API_KEY` required  
✅ **Updated to use Vertex AI** - Proper GCP service integration  
✅ **Implemented Workload Identity** - Secure, automatic authentication  
✅ **Added comprehensive error handling** - Better debugging and troubleshooting  

## Required Environment Variables

You need to configure these in your **Vercel project settings**:

### GCP Project Configuration
```bash
GCP_PROJECT_ID=your-gcp-project-id
GCP_PROJECT_NUMBER=123456789012
GCP_LOCATION=us-central1
```

### Workload Identity Federation
```bash
GCP_WORKLOAD_IDENTITY_POOL_ID=your-pool-id
GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID=your-provider-id
```

## How to Get These Values

### 1. GCP Project ID & Number
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Copy the **Project ID** from the project info panel
4. Copy the **Project Number** (12-digit number)

### 2. Workload Identity Pool ID
1. In GCP Console, go to **IAM & Admin** > **Workload Identity Federation**
2. Find your pool or create one
3. Copy the **Pool ID** (e.g., `vercel-pool`)

### 3. Workload Identity Provider ID
1. In the same Workload Identity Federation section
2. Click on your pool
3. Find the provider (usually named after Vercel)
4. Copy the **Provider ID** (e.g., `vercel-provider`)

### 4. GCP Location
- Use `us-central1` (default) or your preferred region
- Must match where your Vertex AI models are deployed

## Setting Up in Vercel

### Step 1: Add Environment Variables
1. Go to your Vercel project dashboard
2. Click **Settings** > **Environment Variables**
3. Add each variable:
   - `GCP_PROJECT_ID` = your-project-id
   - `GCP_PROJECT_NUMBER` = 123456789012
   - `GCP_LOCATION` = us-central1
   - `GCP_WORKLOAD_IDENTITY_POOL_ID` = your-pool-id
   - `GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID` = your-provider-id

### Step 2: Deploy
1. Commit and push your changes
2. Vercel will automatically redeploy with new environment variables

## Testing Your Setup

### 1. Test the Connection
Visit: `https://your-vercel-url.vercel.app/api/test-google-ai`

This will:
- ✅ Check all environment variables
- ✅ Test Workload Identity authentication
- ✅ Verify Vertex AI connectivity
- ✅ Test Gemini model access

### 2. Check Vercel Logs
If you get errors, check the Vercel function logs:
1. Go to Vercel dashboard > Functions
2. Click on the failing function
3. Check the logs for detailed error messages

## Common Issues & Solutions

### Issue: "Missing required environment variables"
**Solution**: Add all required environment variables in Vercel

### Issue: "Workload Identity Federation failed"
**Solution**: Check your GCP Workload Identity configuration

### Issue: "No Vercel OIDC token available"
**Solution**: Ensure your Vercel project has OIDC enabled

### Issue: "Authentication failed"
**Solution**: Check GCP service account permissions

## Required GCP Permissions

Your GCP service account needs these roles:
- `roles/aiplatform.user` - For Vertex AI access
- `roles/vertexai.user` - For newer Vertex AI services
- `roles/iam.workloadIdentityUser` - For Workload Identity

## Security Benefits

✅ **No API keys stored** - Eliminates key management risk  
✅ **Automatic rotation** - Short-lived credentials  
✅ **Principle of least privilege** - Only necessary permissions  
✅ **Audit trail** - All access is logged and traceable  

## Next Steps

1. **Configure environment variables** in Vercel
2. **Deploy your changes**
3. **Test the connection** with `/api/test-google-ai`
4. **Try generating control text** - should work without API keys!

## Support

If you still encounter issues:
1. Check Vercel function logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure GCP Workload Identity is properly configured
4. Test with the `/api/test-google-ai` endpoint first

