import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Documents",
      description: "Start by uploading your compliance documents including policies, procedures, standards, and guidelines. We support PDF, DOCX, and TXT formats.",
      details: [
        "Drag and drop or click to upload files",
        "Support for multiple document types",
        "Secure, encrypted file transfer",
        "No permanent storage of your content"
      ],
      icon: "📄",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "Select Framework & Categories",
      description: "Choose the compliance framework you want to analyze against and select specific control categories or families to focus on.",
      details: [
        "NIST 800-53, ISO 27001, SOC 2, PCI DSS",
        "Target specific control families",
        "Customize analysis scope",
        "Save preferences for future use"
      ],
      icon: "🎯",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "03",
      title: "AI Analysis & Processing",
      description: "Our advanced AI analyzes your documents against the selected framework, identifying compliance gaps and generating detailed insights.",
      details: [
        "Real-time AI document processing",
        "Natural language understanding",
        "Framework-specific analysis",
        "Comprehensive gap identification"
      ],
      icon: "🤖",
      color: "from-green-500 to-green-600"
    },
    {
      number: "04",
      title: "Review Results & Scores",
      description: "Get detailed analysis results with compliance scores, gap identification, and actionable recommendations for each control.",
      details: [
        "Visual compliance dashboard",
        "Control-by-control analysis",
        "Gap severity assessment",
        "Comprehensive scoring system"
      ],
      icon: "📊",
      color: "from-orange-500 to-orange-600"
    },
    {
      number: "05",
      title: "Generate Implementation Text",
      description: "Use our AI to generate specific, actionable implementation text to address identified gaps and achieve compliance.",
      details: [
        "AI-generated implementation guidance",
        "Framework-specific recommendations",
        "Technical implementation details",
        "Monitoring and evidence requirements"
      ],
      icon: "✍️",
      color: "from-red-500 to-red-600"
    },
    {
      number: "06",
      title: "Export & Take Action",
      description: "Export your results in multiple formats and integrate findings into your compliance program and remediation efforts.",
      details: [
        "PDF reports for stakeholders",
        "Excel spreadsheets for tracking",
        "JSON data for integrations",
        "Action plan templates"
      ],
      icon: "📤",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get comprehensive compliance analysis in minutes, not months. Our AI processes documents at incredible speed while maintaining accuracy."
    },
    {
      icon: "🎯",
      title: "Highly Accurate",
      description: "Trained on extensive compliance frameworks and continuously improved with user feedback. Our AI provides professional-grade analysis."
    },
    {
      icon: "🔒",
      title: "Enterprise Secure",
      description: "Bank-level security with encryption, access controls, and compliance with industry standards. Your data security is our priority."
    },
    {
      icon: "📱",
      title: "Always Accessible",
      description: "Cloud-based platform accessible from anywhere, anytime. No software installation required, just a modern web browser."
    },
    {
      icon: "🔄",
      title: "Continuous Learning",
      description: "Our AI continuously learns from new frameworks, regulations, and user feedback to provide increasingly accurate analysis."
    },
    {
      icon: "💼",
      title: "Professional Results",
      description: "Generate professional-grade compliance reports and implementation guidance that meets industry standards and auditor expectations."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
              How MapMyGap Works
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Transform your compliance process from months of manual work to minutes of AI-powered analysis. 
              Here's how our platform streamlines your journey to compliance excellence.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Six Simple Steps to Compliance
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our streamlined process makes compliance analysis accessible, efficient, and actionable for organizations of all sizes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-2xl font-bold text-white`}>
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-slate-400 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-slate-300">
                            <span className="text-blue-400">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Why Choose MapMyGap?
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI technology with deep compliance expertise to deliver unmatched value.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-slate-600 transition-all duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              Ready to Transform Your Compliance Process?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Join organizations that have already streamlined their compliance efforts with MapMyGap. 
              Start your first analysis today and see the difference AI-powered compliance can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/frameworks"
                className="inline-flex items-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-colors rounded-lg text-lg font-semibold"
              >
                Explore Frameworks →
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default HowItWorks;
