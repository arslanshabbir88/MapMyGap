import React from 'react';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';
import StripeCheckout from '../components/StripeCheckout';
import { STRIPE_CONFIG } from '../config/stripe';

const Pricing = ({ onShowLogin }) => {
  // Define all possible features
  const allFeatures = [
    { key: 'analyses', text: 'Analyses per month' },
    { key: 'characterLimit', text: 'Document upload size' },
    { key: 'frameworks', text: 'Compliance frameworks' },
    { key: 'export', text: 'Export capabilities' },
    { key: 'support', text: 'Email support' },
    { key: 'history', text: 'Analysis history' },
    { key: 'controlText', text: 'Control text generation' }
  ];

  const plans = [
    {
      name: 'Trial',
      price: 'Free 14 Day Trial',
      period: '',
      description: '',
      features: {
        analyses: '3 Analyses',
        characterLimit: 'Document Size: 1000 characters',
        controlText: 'Control Text Generation: 1000 characters',
        frameworks: 'All Compliance Frameworks',
        export: 'Export Capabilities',
        support: 'Email Support',
        history: 'Analysis History'
      },
      priceId: STRIPE_CONFIG.prices.trial,
      buttonText: 'Start Free Trial',
      popular: false,
      trial: true
    },
    {
      name: 'Starter',
      price: '$49',
      period: 'per month',
      description: '',
      features: {
        analyses: '5 Analyses',
        characterLimit: 'No Document Character Limit',
        frameworks: 'All Compliance Frameworks',
        export: 'Export Capabilities',
        support: 'Email Support',
        history: 'Analysis History',
        controlText: false
      },
      priceId: STRIPE_CONFIG.prices.starter,
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: 'per month',
      description: '',
      features: {
        analyses: '25 Analyses',
        characterLimit: 'No Document Character Limit',
        frameworks: 'All Compliance Frameworks',
        export: 'Export Capabilities',
        support: 'Email Support',
        history: 'Analysis History',
        controlText: 'Control Text Generation'
      },
      priceId: STRIPE_CONFIG.prices.professional,
      buttonText: 'Get Started',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$499',
      period: 'per month',
      description: '',
      features: {
        analyses: 'Unlimited Analyses',
        characterLimit: 'No Document Character Limit',
        frameworks: 'All Compliance Frameworks',
        export: 'Export Capabilities',
        support: 'Email Support',
        history: 'Analysis History',
        controlText: 'Control Text Generation'
      },
      priceId: STRIPE_CONFIG.prices.enterprise,
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SharedNavigation onShowLogin={onShowLogin} />
      
      <main className="pt-20 pb-16">
        {/* Header */}
        <div className="text-center px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start with our free trial and scale up as your compliance needs grow. 
            All plans include access to every feature - we only limit usage, not capabilities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-blue-400 shadow-2xl shadow-blue-500/25'
                    : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Trial Badge */}
                {plan.trial && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                      Free Trial
                    </span>
                  </div>
                )}

                {/* AI Implementation Generator Badge for Pro & Enterprise */}
                {(plan.name === 'Professional' || plan.name === 'Enterprise') && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                      <span>⚡</span>
                      <span>AI IMPLEMENTATION GENERATOR</span>
                    </span>
                  </div>
                )}

                         {/* Plan Header */}
                         <div className="text-center mb-6">
                           <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                           <div className="mb-4">
                             <span className={`font-bold text-white ${plan.trial ? 'text-2xl' : 'text-4xl'}`}>{plan.price}</span>
                             <span className="text-gray-400">{plan.period}</span>
                           </div>
                           <p className="text-gray-200 text-sm leading-relaxed font-medium">
                             {plan.description}
                           </p>
                         </div>

                                 {/* Features */}
                 <div className="mb-6">
                   <h4 className="font-semibold text-blue-400 mb-3 text-lg">What's Included:</h4>
                   <ul className="space-y-3">
                             {allFeatures.map((feature, featureIndex) => {
                               const planFeature = plan.features[feature.key];
                               const isAvailable = planFeature !== false && planFeature !== undefined;
                               const isUnlimited = planFeature === true || planFeature === 'Unlimited';
                               
                               // Special handling for all plans - show custom text instead of feature labels
                               const isCustomPlan = plan.trial || plan.name === 'Starter' || plan.name === 'Professional' || plan.name === 'Enterprise';
                               const displayText = isCustomPlan && typeof planFeature === 'string' ? planFeature : feature.text;
                               
                               return (
                                 <li key={featureIndex} className="text-base text-gray-200 flex items-start font-medium">
                                   <span className={`mr-3 mt-1 text-lg ${isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                                     {isAvailable ? '✓' : '✗'}
                                   </span>
                                   <div className="flex-1">
                                     <span className={isAvailable ? 'text-gray-200' : 'text-gray-500'}>
                                       {displayText}
                                     </span>
                                     {!isCustomPlan && isAvailable && !isUnlimited && typeof planFeature === 'string' && (
                                       <span className="text-blue-300 ml-2">({planFeature})</span>
                                     )}
                                     {!isCustomPlan && isAvailable && isUnlimited && (
                                       <span className="text-blue-300 ml-2">(Unlimited)</span>
                                     )}
                                   </div>
                                 </li>
                               );
                             })}
                   </ul>
                 </div>



                {/* Checkout Button */}
                <div className="mt-auto">
                  <StripeCheckout
                    plan={plan.name}
                    priceId={plan.priceId}
                    onSuccess={() => console.log(`${plan.name} subscription successful`)}
                    onCancel={() => console.log(`${plan.name} subscription cancelled`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-300">Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at your next billing cycle.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">What happens when I reach my analysis limit?</h3>
              <p className="text-gray-300">You'll receive a notification when you're close to your limit. Once reached, you can either upgrade your plan or wait until your next billing cycle for more analyses.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Is there a setup fee?</h3>
              <p className="text-gray-300">No setup fees! Start with our free trial and only pay when you're ready to subscribe.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Can I cancel anytime?</h3>
              <p className="text-gray-300">Absolutely. Cancel your subscription at any time with no cancellation fees. You'll continue to have access until the end of your current billing period.</p>
            </div>
          </div>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Pricing;
