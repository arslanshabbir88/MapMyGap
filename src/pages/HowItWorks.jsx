import React from 'react';
import { Link } from 'react-router-dom';

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
      description: "Cloud-based platform accessible from anywhere, anytime. No software installation or maintenance required."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">How MapMyGap Works</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transform your compliance chaos into clarity with our AI-powered platform. 
            See how easy it is to identify gaps and achieve compliance in just a few simple steps.
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple 6-Step Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From document upload to actionable insights, MapMyGap makes compliance analysis 
              straightforward and efficient.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Step Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`bg-gradient-to-r ${step.color} text-white text-2xl font-bold rounded-full w-16 h-16 flex items-center justify-center`}>
                      {step.number}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step Visual */}
                <div className="flex-1 flex justify-center">
                  <div className={`bg-gradient-to-r ${step.color} text-white text-6xl rounded-2xl w-32 h-32 flex items-center justify-center shadow-xl`}>
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MapMyGap?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with enterprise-grade security 
              to deliver the most advanced compliance analysis solution available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect For Every Compliance Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're preparing for an audit, implementing new controls, or maintaining 
              ongoing compliance, MapMyGap has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Audit Preparation</h3>
              <p className="text-gray-600">
                Identify gaps before external audits, understand your compliance posture, 
                and prioritize remediation efforts to ensure audit success.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Control Implementation</h3>
              <p className="text-gray-600">
                Generate specific, actionable implementation guidance for new controls 
                and enhance existing ones with AI-powered recommendations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Monitoring</h3>
              <p className="text-gray-600">
                Maintain ongoing compliance with regular assessments, track improvements 
                over time, and ensure your security posture remains strong.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Compliance?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of organizations that trust MapMyGap for their compliance needs. 
            Start your free analysis today and see the difference AI-powered compliance can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Start Free Analysis
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              View Pricing
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
              <Link to="/frameworks" className="text-blue-600 hover:text-blue-800 font-medium">
                View Frameworks →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
