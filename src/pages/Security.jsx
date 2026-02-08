import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const Security = ({ onShowLogin, onShowSignup }) => {
  const implementedSecurityFeatures = [
    {
      icon: "🔐",
      title: "Data Encryption",
      description: "We protect your data with industry-standard encryption both in transit and at rest to ensure your compliance documents remain secure.",
      details: [
        "TLS encryption for all data in transit",
        "Encrypted database storage",
        "Secure authentication tokens",
        "HTTPS enforced on all connections"
      ]
    },
    {
      icon: "🛡️",
      title: "Authentication & Access Control",
      description: "Secure user authentication through Google OAuth integration with strict access controls ensuring only authorized users can access the platform.",
      details: [
        "Google OAuth authentication",
        "Secure session management",
        "Protected API endpoints",
        "Row-level security policies"
      ]
    },
    {
      icon: "📊",
      title: "Data Isolation",
      description: "We implement strict data isolation practices to ensure users can only access their own documents, analysis results, and account information.",
      details: [
        "User-specific data access only",
        "Database row-level security",
        "Isolated analysis environments",
        "No cross-user data sharing"
      ]
    },
    {
      icon: "🔒",
      title: "Infrastructure Security",
      description: "Built on secure cloud infrastructure with enterprise-grade security features including DDoS protection and comprehensive monitoring.",
      details: [
        "Secure cloud infrastructure",
        "DDoS protection",
        "Security headers enabled",
        "Regular security updates"
      ]
    }
  ];

  const dataHandlingPrinciples = [
    {
      title: "Secure Document Storage",
      description: "Your documents are securely stored with encryption to enable analysis history and control text generation features. You have full control and can delete them at any time.",
      icon: "💾"
    },
    {
      title: "User-Controlled Deletion",
      description: "You can manually delete your analysis history and documents at any time through your account. When deleted, all associated data is permanently removed.",
      icon: "🗑️"
    },
    {
      title: "AI Privacy Protection",
      description: "Your documents are processed by AI for analysis purposes only. The AI service provider does not retain or use your data for training purposes.",
      icon: "🤖"
    },
    {
      title: "No Third-Party Sharing",
      description: "We never share your documents or analysis results with third parties. Your data remains private and confidential.",
      icon: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation onShowLogin={onShowLogin} onShowSignup={onShowSignup} />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Security & Privacy</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're committed to protecting your data with transparent, enterprise-grade security practices. 
              Here's exactly how we keep your sensitive compliance information secure.
            </p>
          </div>
        </section>

        {/* Implemented Security Features */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Security Implementation</h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto">
                We implement comprehensive security measures to protect your data at every level of our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {implementedSecurityFeatures.map((feature, index) => (
                <div key={index} className="bg-slate-800 border border-slate-600 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 hover:border-slate-500">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-100 mb-4 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-200">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Handling Principles */}
        <div className="py-20 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">How We Handle Your Data</h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto">
                Transparency is key to building trust. Here's exactly how we handle your compliance documents and analysis data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataHandlingPrinciples.map((principle, index) => (
                <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 hover:border-slate-500">
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{principle.title}</h3>
                  <p className="text-slate-100 text-sm leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Security Information */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Security Best Practices</h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto">
                We follow industry-standard security practices and continuously work to improve our security posture.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* What We Implement */}
              <div className="bg-slate-800 border border-slate-600 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  Security Measures Implemented
                </h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>OAuth Authentication:</strong> Secure Google OAuth integration for user login
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>Encrypted Storage:</strong> Documents stored with encryption and strict access controls
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>TLS Encryption:</strong> All data in transit protected with TLS encryption
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>Secure Infrastructure:</strong> Hosted on enterprise-grade cloud infrastructure
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>Row-Level Security:</strong> Database policies ensure data isolation between users
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>Comprehensive Logging:</strong> Error tracking and audit logging for security monitoring
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>AI Data Privacy:</strong> AI providers do not retain or train on your documents
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="text-slate-100">
                      <strong>User Control:</strong> Manual deletion of documents and analysis history available
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Honest Transparency Section */}
        <div className="py-20 bg-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-blue-400 mr-3">ℹ️</span>
                Our Commitment to Transparency
              </h3>
              <div className="space-y-4 text-slate-100">
                <p>
                  We believe in honest, transparent communication about our security practices. We don't claim to have certifications we haven't obtained or security measures we haven't implemented.
                </p>
                <p>
                  Our infrastructure partners (cloud hosting and database providers) maintain SOC 2 compliance and other certifications. We follow security principles from recognized frameworks like SOC 2, NIST CSF, and ISO 27001 in our implementation.
                </p>
                <p>
                  If you have specific security requirements or need detailed information about our practices for your compliance assessments, please contact us at <a href="mailto:admin@mapmygap.com" className="text-blue-300 hover:text-blue-200 underline">admin@mapmygap.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Questions About Our Security?</h2>
            <p className="text-xl text-white mb-8">
              We're committed to transparency. If you have specific questions about our security 
              practices or need detailed information for your security assessment, please reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/privacy"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                Read Privacy Policy
              </Link>
              <a
                href="mailto:admin@mapmygap.com"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="py-8 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link to="/" className="text-blue-300 hover:text-blue-200 font-medium">
                ← Back to Home
              </Link>
              <div className="flex gap-4">
                <Link to="/terms" className="text-blue-300 hover:text-blue-200 font-medium">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="text-blue-300 hover:text-blue-200 font-medium">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Security;
