import React from 'react';
import { useAuth } from './AuthContext';

// --- Helper Components ---

// Icon component for better UI
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const BoltIcon = () => <Icon path="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />;
const ShieldCheckIcon = () => <Icon path="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.017h-.008v-.017z" />;
const DocumentTextIcon = () => <Icon path="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />;
const UserIcon = () => <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />;
const LogoutIcon = () => <Icon path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />;

// --- Main Homepage Component ---

function Homepage({ onNavigate }) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1">
      <div className="mb-4 inline-block p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{children}</p>
    </div>
  );

  const HowItWorksStep = ({ number, title, children }) => (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 text-xl font-bold text-blue-400">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
        <p className="text-slate-400">{children}</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .aurora-bg {
          background: linear-gradient(-45deg, #020617, #111827, #1e293b, #334155);
          background-size: 400% 400%;
          animation: aurora 20s ease infinite;
        }
        .hero-glow {
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3);
        }
      `}</style>
      <div className="aurora-bg min-h-screen font-sans text-slate-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
          <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              {/* Logo and Title - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AlignIQ</h1>
                <span className="text-xs sm:text-sm text-slate-400">AI-Powered Compliance Analysis</span>
              </div>
              
              {/* Navigation and User Actions - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                {user ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <UserIcon />
                        <span className="text-xs sm:text-sm font-medium">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                      >
                        <LogoutIcon />
                        <span className="text-xs sm:text-sm">Logout</span>
                      </button>
                    </div>
                    <a href="#" onClick={onNavigate} className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
                      Go to Analyzer
                    </a>
                  </>
                ) : (
                  <>
                    <a href="#" onClick={onNavigate} className="text-slate-300 hover:text-white transition-colors text-center sm:text-left">Sign In</a>
                    <a href="#" onClick={onNavigate} className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
                      Get Started
                    </a>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>
        
        <main>
          {/* Hero Section */}
          <section className="py-24 sm:py-32 text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter hero-glow">
                Map Your Compliance Gaps with AI
              </h1>
              <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                AlignIQ uses AI to analyze your internal standards against industry frameworks, instantly identifying gaps and generating the policy text you need to fix them.
              </p>
              <div className="mt-10">
                <a href="#" onClick={onNavigate} className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                  {user ? 'Go to Analyzer' : 'Start Your First Analysis'}
                </a>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white tracking-tight">From Analysis to Alignment in Minutes</h2>
                <p className="mt-4 text-slate-400">A smarter, faster way to manage compliance.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard icon={<BoltIcon className="w-8 h-8 text-blue-400" />} title="AI-Powered Gap Analysis">
                  Upload your policy documents and let our AI instantly compare them against frameworks like NIST, PCI DSS, and ISO 27001 to pinpoint exact compliance gaps.
                </FeatureCard>
                <FeatureCard icon={<DocumentTextIcon className="w-8 h-8 text-purple-400" />} title="Automated Policy Generation">
                  Don't just find problems—solve them. AlignIQ generates the exact policy language 
                  you need to address each gap, saving you hours of research and writing.
                </FeatureCard>
                <FeatureCard icon={<ShieldCheckIcon className="w-8 h-8 text-green-400" />} title="Continuous Compliance">
                  Save your reports, track your compliance score over time, and easily re-assess your standards as frameworks or your internal policies evolve.
                </FeatureCard>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24">
             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white tracking-tight">Three Simple Steps to Compliance</h2>
                </div>
                <div className="space-y-12">
                  <HowItWorksStep number="1" title="Upload Your Document">
                    Securely upload your internal standards or policy document. AlignIQ is ready to 
                    analyze and provide actionable insights.
                  </HowItWorksStep>
                  <HowItWorksStep number="2" title="Select a Framework & Analyze">
                    Choose an industry framework and click "Analyze." Our AI reads your document and performs a detailed, control-by-control gap analysis.
                  </HowItWorksStep>
                  <HowItWorksStep number="3" title="Review & Remediate">
                    Receive an interactive report detailing your compliance score, gaps, and partials. Click any gap to generate the exact text needed to become compliant.
                  </HowItWorksStep>
                </div>
             </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-24 bg-slate-900/50">
            <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-white tracking-tight">Ready to Automate Your Compliance?</h2>
              <p className="mt-4 text-slate-400">
                Stop spending weeks on manual reviews. Start closing gaps in minutes. {user ? 'Use your existing account to continue.' : 'Create your account and get your first analysis report for free.'}
              </p>
              <div className="mt-10">
                <a href="#" onClick={onNavigate} className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                  {user ? 'Go to Analyzer' : 'Sign Up for Free'}
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900/50 border-t border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p>&copy; 2025 AlignIQ. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Homepage;
