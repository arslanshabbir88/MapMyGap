import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Chief Information Security Officer with 15+ years in cybersecurity and compliance. Led compliance programs for Fortune 500 companies and government agencies.",
      expertise: ["Cybersecurity", "Compliance Strategy", "Risk Management"],
      image: "👩‍💼",
      linkedin: "#"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI/ML expert with PhD in Computer Science from Stanford. Previously led AI teams at Google and Microsoft, specializing in natural language processing and compliance automation.",
      expertise: ["Artificial Intelligence", "Machine Learning", "Software Architecture"],
      image: "👨‍💻",
      linkedin: "#"
    },
    {
      name: "Jennifer Park",
      role: "Head of Product",
      bio: "Product leader with 12+ years building enterprise software. Former Product Manager at Salesforce and Workday, specializing in compliance and security products.",
      expertise: ["Product Strategy", "User Experience", "Enterprise Software"],
      image: "👩‍🎨",
      linkedin: "#"
    },
    {
      name: "David Thompson",
      role: "Head of Security",
      bio: "Cybersecurity veteran with 20+ years experience. Former CISO at major financial institutions and government contractor. Expert in security frameworks and compliance standards.",
      expertise: ["Security Architecture", "Compliance Frameworks", "Incident Response"],
      image: "👨‍🔒",
      linkedin: "#"
    },
    {
      name: "Lisa Wang",
      role: "Head of Customer Success",
      bio: "Customer success leader with deep expertise in compliance consulting. Previously led customer success teams at major GRC software companies.",
      expertise: ["Customer Success", "Compliance Consulting", "Training & Onboarding"],
      image: "👩‍🎓",
      linkedin: "#"
    },
    {
      name: "Robert Kim",
      role: "Lead AI Engineer",
      bio: "Senior AI engineer specializing in natural language processing and compliance analysis. Previously worked on AI systems at OpenAI and Anthropic.",
      expertise: ["Natural Language Processing", "AI Systems", "Compliance Analysis"],
      image: "👨‍🔬",
      linkedin: "#"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for excellence in everything we do, from our AI technology to our customer support. We're never satisfied with 'good enough' and continuously push to improve."
    },
    {
      icon: "🤝",
      title: "Trust",
      description: "Trust is the foundation of our business. We earn and maintain trust through transparency, security, and delivering on our promises to customers."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We embrace innovation and cutting-edge technology to solve complex compliance challenges. We're always exploring new ways to make compliance easier and more effective."
    },
    {
      icon: "👥",
      title: "Customer Focus",
      description: "Our customers are at the center of everything we do. We listen, learn, and continuously improve our platform based on their needs and feedback."
    },
    {
      icon: "🔒",
      title: "Security First",
      description: "Security isn't just a feature—it's fundamental to our platform. We implement the highest security standards to protect our customers' sensitive data."
    },
    {
      icon: "🌍",
      title: "Impact",
      description: "We're driven by the impact we can make on organizations' compliance posture and security. We want to make the world a safer place through better compliance."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "MapMyGap was founded with a mission to revolutionize compliance analysis through AI technology."
    },
    {
      year: "2024",
      title: "First Product Launch",
      description: "Launched our AI-powered compliance gap analysis platform with support for major frameworks."
    },
    {
      year: "2024",
      title: "First 100 Customers",
      description: "Reached our first 100 customers, including several Fortune 500 companies and government agencies."
    },
    {
      year: "2024",
      title: "Series A Funding",
      description: "Secured $15M in Series A funding to accelerate product development and market expansion."
    },
    {
      year: "2025",
      title: "International Expansion",
      description: "Expanded to serve customers in Europe and Asia, with localized compliance framework support."
    },
    {
      year: "2025",
      title: "10,000+ Documents Analyzed",
      description: "Our AI has analyzed over 10,000 compliance documents, continuously improving accuracy and insights."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About MapMyGap</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're on a mission to transform how organizations approach compliance by making 
            it faster, smarter, and more accessible through the power of artificial intelligence.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To democratize access to enterprise-grade compliance analysis by leveraging 
                cutting-edge AI technology. We believe every organization, regardless of size, 
                should have access to the same level of compliance insights that Fortune 500 
                companies enjoy.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By automating the tedious and time-consuming aspects of compliance analysis, 
                we free up compliance professionals to focus on what matters most: implementing 
                effective controls and building stronger security postures.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A world where compliance is no longer a barrier to business growth, but a 
                competitive advantage that organizations can leverage to build trust, reduce 
                risk, and accelerate innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MapMyGap was born from frustration with the traditional compliance process 
              and a vision for how AI could transform it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Problem</h3>
              <p className="text-gray-600">
                Our founders experienced firsthand how manual compliance analysis was slow, 
                expensive, and error-prone. Organizations were spending months and hundreds 
                of thousands of dollars on consultants who often missed critical gaps.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Insight</h3>
              <p className="text-gray-600">
                We realized that AI could analyze compliance documents faster and more 
                thoroughly than humans, identifying patterns and gaps that even experienced 
                consultants might miss.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Solution</h3>
              <p className="text-gray-600">
                MapMyGap was built to combine the best of human expertise with AI capabilities, 
                creating a platform that delivers professional-grade compliance analysis in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do, from product development to customer 
              relationships and company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse team of cybersecurity experts, AI engineers, and compliance 
              professionals passionate about making compliance easier and more effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href={member.linkedin}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View LinkedIn →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startup to industry leader, here are the key milestones in our journey 
              to transform compliance analysis.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Culture */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Culture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that great products come from great teams, and great teams are 
              built on strong culture and shared values.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Believe</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Innovation happens when diverse perspectives come together</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Customer success is our success</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Continuous learning and growth drive excellence</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Transparency builds trust with customers and employees</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Flexible work arrangements and remote-first culture</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Competitive compensation and equity packages</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Professional development and learning opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Health, dental, and vision benefits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Us on Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're a customer looking to transform your compliance process, 
            a potential team member, or an investor interested in our vision, 
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Try MapMyGap
            </Link>
            <a
              href="mailto:careers@mapmygap.com"
              className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Join Our Team
            </a>
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
              <Link to="/careers" className="text-blue-600 hover:text-blue-800 font-medium">
                Careers →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
