# MapMyGap - AI-Powered Compliance Analysis Platform

## Overview

MapMyGap is an AI-powered compliance gap analysis platform that helps organizations assess their compliance with cybersecurity frameworks like NIST 800-53, ISO 27001, SOC 2, and PCI DSS. The platform analyzes compliance documents and identifies gaps, providing actionable recommendations for achieving compliance.

## Features

- **AI-Powered Analysis**: Advanced AI models analyze compliance documents against industry frameworks
- **Multiple Framework Support**: NIST 800-53, NIST CSF, ISO 27001, SOC 2, PCI DSS
- **Gap Identification**: Automatic identification of compliance gaps and partial implementations
- **Implementation Text Generation**: AI-generated specific, actionable implementation guidance
- **Real-time Processing**: Documents are processed in real-time with no permanent storage
- **Export Capabilities**: Multiple export formats including PDF, Excel, and JSON

## New Website Pages

### Legal & Compliance
- **Terms of Service** (`/terms`) - Comprehensive terms with AI disclaimers and legal protection
- **Privacy Policy** (`/privacy`) - GDPR-compliant privacy policy with data handling details

### Information & Support
- **FAQ** (`/faq`) - Comprehensive FAQ section covering all aspects of the service
- **How It Works** (`/how-it-works`) - Step-by-step process explanation with visual guides
- **Supported Frameworks** (`/frameworks`) - Detailed information about all supported compliance frameworks
- **Security** (`/security`) - Security practices, certifications, and data protection measures
- **Pricing** (`/pricing`) - Transparent pricing with tiered plans and feature comparison
- **Support** (`/support`) - Help documentation, contact methods, and support resources
- **About** (`/about`) - Company story, team information, mission, and values

## Technical Architecture

### Frontend
- **React 18** with modern hooks and functional components
- **React Router** for client-side routing and navigation
- **Tailwind CSS** for responsive, modern UI design
- **Component-based architecture** for maintainable code

### Backend
- **Vercel Serverless Functions** for API endpoints
- **Google Vertex AI** (Gemini 2.5 Flash) for AI analysis
- **Supabase** for authentication and user management
- **Adaptive timeout system** for optimal performance

### Security Features
- **End-to-end encryption** (TLS 1.3 + AES-256)
- **No permanent document storage** (30-day temporary retention)
- **Enterprise-grade security** with SOC 2 and ISO 27001 compliance
- **GDPR and CCPA compliance** for data protection

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd aligniq-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Environment Variables
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GCP_PROJECT_ID=your_gcp_project_id
GCP_PRIVATE_KEY=your_gcp_private_key
GCP_CLIENT_EMAIL=your_gcp_client_email
```

## Usage

### Basic Workflow
1. **Upload Document**: Upload your compliance document (PDF, DOCX, TXT)
2. **Select Framework**: Choose the compliance framework to analyze against
3. **AI Analysis**: Platform analyzes document and identifies gaps
4. **Review Results**: Interactive dashboard shows compliance scores and gaps
5. **Generate Implementation**: AI generates specific implementation text for gaps
6. **Export Report**: Download comprehensive compliance analysis report

### Supported File Types
- PDF documents
- Microsoft Word (.docx)
- Plain text files (.txt)

### Framework Support
- **NIST SP 800-53** (Revision 5) - Federal security controls
- **NIST CSF** (Version 2.0) - Cybersecurity framework
- **ISO 27001:2022** - Information security management
- **SOC 2 Type II** - Service organization controls
- **PCI DSS v4.0** - Payment card industry standards

## Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Environment Configuration
- Set all required environment variables in Vercel dashboard
- Configure function timeout limits (up to 60 seconds for Hobby plan)
- Set up custom domains if needed

## Contributing

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain component reusability
- Write clear, documented code
- Test thoroughly before submitting changes

### Code Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components for routing
├── AuthContext.jsx     # Authentication context
├── App.jsx            # Main app with routing
└── Homepage.jsx       # Landing page
```

## Support

### Documentation
- **FAQ Page**: Comprehensive answers to common questions
- **Support Page**: Contact methods and help resources
- **How It Works**: Step-by-step process explanation

### Contact Information
- **Email Support**: support@mapmygap.com
- **Live Chat**: Available on website during business hours
- **Phone Support**: Available for Professional+ plans

## License

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

For licensing inquiries, contact: legal@mapmygap.com

## Roadmap

### Upcoming Features
- Additional compliance frameworks
- Advanced reporting and analytics
- Team collaboration features
- API access for enterprise customers
- Mobile application
- Integration with popular GRC tools

### Framework Expansion
- HIPAA compliance framework
- SOX compliance requirements
- FedRAMP controls
- Industry-specific frameworks

---

**MapMyGap** - Transforming compliance from chaos to clarity with AI-powered analysis.
