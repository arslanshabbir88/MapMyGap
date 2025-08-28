import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
const MenuIcon = () => <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />;
const XMarkIcon = () => <Icon path="M6 18L18 6M6 6l12 12" />;

// --- Main Homepage Component ---

function Homepage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateToAnalyzer = () => {
    // Temporarily allow access to Analyzer for testing
    // if (!user) {
    //   // Show login modal or redirect to login
    //   return;
    // }
    navigate('/analyzer');
  };





  return (
    <>
      <style>{`
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .aurora-bg {
          background: linear-gradient(-45deg, #020617, #111827, #1e293b, #334155);
          background-size: 400% 400%;
          animation: aurora 20s ease infinite;
        }
        .hero-glow {
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3);
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
      <div className="aurora-bg min-h-screen font-sans text-slate-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
          <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              {/* Logo and Title - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                <Link to="/" className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">MapMyGap</h1>
                  <span className="text-xs sm:text-sm text-slate-400">AI-Powered Compliance Analysis</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
                <Link to="/frameworks" className="text-slate-300 hover:text-white transition-colors">Frameworks</Link>
                <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link>
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
                    <button
                      onClick={navigateToAnalyzer}
                      className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Go to Analyzer
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={navigateToAnalyzer}
                      className="text-slate-300 hover:text-white transition-colors text-center sm:text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={navigateToAnalyzer}
                      className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </>
                )}
                
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                >
                  {isMobileMenuOpen ? <XMarkIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-slate-800">
                <div className="flex flex-col space-y-3 pt-4">
                  <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
                  <Link to="/frameworks" className="text-slate-300 hover:text-white transition-colors">Frameworks</Link>
                  <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
                  <Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
                  <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link>
                </div>
              </div>
            )}
          </nav>
        </header>
        
        <main>
          {/* Hero Section */}
          <section className="py-24 sm:py-32 text-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                {/* Enhanced Logo/Icon */}
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/25">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight hero-glow mb-8">
                  Map Your Compliance Gaps
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
                    with AI
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-8">
                  MapMyGap uses AI to analyze your internal standards against industry frameworks, 
                  <br className="hidden sm:block" />
                  <span className="text-blue-400 font-semibold">instantly identifying gaps</span> and generating the policy text you need to fix them.
                </p>
                
                {/* Enhanced Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Free analysis included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Results in minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={navigateToAnalyzer}
                  className="group relative rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-purple-700"
                >
                  <span className="relative z-10">{user ? 'Go to Analyzer' : 'Start Free Analysis'}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <Link
                  to="/how-it-works"
                  className="rounded-xl border-2 border-slate-600 px-10 py-5 text-lg font-semibold text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  See How It Works
                </Link>
              </div>
              
              {/* Social Proof */}
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-2">Trusted by compliance professionals</p>
                <div className="flex justify-center items-center gap-8 opacity-60">
                  <div className="text-slate-600 font-medium">NIST</div>
                  <div className="text-slate-600 font-medium">PCI DSS</div>
                  <div className="text-slate-600 font-medium">ISO 27001</div>
                  <div className="text-slate-600 font-medium">SOC 2</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-bold text-white tracking-tight mb-4">From Analysis to Alignment in Minutes</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">A smarter, faster way to manage compliance with AI-powered insights and automated solutions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 hover:scale-105">
                  <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                    <BoltIcon className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Gap Analysis</h3>
                  <p className="text-slate-300 leading-relaxed">Upload your policy documents and let our AI instantly compare them against frameworks like NIST, PCI DSS, and ISO 27001 to pinpoint exact compliance gaps.</p>
                </div>
                
                <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2 hover:scale-105">
                  <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                    <DocumentTextIcon className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Automated Policy Generation</h3>
                  <p className="text-slate-300 leading-relaxed">Don't just find problems—solve them. MapMyGap generates the exact policy language you need to address each gap, saving you hours of research and writing.</p>
                </div>
                
                <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transform hover:-translate-y-2 hover:scale-105">
                  <div className="mb-6 inline-block p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
                    <ShieldCheckIcon className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Continuous Compliance</h3>
                  <p className="text-slate-300 leading-relaxed">Save your reports, track your compliance score over time, and easily re-assess your standards as frameworks or your internal policies evolve.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24 bg-slate-800/30">
             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Six Simple Steps to Compliance</h2>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                    From document upload to actionable insights - our streamlined process makes compliance simple and efficient.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold text-lg mb-4 mx-auto">
                      1
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">Upload Your Documents</h4>
                    <p className="text-slate-400 text-center text-sm">Securely upload your internal standards or policy documents for analysis.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 font-bold text-lg mb-4 mx-auto">
                      2
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">Select Framework & Categories</h4>
                    <p className="text-slate-400 text-center text-sm">Choose your compliance framework and specific control categories to analyze.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold text-lg mb-4 mx-auto">
                      3
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">AI Analysis & Processing</h4>
                    <p className="text-slate-400 text-center text-sm">Our AI reads your document and performs detailed control-by-control gap analysis.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-lg mb-4 mx-auto">
                      4
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">Review Results & Scores</h4>
                    <p className="text-slate-400 text-center text-sm">Get your compliance score with detailed breakdown of gaps and partials.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-400 font-bold text-lg mb-4 mx-auto">
                      5
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">Generate Implementation Text</h4>
                    <p className="text-slate-400 text-center text-sm">Click any gap to generate the exact policy language needed for compliance.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-lg mb-4 mx-auto">
                      6
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">Export & Take Action</h4>
                    <p className="text-slate-400 text-center text-sm">Export your report and implement the generated policies to close compliance gaps.</p>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <Link
                    to="/how-it-works"
                    className="inline-flex items-center px-8 py-4 border border-slate-600 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 rounded-lg font-medium"
                  >
                    Learn More About How It Works →
                  </Link>
                </div>
             </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-24 relative overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
            
            <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">Ready to Automate Your Compliance?</h2>
                <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                  Stop spending weeks on manual reviews. Start closing gaps in minutes. 
                  <br className="hidden sm:block" />
                  <span className="text-blue-300 font-medium">
                    {user ? 'Use your existing account to continue.' : 'Create your account and get your first analysis report for free.'}
                  </span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={navigateToAnalyzer}
                  className="group relative rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-5 text-lg font-semibold text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-purple-700"
                >
                  <span className="relative z-10">{user ? 'Go to Analyzer' : 'Start Free Analysis'}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <Link
                  to="/frameworks"
                  className="rounded-xl border-2 border-slate-600 px-10 py-5 text-lg font-semibold text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  View Frameworks
                </Link>
              </div>
              
              {/* Additional trust indicators */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">Join compliance professionals who trust MapMyGap</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900/50 border-t border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-bold text-white mb-4">MapMyGap</h3>
                <p className="text-slate-400 mb-4">
                  AI-powered compliance gap analysis that helps organizations identify and fix 
                  compliance gaps in minutes, not months.
                </p>
                <div className="flex space-x-4">
                  <Link to="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
                  <Link to="/security" className="text-slate-400 hover:text-white transition-colors">Security</Link>
                  <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
                </div>
              </div>
              
              {/* Product */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</Link></li>
                  <li><Link to="/frameworks" className="text-slate-400 hover:text-white transition-colors">Frameworks</Link></li>
                  <li><Link to="/faq" className="text-slate-400 hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              
              {/* Legal */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-8 pt-8 text-center">
              <p className="text-slate-400">&copy; 2025 MapMyGap. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Homepage;
