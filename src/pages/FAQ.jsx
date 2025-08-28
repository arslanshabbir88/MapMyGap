import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const faqData = {
    general: {
      title: "General Questions",
      icon: "🏠",
      questions: [
        {
          q: "What is MapMyGap?",
          a: "MapMyGap is an AI-powered compliance gap analysis platform that helps organizations assess their compliance with cybersecurity frameworks like NIST 800-53, ISO 27001, SOC 2, and PCI DSS. It analyzes your documents and identifies gaps in your compliance posture."
        },
        {
          q: "How does MapMyGap work?",
          a: "You upload your compliance documents (policies, procedures, etc.), select the framework you want to analyze against, and our AI analyzes the content to identify which controls are covered, partially implemented, or have gaps. You get a detailed report with actionable recommendations."
        },
        {
          q: "What types of documents can I upload?",
          a: "We support PDF, DOCX, and TXT files. You can upload policies, procedures, standards, guidelines, and any other compliance-related documentation. The AI will analyze the content to understand your current compliance posture."
        },
        {
          q: "Is MapMyGap a replacement for professional auditors?",
          a: "No, MapMyGap is a tool to assist with compliance analysis, not a replacement for professional auditors. It helps you identify gaps and prepare for audits, but you should still work with qualified compliance professionals for final validation and implementation."
        }
      ]
    },
    technical: {
      title: "Technical Questions",
      icon: "⚙️",
      questions: [
        {
          q: "How accurate is the AI analysis?",
          a: "Our AI is trained on extensive compliance frameworks and provides highly accurate analysis. However, accuracy depends on the quality and clarity of your uploaded documents. We recommend reviewing all AI outputs with qualified professionals."
        },
        {
          q: "What frameworks do you support?",
          a: "We currently support NIST 800-53, NIST CSF, ISO 27001:2022, SOC 2 Type II, and PCI DSS v4.0. We're continuously adding new frameworks based on user demand."
        },
        {
          q: "How do you handle sensitive documents?",
          a: "Documents are processed securely in real-time and not permanently stored. We use enterprise-grade encryption and security measures. Documents are automatically deleted after 30 days, and we never share your content with third parties."
        },
        {
          q: "Can I export my analysis results?",
          a: "Yes, you can export your analysis results in multiple formats including PDF reports, Excel spreadsheets, and JSON data for integration with other tools."
        },
        {
          q: "What if the AI makes a mistake?",
          a: "While our AI is highly accurate, it's designed to assist, not replace human judgment. All outputs should be reviewed by qualified professionals. We provide detailed explanations for each analysis to help you understand the reasoning."
        }
      ]
    },
    compliance: {
      title: "Compliance Questions",
      icon: "📋",
      questions: [
        {
          q: "What's the difference between 'covered', 'partial', and 'gap'?",
          a: "'Covered' means the control is fully implemented and documented. 'Partial' means some aspects are implemented but may need enhancement. 'Gap' means the control is not implemented or documented."
        },
        {
          q: "How do I validate the AI recommendations?",
          a: "Review each recommendation against your actual implementation, consult with your compliance team, and cross-reference with official framework documentation. The AI provides guidance, but final decisions should be made by qualified professionals."
        },
        {
          q: "Can I use this for audit preparation?",
          a: "Yes, MapMyGap is excellent for audit preparation. It helps you identify gaps before audits, understand your compliance posture, and prioritize remediation efforts. Many users run analysis before external audits."
        },
        {
          q: "What industries do you support?",
          a: "We support all industries that need cybersecurity compliance, including healthcare, finance, technology, manufacturing, government, and more. Our frameworks are industry-agnostic and widely applicable."
        }
      ]
    },
    business: {
      title: "Business Questions",
      icon: "💼",
      questions: [
        {
          q: "How much does MapMyGap cost?",
          a: "We offer flexible pricing plans starting with a free tier for basic analysis. Professional and enterprise plans include advanced features, priority support, and higher usage limits. Contact us for custom enterprise pricing."
        },
        {
          q: "Do you offer enterprise support?",
          a: "Yes, we provide dedicated enterprise support including account management, custom integrations, training, and priority technical support. Enterprise customers also get advanced security features and compliance reporting."
        },
        {
          q: "Can I integrate MapMyGap with existing tools?",
          a: "Yes, we offer API access and integrations with popular GRC tools, project management platforms, and compliance management systems. Contact us to discuss your specific integration needs."
        },
        {
          q: "Do you offer training and onboarding?",
          a: "Yes, we provide comprehensive training for teams, including best practices for compliance analysis, how to interpret results, and how to integrate findings into your compliance program."
        }
      ]
    },
    security: {
      title: "Security & Privacy",
      icon: "🔒",
      questions: [
        {
          q: "How secure is my data?",
          a: "We implement enterprise-grade security including encryption in transit and at rest, strict access controls, regular security audits, and compliance with industry standards. Your data security is our top priority."
        },
        {
          q: "Do you store my documents permanently?",
          a: "No, documents are processed in real-time and temporarily stored for 30 days for your convenience. They are then automatically and securely deleted. We never permanently store your content."
        },
        {
          q: "Who can access my data?",
          a: "Only authorized MapMyGap personnel with a legitimate business need can access your data, and only under strict security protocols. We never share your data with third parties without your explicit consent."
        },
        {
          q: "Are you compliant with data protection regulations?",
          a: "Yes, we comply with GDPR, CCPA, and other relevant data protection regulations. We provide data processing agreements and support data subject rights requests."
        }
      ]
    },
    support: {
      title: "Support & Troubleshooting",
      icon: "🆘",
      questions: [
        {
          q: "How do I get help if I have issues?",
          a: "We offer multiple support channels including email support, live chat, comprehensive documentation, and video tutorials. Enterprise customers get dedicated support representatives."
        },
        {
          q: "What if my analysis fails or times out?",
          a: "Large documents may take longer to process. If you experience timeouts, try breaking documents into smaller sections or contact support for assistance. We're continuously optimizing performance."
        },
        {
          q: "Can I provide feedback to improve the service?",
          a: "Absolutely! We welcome feedback on analysis accuracy, feature requests, and general improvements. Your input helps us make MapMyGap better for everyone."
        },
        {
          q: "How often do you update the AI models?",
          a: "We regularly update our AI models with new compliance information, framework updates, and user feedback. Updates are deployed seamlessly without service interruption."
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about MapMyGap, our AI-powered compliance analysis platform, and how it can help your organization.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(faqData).map(([sectionId, section]) => (
            <div key={sectionId} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(sectionId)}
                className="w-full px-6 py-4 text-left bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openSections[sectionId] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {openSections[sectionId] && (
                <div className="px-6 py-4">
                  <div className="space-y-6">
                    {section.questions.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.q}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/support"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Support
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
