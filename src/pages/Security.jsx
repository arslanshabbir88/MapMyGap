import React from 'react';
import { Link } from 'react-router-dom';

const Security = () => {
  const securityFeatures = [
    {
      icon: "🔐",
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your documents and analysis results are protected with military-grade encryption standards.",
      details: [
        "TLS 1.3 for data in transit",
        "AES-256 for data at rest",
        "256-bit encryption keys",
        "Perfect Forward Secrecy"
      ]
    },
    {
      icon: "🛡️",
      title: "Multi-Layer Security",
      description: "Our security architecture includes multiple layers of protection including network security, application security, and infrastructure security to ensure comprehensive protection.",
      details: [
        "Network firewalls and DDoS protection",
        "Web Application Firewall (WAF)",
        "Intrusion Detection Systems (IDS)",
        "Real-time threat monitoring"
      ]
    },
    {
      icon: "🔑",
      title: "Access Control & Authentication",
      description: "Strict access controls ensure only authorized personnel can access systems and data, with multi-factor authentication and role-based access controls.",
      details: [
        "Multi-factor authentication (MFA)",
        "Role-based access control (RBAC)",
        "Privileged access management",
        "Session management and timeouts"
      ]
    },
    {
      icon: "📊",
      title: "Compliance & Certifications",
      description: "We maintain compliance with industry-leading security standards and undergo regular third-party audits to ensure our security practices meet the highest standards.",
      details: [
        "SOC 2 Type II compliance",
        "ISO 27001 certification",
        "GDPR compliance",
        "Regular security audits"
      ]
    },
    {
      icon: "🚨",
      title: "Incident Response",
      description: "Our comprehensive incident response plan ensures rapid detection, containment, and resolution of security incidents with 24/7 monitoring and response capabilities.",
      details: [
        "24/7 security monitoring",
        "Automated threat detection",
        "Incident response team",
        "Business continuity planning"
      ]
    },
    {
      icon: "🔍",
      title: "Continuous Monitoring",
      description: "Real-time monitoring and logging of all system activities, with automated alerts and comprehensive audit trails for complete visibility and compliance.",
      details: [
        "Real-time security monitoring",
        "Comprehensive logging",
        "Automated alerting",
        "Security analytics and reporting"
      ]
    }
  ];

  const securityStandards = [
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 Type II certification demonstrates our commitment to security, availability, processing integrity, confidentiality, and privacy.",
      icon: "📋",
      status: "Certified"
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management systems, ensuring systematic approach to managing sensitive company information.",
      icon: "🌍",
      status: "Certified"
    },
    {
      name: "GDPR Compliance",
      description: "Full compliance with European data protection regulations, ensuring user privacy and data rights are protected.",
      icon: "🇪🇺",
      status: "Compliant"
    },
    {
      name: "CCPA Compliance",
      description: "California Consumer Privacy Act compliance, protecting the privacy rights of California residents.",
      icon: "🇺🇸",
      status: "Compliant"
    }
  ];

  const dataProtection = [
    {
      title: "Data Minimization",
      description: "We only collect and process the minimum amount of data necessary to provide our services.",
      icon: "📉"
    },
    {
      title: "Secure Processing",
      description: "All data processing is performed in secure, isolated environments with strict access controls.",
      icon: "🔒"
    },
    {
      title: "Temporary Storage",
      description: "Documents are stored temporarily (30 days) and automatically deleted after processing.",
      icon: "⏰"
    },
    {
      title: "No Third-Party Sharing",
      description: "We never share your data with third parties without explicit consent.",
      icon: "🚫"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Security & Trust</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Your data security is our top priority. We implement enterprise-grade security measures 
            and maintain compliance with industry-leading standards to protect your information.
          </p>
        </div>
      </div>

      {/* Security Features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Security</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built MapMyGap with security at its core, implementing multiple layers of protection 
              to ensure your data remains secure and confidential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance & Certifications */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Compliance & Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain compliance with industry-leading security standards and undergo regular 
              third-party audits to ensure our security practices meet the highest standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityStandards.map((standard, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{standard.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{standard.name}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {standard.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Protection */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Data Protection Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow strict data protection principles to ensure your information is handled 
              securely and in compliance with privacy regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataProtection.map((principle, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Architecture */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our multi-layered security architecture provides comprehensive protection 
              at every level of our platform.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-600 text-4xl rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  🌐
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Network Layer</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• DDoS protection</li>
                  <li>• Web Application Firewall</li>
                  <li>• SSL/TLS encryption</li>
                  <li>• Network segmentation</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-green-100 text-green-600 text-4xl rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  🏗️
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Application Layer</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Input validation</li>
                  <li>• Authentication & authorization</li>
                  <li>• Session management</li>
                  <li>• Secure coding practices</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 text-purple-600 text-4xl rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  🖥️
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Infrastructure Layer</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Secure cloud infrastructure</li>
                  <li>• Access controls</li>
                  <li>• Monitoring & logging</li>
                  <li>• Disaster recovery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Practices */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Security Practices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow industry best practices and maintain rigorous security protocols 
              to protect your data and maintain trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Development & Deployment</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Secure Development Lifecycle:</strong> All code undergoes security review and testing
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Automated Security Testing:</strong> Continuous security scanning and vulnerability assessment
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Secure Deployment:</strong> Automated deployment with security checks and rollback capabilities
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Regular Updates:</strong> Security patches and updates applied promptly
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Monitoring & Response</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>24/7 Monitoring:</strong> Continuous security monitoring and threat detection
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Incident Response:</strong> Rapid response team with defined escalation procedures
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Security Analytics:</strong> Advanced analytics for threat detection and response
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Regular Assessments:</strong> Penetration testing and security assessments
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Trust MapMyGap?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've earned the trust of organizations worldwide through our commitment 
              to security, transparency, and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 text-5xl rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                🏆
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
              <p className="text-gray-600">
                Years of successful operation with zero security breaches and 99.9% uptime.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 text-green-600 text-5xl rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                🔍
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Practices</h3>
              <p className="text-gray-600">
                Open about our security practices and regular third-party audits.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 text-5xl rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                🤝
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Commitment</h3>
              <p className="text-gray-600">
                Dedicated to protecting your data and maintaining your trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Secure Compliance?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of organizations that trust MapMyGap with their sensitive compliance data. 
            Start your secure analysis today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Start Free Analysis
            </Link>
            <Link
              to="/privacy"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
