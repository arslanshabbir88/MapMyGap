import React, { useState } from 'react';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';
import { useContactForm } from '../contexts/ContactFormContext';

const FAQ = ({ onShowLogin, onShowSignup }) => {
  const { openContactForm } = useContactForm();
  const [openCategory, setOpenCategory] = useState('general');

  const faqData = {
    general: [
      {
        question: "What is MapMyGap?",
        answer: "MapMyGap is an AI-powered compliance gap analysis platform that helps organizations identify compliance gaps by analyzing their internal documents against industry frameworks like NIST 800-53, ISO 27001, SOC 2, and PCI DSS."
      },
      {
        question: "How does MapMyGap compare to traditional compliance consulting?",
        answer: "Traditional gap analysis is time-intensive and resource-heavy—requiring weeks of consultant scheduling, lengthy document reviews, and limited revision cycles. MapMyGap delivers the same professional-grade analysis in minutes, allowing you to:\n\n• Get immediate results\n• Option to re-run analyses unlimited times as you update your policies\n• Analyze multiple frameworks without multiplying costs or timelines\n• Free your team to focus on remediation instead of coordination\n• Maintain full control over your compliance timeline"
      },
      {
        question: "What counts as an \"analysis\"?",
        answer: "An analysis is a single gap assessment run. Each time you analyze your document against selected categories, families, or controls from a framework, it counts as one analysis toward your plan limit.\n\nFor example, with the Trial plan's 3 analyses, you could:\n• Analyze 3 different control categories from NIST CSF\n• Analyze 2 SOC 2 trust service categories and 1 PCI DSS requirement area\n• Run the same category multiple times as you update your policies\n\nYou choose which specific categories or control families to analyze each time, giving you flexibility to focus on your compliance priorities."
      },
      {
        question: "How does MapMyGap work?",
        answer: "You upload your compliance documents, select a framework and categories to analyze, and our AI performs a comprehensive gap analysis. The platform identifies covered controls, partial implementations, and gaps, then generates actionable recommendations and implementation text."
      },
      {
        question: "What document formats do you support?",
        answer: "We support PDF, DOCX, TXT, XLSX, and XLS files. Our AI can read and analyze text content from these formats to perform compliance analysis. Excel files are processed by extracting text content from cells and worksheets."
      },
      {
        question: "Is my data secure?",
        answer: "Yes, we implement enterprise-grade security including encrypted connections, secure database storage with strict access controls, and role-based authentication. Your documents are stored securely to enable analysis history and control text generation. We follow industry-standard security practices and ensure user data isolation—you can only access your own content."
      }
    ],
    technical: [
      {
        question: "What AI technology does MapMyGap use?",
        answer: "We use cutting-edge AI technology with advanced natural language processing, combined with comprehensive compliance framework data, to deliver accurate, professional-grade gap analysis."
      },
      {
        question: "Can I customize the analysis?",
        answer: "Yes, you can select specific control categories or families to focus your analysis. This allows you to target areas of particular concern or interest for your organization."
      },
      {
        question: "Is my data secure when using AI analysis?",
        answer: "Yes, absolutely. Your documents are processed securely and are never used to train AI models or shared publicly. We use enterprise-grade AI services with strict data privacy policies. Your documents are stored securely in our database to enable analysis history and control text generation features. The AI service provider does not retain or use your data for training purposes. You can manually delete your documents at any time."
      },
      {
        question: "What security certifications or standards do you follow?",
        answer: "We implement enterprise-grade security best practices including data encryption, comprehensive audit logging, secure authentication, and strict access controls. Our infrastructure partners maintain SOC 2 compliance and other certifications. We follow security principles from recognized frameworks like SOC 2, NIST CSF, and ISO 27001. For detailed security information or assessments, contact us at admin@mapmygap.com."
      },
      {
        question: "Do you support custom frameworks?",
        answer: "Currently we support major industry frameworks including NIST CSF, NIST 800-53, SOC 2, PCI DSS, ISO 27001, and others. We focus on providing comprehensive coverage of established compliance standards. If you have specific framework needs, please contact us at admin@mapmygap.com to discuss your requirements."
      }
    ],
    compliance: [
      {
        question: "Which compliance frameworks do you support?",
        answer: "We support NIST CSF, NIST SP 800-53, NIST SP 800-63B, ISO 27001, SOC 1, SOC 2, PCI DSS, HIPAA, SOX, and NYDFS Part 500. Our framework library is continuously expanding based on industry demand."
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
        answer: "Yes, you can export your analysis results in JSON, CSV, and Excel formats. JSON exports provide structured data for integrations with other tools, CSV exports create spreadsheet-compatible files for tracking, and Excel exports include formatted reports with multiple sheets (Summary, Control Details, and Recommendations) with conditional formatting and professional styling."
      }
    ],
    pricing: [
      {
        question: "How much does MapMyGap cost?",
        answer: "MapMyGap offers flexible pricing plans to fit organizations of all sizes. We have a free 14-day trial, Starter plan at $49/month, Professional plan at $149/month, and Enterprise plan at $499/month. Higher-tier plans include additional features like control text generation and priority support."
      },
      {
        question: "Is there a free trial?",
        answer: "Yes! We offer a free 14-day trial that includes 3 analyses, 1000 character document size limit, Control Text Generation (1000 characters), all compliance frameworks, export capabilities, analysis history, and email support. This is perfect for testing the platform and seeing the value it provides."
      },
      {
        question: "Can I change plans later?",
        answer: "Absolutely! Our flexible plans are designed to grow with your organization. You can upgrade, downgrade, or cancel your plan at any time through your account settings."
      },
      {
        question: "What is control text generation and which plans include it?",
        answer: "Control text generation is our AI-powered feature that creates specific, actionable implementation guidance for compliance gaps. This feature is included in our Trial (1000 characters), Professional (unlimited), and Enterprise (unlimited) plans. The Starter plan focuses on core analysis capabilities without control text generation."
      }
    ]
  };

  const categories = [
    { id: 'general', name: 'General Questions', icon: '❓' },
    { id: 'technical', name: 'Technical Details', icon: '⚙️' },
    { id: 'compliance', name: 'Compliance & Auditing', icon: '📋' },
    { id: 'pricing', name: 'Pricing & Plans', icon: '💰' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation onShowLogin={onShowLogin} onShowSignup={onShowSignup} />
      
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
              <button
                type="button"
                onClick={() => openContactForm('support')}
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-colors rounded-lg text-lg font-semibold"
              >
                Email Support
              </button>
              <button
                type="button"
                onClick={() => openContactForm('sales')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default FAQ;
