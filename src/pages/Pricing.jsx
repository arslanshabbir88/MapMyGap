import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We believe in straightforward pricing that grows with your organization. 
              No hidden fees, no surprises—just clear value for your compliance needs.
            </p>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Pricing Structure Coming Soon
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                We're currently finalizing our pricing structure to ensure it provides the best value 
                for organizations of all sizes. Our goal is to make enterprise-grade compliance 
                analysis accessible and affordable.
              </p>
              <div className="bg-slate-700/50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">What We're Planning</h3>
                <ul className="text-slate-300 space-y-2 text-left max-w-md mx-auto">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-400">✓</span>
                    <span>Flexible plans based on usage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-400">✓</span>
                    <span>No long-term contracts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-400">✓</span>
                    <span>Volume discounts for enterprise</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-400">✓</span>
                    <span>Free tier for small organizations</span>
                  </li>
                </ul>
              </div>
              <p className="text-slate-400 mb-8">
                In the meantime, we're offering early access to select organizations. 
                Contact us to learn more about our pilot program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-colors rounded-lg text-lg font-semibold"
                >
                  Learn How It Works
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-24 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Why MapMyGap is Worth Every Penny
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our platform delivers measurable ROI by transforming how you approach compliance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-white mb-3">Time Savings</h3>
                <p className="text-slate-400">
                  Reduce compliance analysis from months to minutes. Our AI processes documents 
                  faster than any human team while maintaining accuracy.
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-3">Cost Reduction</h3>
                <p className="text-slate-400">
                  Eliminate the need for expensive consultants and reduce internal compliance 
                  team overhead with automated analysis and reporting.
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Risk Mitigation</h3>
                <p className="text-slate-400">
                  Identify compliance gaps before they become audit failures. Proactive 
                  gap analysis helps prevent costly compliance violations.
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-3">Better Insights</h3>
                <p className="text-slate-400">
                  Get deeper, more accurate compliance insights than manual reviews. 
                  Our AI identifies patterns and connections humans might miss.
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-white mb-3">Continuous Improvement</h3>
                <p className="text-slate-400">
                  Regular compliance assessments help you track progress and continuously 
                  improve your security posture over time.
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-3">Competitive Advantage</h3>
                <p className="text-slate-400">
                  Demonstrate compliance excellence to customers, partners, and regulators. 
                  Strong compliance is a competitive differentiator.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              While we finalize our pricing, you can explore our platform and see how 
              MapMyGap can transform your compliance process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/how-it-works"
                className="inline-flex items-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-colors rounded-lg text-lg font-semibold"
              >
                See How It Works
              </Link>
              <Link
                to="/frameworks"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                Explore Frameworks
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Pricing;
