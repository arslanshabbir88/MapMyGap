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

function Homepage({ onShowLogin }) {
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
    if (!user) {
      // Show login modal
      if (onShowLogin) {
        onShowLogin();
      }
      return;
    }
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
        <header className="lg:sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
          <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              {/* Logo and Title - More compact on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-4">
                <Link to="/" className="flex flex-col sm:flex-row sm:items-center space-y-0.5 sm:space-y-0 sm:space-x-4">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">MapMyGap</h1>
                  <span className="text-xs text-slate-400 hidden sm:block">AI-Powered Compliance Analysis</span>
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
              
              {/* Navigation and User Actions - More compact on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                {user ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                      >
                        <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xs font-medium">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                        </span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                      >
                        <LogoutIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="text-xs">Logout</span>
                      </button>
                    </div>
                    <button
                      onClick={navigateToAnalyzer}
                      className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Go to Analyzer
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={navigateToAnalyzer}
                      className="text-slate-300 hover:text-white transition-colors text-center sm:text-left text-xs sm:text-sm"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={navigateToAnalyzer}
                      className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </>
                )}
                
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-1.5 sm:p-2 text-slate-300 hover:text-white transition-colors"
                >
                  {isMobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation Menu - More compact */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-3 pb-3 border-t border-slate-800">
                <div className="flex flex-col space-y-2 pt-3">
                  <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors text-sm">How It Works</Link>
                  <Link to="/frameworks" className="text-slate-300 hover:text-white transition-colors text-sm">Frameworks</Link>
                  <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors text-sm">Pricing</Link>
                  <Link to="/about" className="text-slate-300 hover:text-white transition-colors text-sm">About</Link>
                  <Link to="/faq" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</Link>
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
                
                <p className="text-xl sm:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-12">
                  Get professional-grade AI compliance analysis in <span className="text-blue-400 font-semibold">minutes, not weeks</span>. 
                  <br className="hidden sm:block" />
                  Skip weeks of waiting and get instant, actionable insights.
                </p>
                
                {/* Key Metrics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">100x Faster</div>
                    <div className="text-slate-300">Than traditional consulting</div>
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">Weeks Saved</div>
                    <div className="text-slate-300">Per framework analysis</div>
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                    <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">5 Minutes</div>
                    <div className="text-slate-300">To complete analysis</div>
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
              
            </div>
          </section>

          {/* Flagship Feature - AI Implementation Generator */}
          <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-blue-900/20">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
                  <span className="text-amber-300 font-semibold text-sm">⚡ FLAGSHIP FEATURE</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                  AI-Powered Implementation Generator
                </h2>
                <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                  Don't just identify gaps — <span className="text-blue-400 font-semibold">fix them instantly</span>. Our AI generates complete, 
                  ready-to-use implementation text that transforms compliance gaps into covered controls.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Feature highlights */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Instant Policy Generation</h3>
                      <p className="text-slate-300">Click any gap and watch as AI generates complete, framework-specific implementation text in seconds.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Ready-to-Use Implementation Text</h3>
                      <p className="text-slate-300">No more hours of research. Get specific technical details, procedures, monitoring requirements, and roles — all ready to copy.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-all duration-300">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Matches Your Writing Style</h3>
                      <p className="text-slate-300">AI analyzes your existing documents and generates text that matches your organization's tone and style.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/pricing"
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      Available on Professional & Enterprise Plans →
                    </Link>
                  </div>
                </div>

                {/* Right side - Visual example */}
                <div className="relative">
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-700">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-slate-400 text-sm ml-2">AI Implementation Generator</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-red-400 font-semibold text-sm">❌ GAP IDENTIFIED</span>
                        </div>
                        <p className="text-slate-300 text-sm">Access Control: User authentication mechanisms</p>
                      </div>

                      <div className="flex items-center justify-center py-2">
                        <div className="flex items-center space-x-2 text-blue-400 animate-pulse">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                          <span className="text-sm font-medium">AI Generating...</span>
                        </div>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-green-400 font-semibold text-sm">✓ IMPLEMENTATION TEXT</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          "The organization implements multi-factor authentication (MFA) using Azure AD for all user accounts accessing corporate systems. 
                          Authentication tokens expire after 8 hours. Failed login attempts are logged in our SIEM system and trigger alerts after 5 consecutive failures..."
                        </p>
                        <button className="mt-3 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                          Copy to clipboard →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10 opacity-50"></div>
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

          {/* Why MapMyGap - Value Proposition */}
          <section className="py-24 bg-gradient-to-b from-slate-800/50 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Why Organizations Choose MapMyGap
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Transform your compliance workflow from weeks of waiting to minutes of action
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Speed Comparison */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4">⚡</div>
                    <h3 className="text-2xl font-bold text-white">Lightning Fast Results</h3>
                  </div>
                  <div className="space-y-4 text-slate-300">
                    <div className="flex justify-between items-center">
                      <span>Traditional Consulting</span>
                      <span className="text-red-400 font-semibold">6-8 weeks</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-lg overflow-hidden">
                      <div className="h-3 bg-red-500 rounded-lg" style={{width: '100%'}}></div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span>MapMyGap</span>
                      <span className="text-green-400 font-semibold">5 minutes</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-lg overflow-hidden">
                      <div className="h-3 bg-green-500 rounded-lg" style={{width: '2%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Resource Liberation */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4">🎯</div>
                    <h3 className="text-2xl font-bold text-white">Free Up Your Team</h3>
                  </div>
                  <div className="space-y-4 text-slate-300">
                    <p className="text-lg">
                      Stop spending <span className="text-blue-400 font-semibold">40-80 hours per framework</span> coordinating with consultants and waiting for results.
                    </p>
                    <p className="text-lg">
                      Let your compliance team focus on <span className="text-green-400 font-semibold">closing gaps</span>, not managing consultant schedules.
                    </p>
                  </div>
                </div>

                {/* Flexible Iterations */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4">🔄</div>
                    <h3 className="text-2xl font-bold text-white">Iterate Freely</h3>
                  </div>
                  <div className="space-y-4 text-slate-300">
                    <p className="text-lg">
                      <span className="text-red-400 font-semibold">Traditional consulting:</span> Limited revisions, additional fees for changes
                    </p>
                    <p className="text-lg">
                      <span className="text-green-400 font-semibold">MapMyGap:</span> Re-analyze as often as your plan allows as you update policies
                    </p>
                  </div>
                </div>

                {/* Multi-Framework */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4">🏆</div>
                    <h3 className="text-2xl font-bold text-white">All Frameworks, One Platform</h3>
                  </div>
                  <div className="space-y-4 text-slate-300">
                    <p className="text-lg">
                      Analyze <span className="text-purple-400 font-semibold">NIST, ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR</span>, and more
                    </p>
                    <p className="text-lg">
                      No need for multiple consultants or tools—<span className="text-green-400 font-semibold">everything in one place</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Line Summary */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  The Bottom Line
                </h3>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  MapMyGap delivers professional-grade AI analysis—<span className="text-blue-400 font-semibold">100x faster</span>, with <span className="text-green-400 font-semibold">flexible iterations</span>, and <span className="text-purple-400 font-semibold">complete control</span> over your timeline.
                </p>
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
