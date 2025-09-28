import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const SubscriptionSuccess = ({ onShowLogin }) => {
  const [searchParams] = useSearchParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, checkSubscriptionStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeSubscription = async () => {
      try {
        // Get session_id from URL if available
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
          console.log('Stripe session ID:', sessionId);
        }

        // Wait a moment for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check subscription status
        if (user) {
          console.log('Checking subscription status for user:', user.id);
          await checkSubscriptionStatus();
          
          // Wait a bit more and check again
          await new Promise(resolve => setTimeout(resolve, 1000));
          await checkSubscriptionStatus();
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing subscription:', error);
        setIsLoading(false);
      }
    };

    initializeSubscription();
  }, [searchParams, user, checkSubscriptionStatus]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <SharedNavigation onShowLogin={onShowLogin} />
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Setting up your subscription...</h1>
            <p className="text-gray-400">Please wait while we activate your account.</p>
          </div>
        </main>
        <SharedFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SharedNavigation onShowLogin={onShowLogin} />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to MapMyGap!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your subscription has been successfully activated. You now have access to all the features included in your plan.
          </p>

          {/* Next Steps */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">What's Next?</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Start Your First Analysis</h3>
                  <p className="text-gray-400">Upload a document and analyze it against your chosen compliance framework.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Explore All Frameworks</h3>
                  <p className="text-gray-400">Access NIST, SOC 2, ISO 27001, PCI DSS, and more compliance standards.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Generate Implementation Text</h3>
                  <p className="text-gray-400">Get AI-powered guidance on how to implement missing controls.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyzer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              Go to Analyzer
            </Link>
            
            <Link
              to="/frameworks"
              className="inline-flex items-center px-8 py-4 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 transition-colors rounded-lg text-lg font-semibold"
            >
              View Frameworks
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-12 text-gray-400">
            <p>Need help? Contact us at <a href="mailto:admin@mapmygap.com" className="text-blue-400 hover:text-blue-300">admin@mapmygap.com</a></p>
          </div>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default SubscriptionSuccess;
