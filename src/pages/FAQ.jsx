import React, { useState } from 'react';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState('general');

  const faqData = {
    general: [
      {
        question: "What is MapMyGap?",
        answer: "MapMyGap is an AI-powered compliance gap analysis platform that helps organizations identify compliance gaps by analyzing their internal documents against industry frameworks like NIST 800-53, ISO 27001, SOC 2, and PCI DSS."
      },
      {
        question: "How does MapMyGap work?",
        answer: "You upload your compliance documents, select a framework and categories to analyze, and our AI performs a comprehensive gap analysis. The platform identifies covered controls, partial implementations, and gaps, then generates actionable recommendations and implementation text."
      },
      {
        question: "What document formats do you support?",
        answer: "We support PDF, DOCX, and TXT files. Our AI can read and analyze text content from these formats to perform compliance analysis."
      },
      {
        question: "Is my data secure?",
        answer: "Yes, we take data security seriously. We use enterprise-grade encryption, don't permanently store your documents, and implement strict access controls. Your compliance data is protected with bank-level security measures."
      }
    ],
    technical: [
      {
        question: "What AI technology does MapMyGap use?",
        answer: "We use advanced natural language processing and machine learning models trained specifically on compliance frameworks and security standards. Our AI continuously learns and improves to provide more accurate analysis."
      },
      {
        question: "How accurate is the AI analysis?",
        answer: "Our AI provides professional-grade analysis accuracy, but we recommend human review for critical compliance decisions. The AI is trained on extensive compliance data and continuously improved with user feedback."
      },
      {
        question: "Can I customize the analysis?",
        answer: "Yes, you can select specific control categories or families to focus your analysis. This allows you to target areas of particular concern or interest for your organization."
      },
      {
        question: "Do you support custom frameworks?",
        answer: "Currently we support major industry frameworks. Custom framework support is available for enterprise customers. Contact us to discuss your specific needs."
      }
    ],
    compliance: [
      {
        question: "Which compliance frameworks do you support?",
        answer: "We support NIST 800-53, NIST CSF, ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR, and many others. Our framework library is continuously expanding based on industry demand."
      },
      {
        question: "Can MapMyGap help with audit preparation?",
        answer: "Absolutely! MapMyGap is excellent for audit preparation. It helps you identify gaps before external audits, understand your compliance posture, and prioritize remediation efforts."
      },
      {
        question: "How often should I run compliance analysis?",
        answer: "We recommend running analysis quarterly or whenever you make significant changes to policies or controls. Regular analysis helps maintain ongoing compliance and tracks improvements over time."
      },
      {
        question: "Can I export my analysis results?",
        answer: "Yes, you can export results in multiple formats including PDF reports for stakeholders, Excel spreadsheets for tracking, and JSON data for integrations with other tools."
      }
    ],
    pricing: [
      {
        question: "How much does MapMyGap cost?",
        answer: "We're currently finalizing our pricing structure to ensure it provides the best value for organizations of all sizes. We're offering early access to select organizations. Contact us to learn more about our pilot program."
      },
      {
        question: "Is there a free trial?",
        answer: "We're working on offering a free tier for small organizations. In the meantime, we're providing early access to select organizations to demonstrate the platform's value."
      },
      {
        question: "Do you offer discounts for nonprofits?",
        answer: "Yes, we plan to offer special pricing for educational institutions, nonprofits, and government agencies. Contact us for details once our pricing structure is finalized."
      },
      {
        question: "Can I change plans later?",
        answer: "Yes, our goal is to provide flexible plans that grow with your organization. You'll be able to upgrade, downgrade, or cancel your plan as needed."
      }
    ],
    support: [
      {
        question: "What support options are available?",
        answer: "We provide comprehensive support including documentation, video tutorials, and direct support channels. Enterprise customers will have access to dedicated account managers and priority support."
      },
      {
        question: "Do you provide training?",
        answer: "Yes, we offer comprehensive training and onboarding to help your team get the most out of MapMyGap. This includes best practices for compliance analysis and platform optimization."
      },
      {
        question: "Can you help with implementation?",
        answer: "Yes, our team can help you implement the recommendations generated by our platform. We provide guidance on control implementation and can assist with policy development."
      },
      {
        question: "What if I need help with a specific framework?",
        answer: "Our team has deep expertise in all supported frameworks. We can provide guidance on framework-specific requirements and help you interpret analysis results."
      }
    ]
  };

  const categories = [
    { id: 'general', name: 'General Questions', icon: '❓' },
    { id: 'technical', name: 'Technical Details', icon: '⚙️' },
    { id: 'compliance', name: 'Compliance & Auditing', icon: '📋' },
    { id: 'pricing', name: 'Pricing & Plans', icon: '💰' },
    { id: 'support', name: 'Support & Training', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Find answers to common questions about MapMyGap, our AI-powered compliance 
              analysis platform, and how it can help your organization.
            </p>
          </div>
        </section>

        {/* FAQ Categories and Questions */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setOpenCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    openCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Questions for Selected Category */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {faqData[openCategory].map((item, index) => (
                  <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-24 bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help. 
              Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@mapmygap.com"
                className="inline-flex items-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-colors rounded-lg text-lg font-semibold"
              >
                Email Support
              </a>
              <a
                href="mailto:sales@mapmygap.com"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default FAQ;
