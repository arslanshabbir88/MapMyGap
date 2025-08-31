import React from 'react';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';
import StripeCheckout from '../components/StripeCheckout';
import { STRIPE_CONFIG } from '../config/stripe';

const Pricing = ({ onShowLogin }) => {
  const plans = [
    {
      name: 'Trial',
      price: '$0',
      period: '/month',
             description: 'Start with our 14-day free trial. Get full access to all features with no commitment.',
             features: [
         'Unlimited AI Analysis',
         'Control Text Generation',
         'All Framework Support',
         'Real-time Insights'
       ],
             limitations: [
         '1,000 character upload limit',
         '1,000 character generation limit',
         '3 total analyses',
         '14-day duration'
       ],
      priceId: STRIPE_CONFIG.prices.trial,
      buttonText: 'Start Free Trial',
      popular: false,
      trial: true
    },
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
             description: 'Perfect for small teams and individual consultants.',
             features: [
         '5 Analyses per Month',
         'All Frameworks',
         'Gap Analysis',
         'Control Text Generation'
       ],
      priceId: STRIPE_CONFIG.prices.starter,
      buttonText: 'Subscribe to Starter',
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
             description: 'Ideal for growing businesses and compliance consultants.',
             features: [
         'Everything in Starter, PLUS:',
         '25 Analyses per Month',
         'Implementation Text Generation'
       ],
      priceId: STRIPE_CONFIG.prices.professional,
      buttonText: 'Subscribe to Professional',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$499',
      period: '/month',
             description: 'For enterprise organizations with unlimited compliance needs.',
             features: [
         'Everything in Professional, PLUS:',
         'Unlimited Analyses',
         'Unlimited Implementation Text',
         'Priority Support'
       ],
      priceId: STRIPE_CONFIG.prices.enterprise,
      buttonText: 'Subscribe to Enterprise',
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

                                 {/* Plan Header */}
                 <div className="text-center mb-6">
                   <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                   <div className="mb-4">
                     <span className="text-4xl font-bold text-white">{plan.price}</span>
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
                     {plan.features.map((feature, featureIndex) => (
                       <li key={featureIndex} className="text-base text-gray-200 flex items-start font-medium">
                         <span className="text-green-400 mr-3 mt-1 text-lg">✓</span>
                         {feature}
                       </li>
                     ))}
                   </ul>
                 </div>

                                 {/* Limitations (for Trial) */}
                 {plan.limitations && (
                   <div className="mb-6">
                     <h4 className="font-semibold text-yellow-400 mb-3 text-lg">Trial Limitations:</h4>
                     <ul className="space-y-3">
                       {plan.limitations.map((limitation, limitIndex) => (
                         <li key={limitIndex} className="text-base text-gray-200 flex items-start font-medium">
                           <span className="text-yellow-400 mr-3 mt-1 text-lg">⚠</span>
                           {limitation}
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}

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
