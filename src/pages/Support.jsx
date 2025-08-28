import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const supportCategories = {
    'getting-started': {
      title: "Getting Started",
      icon: "🚀",
      articles: [
        {
          title: "How to Upload Your First Document",
          description: "Step-by-step guide to uploading and analyzing your first compliance document",
          readTime: "3 min read",
          link: "#"
        },
        {
          title: "Understanding Your Analysis Results",
          description: "Learn how to interpret the gap analysis and compliance scores",
          readTime: "5 min read",
          link: "#"
        },
        {
          title: "Choosing the Right Framework",
          description: "Guide to selecting the best compliance framework for your organization",
          readTime: "4 min read",
          link: "#"
        },
        {
          title: "Exporting and Sharing Results",
          description: "How to export your analysis results and share them with your team",
          readTime: "2 min read",
          link: "#"
        }
      ]
    },
    'analysis': {
      title: "Document Analysis",
      icon: "📊",
      articles: [
        {
          title: "Supported File Formats",
          description: "Learn about the file types and size limits for document uploads",
          readTime: "2 min read",
          link: "#"
        },
        {
          title: "Understanding Gap Analysis",
          description: "Deep dive into how our AI identifies compliance gaps and provides recommendations",
          readTime: "6 min read",
          link: "#"
        },
        {
          title: "AI-Generated Implementation Text",
          description: "How to use and customize AI-generated compliance implementation guidance",
          readTime: "4 min read",
          link: "#"
        },
        {
          title: "Handling Large Documents",
          description: "Best practices for analyzing complex and lengthy compliance documents",
          readTime: "3 min read",
          link: "#"
        }
      ]
    },
    'frameworks': {
      title: "Compliance Frameworks",
      icon: "📋",
      articles: [
        {
          title: "NIST 800-53 Controls",
          description: "Comprehensive guide to NIST 800-53 controls and implementation",
          readTime: "8 min read",
          link: "#"
        },
        {
          title: "ISO 27001 Requirements",
          description: "Understanding ISO 27001 information security management requirements",
          readTime: "7 min read",
          link: "#"
        },
        {
          title: "SOC 2 Trust Criteria",
          description: "Guide to SOC 2 Type II compliance and trust service criteria",
          readTime: "6 min read",
          link: "#"
        },
        {
          title: "PCI DSS Compliance",
          description: "Payment card industry data security standard requirements and controls",
          readTime: "5 min read",
          link: "#"
        }
      ]
    },
    'troubleshooting': {
      title: "Troubleshooting",
      icon: "🔧",
      articles: [
        {
          title: "Common Upload Issues",
          description: "Solutions for common document upload problems and errors",
          readTime: "3 min read",
          link: "#"
        },
        {
          title: "Analysis Timeout Solutions",
          description: "How to handle and resolve analysis timeout issues",
          readTime: "4 min read",
          link: "#"
        },
        {
          title: "Export Problems",
          description: "Troubleshooting guide for report export and download issues",
          readTime: "2 min read",
          link: "#"
        },
        {
          title: "Browser Compatibility",
          description: "Supported browsers and troubleshooting compatibility issues",
          readTime: "3 min read",
          link: "#"
        }
      ]
    },
    'account': {
      title: "Account & Billing",
      icon: "👤",
      articles: [
        {
          title: "Managing Your Account",
          description: "How to update account information, change passwords, and manage settings",
          readTime: "3 min read",
          link: "#"
        },
        {
          title: "Team Management",
          description: "Adding team members, managing roles, and collaboration features",
          readTime: "4 min read",
          link: "#"
        },
        {
          title: "Billing & Subscriptions",
          description: "Understanding your bill, changing plans, and payment methods",
          readTime: "3 min read",
          link: "#"
        },
        {
          title: "Data Retention & Privacy",
          description: "How we handle your data and privacy protection measures",
          readTime: "4 min read",
          link: "#"
        }
      ]
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      description: "Get help via email with detailed responses within 24 hours",
      contact: "support@mapmygap.com",
      responseTime: "24 hours",
      bestFor: "Detailed questions, technical issues, feature requests"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Real-time chat support during business hours",
      contact: "Available on website",
      responseTime: "Immediate",
      bestFor: "Quick questions, urgent issues, general guidance"
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Direct phone support for enterprise customers",
      contact: "Available for Professional+ plans",
      responseTime: "4 hours",
      bestFor: "Complex issues, account management, urgent problems"
    },
    {
      icon: "🎥",
      title: "Video Support",
      description: "Screen sharing and video calls for complex issues",
      contact: "Available for Enterprise plans",
      responseTime: "Scheduled",
      bestFor: "Complex technical issues, training, implementation support"
    }
  ];

  const quickActions = [
    {
      icon: "📚",
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      link: "/docs",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "❓",
      title: "FAQ",
      description: "Answers to common questions",
      link: "/faq",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "🎯",
      title: "Training",
      description: "Video tutorials and webinars",
      link: "/training",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🔄",
      title: "Status",
      description: "System status and updates",
      link: "/status",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Support & Help Center</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to help you succeed with MapMyGap. Find answers, get help, 
            and learn how to make the most of our AI-powered compliance platform.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-xl text-gray-600">
              Get help fast with these quick access resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`bg-gradient-to-r ${action.color} text-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 transform hover:scale-105`}
              >
                <div className="text-4xl mb-4">{action.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-blue-100 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Help Documentation */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Help Documentation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and tutorials to help you master MapMyGap 
              and achieve compliance success.
            </p>
          </div>

          {/* Category Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(supportCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {supportCategories[selectedCategory].articles.map((article, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {article.readTime}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <Link
                    to={article.link}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Need help? We offer multiple ways to get support based on your plan 
              and the complexity of your issue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Contact:</strong> {method.contact}</p>
                      <p><strong>Response Time:</strong> {method.responseTime}</p>
                      <p><strong>Best For:</strong> {method.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Hours & SLAs */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Support Hours & SLAs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing timely support with clear service level agreements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="bg-blue-100 text-blue-600 text-4xl rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                🕐
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Support Hours</h3>
              <div className="text-gray-600 space-y-2">
                <p><strong>Monday - Friday:</strong> 8 AM - 8 PM EST</p>
                <p><strong>Saturday:</strong> 9 AM - 5 PM EST</p>
                <p><strong>Sunday:</strong> Closed</p>
                <p><strong>Holidays:</strong> Limited support</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="bg-green-100 text-green-600 text-4xl rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Response Times</h3>
              <div className="text-gray-600 space-y-2">
                <p><strong>Critical Issues:</strong> 2 hours</p>
                <p><strong>High Priority:</strong> 4 hours</p>
                <p><strong>Medium Priority:</strong> 24 hours</p>
                <p><strong>Low Priority:</strong> 48 hours</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="bg-purple-100 text-purple-600 text-4xl rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Escalation</h3>
              <div className="text-gray-600 space-y-2">
                <p><strong>Level 1:</strong> General support</p>
                <p><strong>Level 2:</strong> Technical specialists</p>
                <p><strong>Level 3:</strong> Engineering team</p>
                <p><strong>Management:</strong> Account managers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community & Resources */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community & Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with other users, access training materials, and stay updated 
              with the latest compliance insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Community</h3>
              <p className="text-gray-600 text-sm mb-4">Connect with other compliance professionals</p>
              <Link to="/community" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Join Community →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">Step-by-step video guides and tutorials</p>
              <Link to="/tutorials" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Watch Videos →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Base</h3>
              <p className="text-gray-600 text-sm mb-4">Comprehensive documentation and guides</p>
              <Link to="/docs" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Browse Docs →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Updates</h3>
              <p className="text-gray-600 text-sm mb-4">Stay informed about new features and improvements</p>
              <Link to="/updates" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                View Updates →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Can't find what you're looking for? Our support team is ready to help 
            you succeed with MapMyGap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@mapmygap.com"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Contact Support
            </a>
            <Link
              to="/faq"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Browse FAQ
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
              <Link to="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
                FAQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
