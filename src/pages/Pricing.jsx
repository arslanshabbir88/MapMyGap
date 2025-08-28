import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams and individual compliance professionals",
      price: {
        monthly: 49,
        yearly: 39
      },
      features: [
        "Up to 10 document analyses per month",
        "Basic compliance frameworks (NIST CSF, ISO 27001)",
        "Standard gap analysis reports",
        "Email support",
        "Basic export options (PDF)",
        "30-day document retention",
        "Community forum access"
      ],
      limitations: [
        "Limited to 2 team members",
        "Basic reporting only",
        "No API access",
        "Standard support response time"
      ],
      icon: "🚀",
      color: "from-blue-500 to-blue-600",
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing organizations with dedicated compliance teams",
      price: {
        monthly: 149,
        yearly: 119
      },
      features: [
        "Up to 100 document analyses per month",
        "All compliance frameworks included",
        "Advanced gap analysis with AI recommendations",
        "Priority email support",
        "Multiple export formats (PDF, Excel, JSON)",
        "90-day document retention",
        "Team collaboration features",
        "Custom compliance scoring",
        "Advanced reporting and analytics",
        "Integration with popular tools"
      ],
      limitations: [
        "Up to 10 team members",
        "No dedicated account manager",
        "Standard SLA response times"
      ],
      icon: "💼",
      color: "from-purple-500 to-purple-600",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring maximum security and support",
      price: {
        monthly: 499,
        yearly: 399
      },
      features: [
        "Unlimited document analyses",
        "All compliance frameworks + custom frameworks",
        "Advanced AI-powered gap analysis",
        "Dedicated account manager",
        "Phone and video support",
        "All export formats + custom integrations",
        "1-year document retention",
        "Unlimited team members",
        "Advanced team collaboration",
        "Custom compliance scoring models",
        "Comprehensive reporting and analytics",
        "API access and custom integrations",
        "White-label options",
        "Custom SLA agreements",
        "On-site training and consulting",
        "Custom compliance frameworks"
      ],
      limitations: [
        "Annual contracts only",
        "Requires security review",
        "Custom pricing for very large deployments"
      ],
      icon: "🏢",
      color: "from-green-500 to-green-600",
      popular: false
    }
  ];

  const addOns = [
    {
      name: "Additional Analysis Credits",
      description: "Extra document analyses beyond your plan limit",
      price: {
        monthly: 5,
        yearly: 4
      },
      unit: "per analysis",
      icon: "📊"
    },
    {
      name: "Custom Framework Support",
      description: "Add support for industry-specific or custom compliance frameworks",
      price: {
        monthly: 99,
        yearly: 79
      },
      unit: "per framework",
      icon: "🎯"
    },
    {
      name: "Advanced API Access",
      description: "Enhanced API limits and custom integration support",
      price: {
        monthly: 199,
        yearly: 159
      },
      unit: "per month",
      icon: "🔌"
    },
    {
      name: "Dedicated Support",
      description: "Priority support with dedicated response team",
      price: {
        monthly: 299,
        yearly: 239
      },
      unit: "per month",
      icon: "🎧"
    }
  ];

  const savings = billingCycle === 'yearly' ? 20 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose the plan that fits your organization's compliance needs. 
            All plans include our core AI-powered analysis capabilities.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-4">
            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 ${
                billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save {savings}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">${plan.price[billingCycle]}</span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm text-gray-500 mt-1">Billed annually</p>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-900">What's included:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-4 mb-8">
                      <h4 className="font-semibold text-gray-900">Limitations:</h4>
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    to="/"
                    className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 px-6 rounded-lg font-medium text-center block hover:opacity-90 transition-opacity duration-200`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add-On Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your compliance capabilities with additional services and features 
              that can be added to any plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addOn, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{addOn.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{addOn.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{addOn.description}</p>
                <div className="text-2xl font-bold text-blue-600">
                  ${addOn.price[billingCycle]}
                  <span className="text-sm text-gray-500 font-normal">{addOn.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! All plans include a 14-day free trial with full access to all features. 
                No credit card required to start.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can I change plans later?</h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade, downgrade, or cancel your plan at any time. 
                Changes take effect immediately.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual plans. 
                Enterprise customers can arrange custom payment terms.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer discounts for nonprofits?</h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for educational institutions, nonprofits, and government agencies. 
                Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MapMyGap?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform delivers exceptional value compared to traditional 
              compliance consulting and manual analysis methods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 text-5xl rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">10x Faster</h3>
              <p className="text-gray-600">
                Get compliance analysis in minutes instead of weeks. 
                Traditional consulting takes months and costs thousands.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 text-green-600 text-5xl rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                💰
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">90% Cost Savings</h3>
              <p className="text-gray-600">
                Our platform costs a fraction of traditional compliance consulting 
                while providing more comprehensive analysis.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 text-5xl rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Always Available</h3>
              <p className="text-gray-600">
                Access your compliance analysis anytime, anywhere. 
                No waiting for consultant availability or scheduling conflicts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of organizations that trust MapMyGap for their compliance needs. 
            Start your free trial today and see the difference AI-powered compliance can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact Sales
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
              <Link to="/how-it-works" className="text-blue-600 hover:text-blue-800 font-medium">
                How It Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
