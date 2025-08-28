import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const About = () => {
  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our AI technology to our customer support."
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Security is at the core of our platform. We protect your data with enterprise-grade security measures."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We view our relationship with customers as a partnership, working together to achieve compliance success."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions that address evolving compliance challenges."
    },
    {
      icon: "🌍",
      title: "Accessibility",
      description: "We believe compliance excellence should be accessible to organizations of all sizes and industries."
    },
    {
      icon: "📚",
      title: "Education",
      description: "We're committed to educating our users about compliance best practices and industry standards."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <SharedNavigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 sm:py-32 text-center bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
              About MapMyGap
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We're on a mission to democratize compliance excellence through AI-powered technology, 
              making enterprise-grade compliance analysis accessible to organizations of all sizes.
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-slate-400 mb-6">
                  To transform how organizations approach compliance by providing AI-powered tools that 
                  make gap analysis faster, more accurate, and more actionable than traditional methods.
                </p>
                <p className="text-lg text-slate-400">
                  We believe that compliance shouldn't be a barrier to business success, but rather a 
                  foundation for growth and trust. By automating the complex and time-consuming aspects 
                  of compliance analysis, we enable organizations to focus on what they do best.
                </p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-slate-400 mb-6">
                  A world where compliance excellence is achievable for every organization, regardless of 
                  size or industry, through intelligent automation and AI-driven insights.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">✓</span>
                    <span className="text-slate-300">Universal compliance accessibility</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">✓</span>
                    <span className="text-slate-300">AI-powered compliance intelligence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400">✓</span>
                    <span className="text-slate-300">Continuous compliance improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 bg-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              Our Story
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              MapMyGap was born from a simple observation: compliance analysis was unnecessarily complex, 
              time-consuming, and expensive. Organizations were spending months and thousands of dollars 
              on manual compliance reviews that could be completed in minutes with the right technology.
            </p>
            <p className="text-lg text-slate-400 mb-8">
              Our founders, with deep experience in cybersecurity, compliance, and AI, recognized that 
              the same artificial intelligence technology transforming other industries could revolutionize 
              how organizations approach compliance. We set out to build a platform that would make 
              enterprise-grade compliance analysis accessible to everyone.
            </p>
            <p className="text-lg text-slate-400">
              Today, MapMyGap serves organizations across industries, helping them achieve compliance 
              excellence faster and more cost-effectively than ever before. We're proud to be at the 
              forefront of the AI-powered compliance revolution.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Our Values
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                These core values guide everything we do and shape how we serve our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-slate-600 transition-all duration-300">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-slate-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              Ready to Experience the Future of Compliance?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Join organizations that have already transformed their compliance process with MapMyGap. 
              See how AI-powered analysis can revolutionize your approach to compliance.
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

export default About;
