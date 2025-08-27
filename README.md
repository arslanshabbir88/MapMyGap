# AlignIQ - AI-Powered Compliance Analysis

## Overview

AlignIQ is an intelligent compliance analysis platform that helps organizations assess their security posture against industry-standard frameworks like NIST 800-53, ISO 27001, and more.

## ✨ Features

- **AI-Powered Gap Analysis**: Upload policy documents and get instant compliance gap analysis
- **Multiple Framework Support**: NIST CSF, NIST 800-53, PCI DSS, ISO 27001, and more
- **Automated Policy Generation**: Generate ready-to-use policy text for identified gaps
- **User Authentication**: Secure login with Google OAuth and email/password
- **Analysis History**: Save and review your compliance assessments over time
- **Export Options**: Download reports in JSON or CSV format
- **Copy to Clipboard**: Easy copying of generated text and control details

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/arslanshabbir88/MapMyGap.git
cd aligniq-app
```

### 2. Set Up Supabase (Required for Authentication)

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up and create a new project
   - Note your project URL and anon key

2. **Configure Environment Variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set Up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for local development)
   - Copy Client ID and Client Secret

4. **Configure Supabase OAuth**
   - In your Supabase dashboard, go to "Authentication" → "Providers"
   - Enable Google provider
   - Enter your Google Client ID and Client Secret
   - Set redirect URL to: `https://your-project.supabase.co/auth/v1/callback`

5. **Create Database Tables**
   ```sql
   -- Create analysis history table
   CREATE TABLE analysis_history (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     framework TEXT NOT NULL,
     filename TEXT NOT NULL,
     strictness TEXT NOT NULL DEFAULT 'balanced',
     results JSONB NOT NULL,
     summary JSONB NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable RLS (Row Level Security)
   ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

   -- If you have an existing analysis_history table, add the strictness column:
   -- ALTER TABLE analysis_history ADD COLUMN strictness TEXT NOT NULL DEFAULT 'balanced';

   -- Create policy for users to see only their own history
   CREATE POLICY "Users can view own analysis history" ON analysis_history
     FOR SELECT USING (auth.uid() = user_id);

   -- Create policy for users to insert their own analysis
   CREATE POLICY "Users can insert own analysis" ON analysis_history
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   ```

### 3. Start Development Server

```bash
# Terminal 1: Start the API server
npm run server

# Terminal 2: Start the frontend
npm run dev
```

Visit `http://localhost:5173` (or the port shown in your terminal)

## 🔐 Authentication Features

### Google OAuth
- One-click sign-in with Google account
- No password required
- Automatic profile creation

### Email/Password
- Traditional signup and login
- Password reset functionality
- Email verification

### User Management
- Profile information storage
- Analysis history per user
- Secure session handling

## 📁 Supported File Types

- **Text Files**: `.txt`
- **Word Documents**: `.docx`
- **PDFs**: `.pdf`
- **Excel Spreadsheets**: `.xlsx`, `.xls`

## 🏗️ Architecture

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with OAuth
- **AI Analysis**: Google Gemini API
- **File Processing**: Mammoth (DOCX), PDF-parse, XLSX

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

### API Endpoints

- `POST /api/analyze` - Analyze text content
- `POST /api/upload-analyze` - Analyze uploaded files
- `POST /api/generate-control-text` - Generate policy text for gaps

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- Heroku
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Verify your environment variables
3. Check the browser console for errors
4. Open an issue in this repository

## 🔒 Security Notes

- All authentication is handled securely by Supabase
- User data is isolated with Row Level Security
- API keys are stored securely in environment variables
- File uploads are processed securely on the server

## 🎯 Roadmap

- [ ] Team collaboration features
- [ ] Advanced reporting and analytics
- [ ] Integration with compliance management tools
- [ ] Mobile app
- [ ] API rate limiting and usage tracking
- [ ] Multi-language support
