# Google AI Service Error Debugging Guide

## Current Issue
You're getting a "Google AI service error" when trying to generate control text.

## What I've Fixed
1. **Enhanced Error Handling**: Added specific error handling for different types of Google AI errors
2. **Multiple Environment Variable Support**: Now supports `GOOGLE_AI_API_KEY`, `GEMINI_API_KEY`, and `GOOGLE_API_KEY`
3. **Fallback Models**: Added fallback from `gemini-1.5-flash` to `gemini-1.5-pro` if the primary model fails
4. **Better Debugging**: Added extensive logging to help identify the root cause
5. **Test Endpoint**: Created `/api/test-google-ai` to test the Google AI connection

## Debugging Steps

### Step 1: Test the Google AI Connection
Visit: `https://your-vercel-url.vercel.app/api/test-google-ai`

This will test:
- Environment variable configuration
- API key format
- Google AI service connectivity
- Model availability

### Step 2: Check Vercel Environment Variables
In your Vercel dashboard:
1. Go to your project settings
2. Check "Environment Variables"
3. Ensure you have one of these set:
   - `GOOGLE_AI_API_KEY` (recommended)
   - `GEMINI_API_KEY`
   - `GOOGLE_API_KEY`

### Step 3: Verify API Key Format
Your Google AI API key should:
- Start with "AIza"
- Be approximately 39 characters long
- Be obtained from https://makersuite.google.com/app/apikey

### Step 4: Check API Key Status
1. Go to https://makersuite.google.com/app/apikey
2. Verify your API key is active
3. Check if you have any quota limits
4. Ensure the key hasn't expired

### Step 5: Test with Different Models
The system now tries:
1. `gemini-1.5-flash` (primary)
2. `gemini-1.5-pro` (fallback)

## Common Issues and Solutions

### Issue: "Configuration error"
**Cause**: Environment variable not set
**Solution**: Set the environment variable in Vercel

### Issue: "Authentication failed"
**Cause**: Invalid or expired API key
**Solution**: Generate a new API key from Google AI Studio

### Issue: "API rate limit exceeded"
**Cause**: Daily quota exceeded
**Solution**: Wait 24 hours or upgrade to paid plan

### Issue: "Google AI service error"
**Cause**: Service unavailable or model issues
**Solution**: Check Google AI service status, try fallback model

### Issue: "Package error"
**Cause**: Dependency loading issue
**Solution**: Check package installation, redeploy

## Next Steps
1. Deploy these changes to Vercel
2. Test the `/api/test-google-ai` endpoint
3. Check the Vercel function logs for detailed error information
4. Try generating control text again

## Vercel Function Logs
To see detailed logs:
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Click on the function that's failing
5. Check the logs for detailed error information

## Support
If the issue persists after these fixes:
1. Check the Vercel function logs
2. Test the `/api/test-google-ai` endpoint
3. Verify your API key in Google AI Studio
4. Contact support with the specific error details
