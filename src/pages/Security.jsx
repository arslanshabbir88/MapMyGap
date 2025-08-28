import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const Security = () => {
  const implementedSecurityFeatures = [
    {
      icon: "🔐",
      title: "Secure Data Processing",
      description: "Your documents are processed securely in memory and are never permanently stored. We use industry-standard TLS encryption for data transmission.",
      details: [
        "TLS encryption for data in transit",
        "No permanent document storage",
        "Documents processed in-memory only",
        "Automatic cleanup after processing"
      ]
    },
    {
      icon: "🛡️",
      title: "Authentication & Access",
      description: "Secure user authentication through Google OAuth integration, ensuring only authorized users can access the platform.",
      details: [
        "Google OAuth authentication",
        "Secure session management",
        "Protected API endpoints",
        "User data isolation"
      ]
    },
    {
      icon: "📊",
      title: "Privacy-First Design",
      description: "Built with privacy as a core principle - we minimize data collection and ensure your sensitive compliance documents remain confidential.",
      details: [
        "Minimal data collection",
        "No document content logging",
        "Temporary processing only",
        "User privacy protection"
      ]
    },
    {
      icon: "🔒",
      title: "Infrastructure Security",
      description: "Hosted on Vercel's secure infrastructure with built-in DDoS protection, SSL/TLS, and security headers.",
      details: [
        "Vercel infrastructure security",
        "DDoS protection",
        "Security headers enabled",
        "Regular security updates"
      ]
    }
  ];

  const dataProtection = [
    {
      title: "Data Minimization",
      description: "We only collect the minimum amount of data necessary to provide our services.",
      icon: "📉"
    },
    {
      title: "No Document Storage",
      description: "Documents are processed in memory and automatically deleted after analysis. We never store your sensitive compliance documents.",
      icon: "🚫"
    },
    {
      title: "Secure Processing",
      description: "All data processing is performed in secure, isolated environments with no persistent storage.",
      icon: "🔒"
    },
    {
      title: "No Third-Party Sharing",
      description: "We never share your data with third parties without explicit consent.",
      icon: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Security & Privacy</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We're committed to protecting your data through honest, transparent security practices. 
              Here's exactly what we implement to keep your information secure.
            </p>
          </div>
        </section>

        {/* Implemented Security Features */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Security Approach</h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto">
                We believe in transparency about our security measures. Below are the specific 
                security features we have implemented and actively maintain.
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
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-200">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Protection Principles */}
        <div className="py-20 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Data Protection Principles</h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto">
                We follow these core principles to ensure your information is handled 
                securely and responsibly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataProtection.map((principle, index) => (
                <div key={index} className="bg-slate-700 border border-slate-600 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 hover:border-slate-500">
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{principle.title}</h3>
                  <p className="text-slate-100 text-sm leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Honest Assessment */}
        <div className="py-20 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Commitment to Honesty</h2>
              <p className="text-xl text-slate-100 max-w-3xl mx-auto">
                We believe trust is built through transparency, not through overstated claims.
              </p>
            </div>

            <div className="bg-slate-700 border border-slate-600 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">What We Have Implemented</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-100">
                        <strong>Secure Authentication:</strong> Google OAuth integration for user login
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-100">
                        <strong>Data Privacy:</strong> No permanent storage of your documents
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-100">
                        <strong>Infrastructure:</strong> Hosted on Vercel's secure platform
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-100">
                        <strong>Processing:</strong> Secure in-memory document analysis
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">What We're Working Toward</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-300">
                        <strong>Enhanced Authentication:</strong> Multi-factor authentication (MFA)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-300">
                        <strong>Advanced Monitoring:</strong> Security monitoring and alerting
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-300">
                        <strong>Compliance:</strong> Industry certifications and audits
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-slate-300">
                        <strong>Incident Response:</strong> Formal security incident procedures
                      </div>
                    </li>
                  </ul>
                </div>
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
              practices or want to know more about our implementation, please reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/faq"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                View FAQ
              </Link>
              <a
                href="mailto:support@mapmygap.com"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Contact Support
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
                <Link to="/privacy" className="text-blue-300 hover:text-blue-200 font-medium">
                  Privacy Policy →
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
