# API Configuration Guide

This guide explains how to switch between local development and production Vercel deployment.

## Quick Start

### For Production Testing (Vercel)
```bash
npm run dev
```
This will proxy all `/api` requests to your Vercel deployment at `https://mapmygap.com`

### For Local Development
```bash
npm run dev:local
```
This will proxy all `/api` requests to your local server at `http://localhost:3001`

## Configuration

### Update Your Vercel URL
Edit `vite.config.js` and replace `https://mapmygap.com` with your actual Vercel deployment URL.

### Current Settings
- **Production Mode** (default): `npm run dev` → Vercel deployment
- **Local Mode**: `npm run dev:local` → Local server on port 3001

## How It Works

1. **Production Mode**: API calls to `/api/*` are proxied to your Vercel deployment
2. **Local Mode**: API calls to `/api/*` are proxied to `localhost:3001` with path rewriting

## Troubleshooting

### If you get CORS errors:
- Make sure your Vercel deployment is accessible
- Check that the URL in `vite.config.js` is correct

### If local development doesn't work:
- Ensure your local server is running: `npm run server`
- Use `npm run dev:local` instead of `npm run dev`

### To switch back to local development:
- Change the environment in `config.js` to `'local'`
- Or use `npm run dev:local` command

## Recent Improvements

### Enhanced Error Handling
- **Increased timeout** from 8 seconds to 25 seconds for Vercel deployment
- **Better fallback logic** with context-aware error messages
- **Intelligent control status defaults** to avoid 0% scores
- **Improved user experience** with helpful error messages instead of generic failures

### What This Fixes
- **Timeout errors** during gap analysis
- **Generic "AI analysis failed" messages**
- **Poor fallback behavior** when AI analysis encounters issues
- **Better control assessment** with realistic defaults

## Deployment

When you're ready to deploy:
1. Run `npm run build`
2. Deploy to Vercel
3. Test with `npm run dev` (production mode)
