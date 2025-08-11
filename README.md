# AlignIQ - Compliance Gap Analysis Tool

AlignIQ is an AI-powered compliance gap analysis tool that helps organizations identify gaps between their internal standards and industry frameworks like NIST CSF and NIST 800-53.

## What Was Fixed

The site was broken due to several issues that have now been resolved:

1. **Missing Functions**: Added missing `renderStatusIcon()` and `getStatusChipClass()` functions in `Analyzer.jsx`
2. **Missing CSS Import**: Added missing `App.css` import in `main.jsx`
3. **API Configuration**: Created a local development server since the original code was designed for Vercel serverless functions
4. **PowerShell Execution Policy**: Configured proper server setup for local development

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

**Option 1: Run both servers simultaneously (Recommended)**
1. Start the local API server:
   ```bash
   npm run server
   ```
2. In a new terminal, start the Vite development server:
   ```bash
   npm run dev
   ```

**Option 2: Use the provided test script**
```bash
npm run dev:full
```

### Accessing the Application
- Frontend: http://localhost:5173
- API Server: http://localhost:3001

## Features

- **AI-Powered Analysis**: Upload your policy documents and get instant gap analysis
- **Framework Support**: Currently supports NIST CSF and NIST 800-53
- **Interactive Reports**: Click on any control to see detailed analysis and recommendations
- **Mock AI**: For local development, uses intelligent mock analysis based on document content

## Testing

1. Upload the provided `test-document.txt` file
2. Select a framework (NIST CSF or NIST 800-53)
3. Click "Analyze" to see the mock AI analysis results

## File Structure

- `src/` - React frontend components
- `api/` - Vercel serverless functions (for production)
- `server.cjs` - Local development API server
- `test-document.txt` - Sample document for testing

## Development Notes

- The local server (`server.cjs`) provides mock AI analysis for development
- In production, this would be replaced with actual AI API calls
- The frontend is built with React + Vite + Tailwind CSS
- API proxy is configured in `vite.config.js` to route `/api/*` requests to the local server

## Troubleshooting

If you encounter issues:
1. Ensure both servers are running (ports 3001 and 5173)
2. Check browser console for any JavaScript errors
3. Verify the API server is responding at http://localhost:3001/analyze
4. Make sure all dependencies are installed with `npm install`
