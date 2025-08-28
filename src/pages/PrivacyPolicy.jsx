import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Your Privacy Matters</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>We are committed to protecting your privacy and ensuring the security of your data. This policy explains how we collect, use, and protect your information.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p>MapMyGap ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered compliance gap analysis platform.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, company name, and role</li>
              <li><strong>Documents:</strong> Compliance documents, policies, and procedures you upload</li>
              <li><strong>Usage Data:</strong> Framework selections, analysis preferences, and settings</li>
              <li><strong>Communication:</strong> Support requests, feedback, and correspondence</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
              <li><strong>Usage Analytics:</strong> Pages visited, features used, time spent</li>
              <li><strong>Performance Data:</strong> Error logs, response times, system performance</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Primary Uses</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> Providing compliance analysis and gap identification</li>
              <li><strong>AI Processing:</strong> Analyzing documents using our AI models</li>
              <li><strong>User Experience:</strong> Personalizing and improving our service</li>
              <li><strong>Communication:</strong> Sending important updates and support responses</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 AI Processing Details</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800"><strong>Important:</strong> Your documents are processed by AI systems to generate compliance analysis. This processing is essential for our service delivery.</p>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Documents are analyzed in real-time by AI models</li>
              <li>AI processing extracts compliance-relevant information</li>
              <li>Generated analysis is based on your document content</li>
              <li>No human review of your document content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Storage and Retention</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Document Storage</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Real-time Processing:</strong> Documents are processed immediately upon upload</li>
              <li><strong>Temporary Storage:</strong> 30-day retention for user convenience</li>
              <li><strong>Secure Deletion:</strong> Automatic deletion after retention period</li>
              <li><strong>No Permanent Storage:</strong> We do not permanently store your documents</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Data Retention Schedule</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Data Type</th>
                    <th className="text-left py-2">Retention Period</th>
                    <th className="text-left py-2">Disposal Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Uploaded Documents</td>
                    <td className="py-2">30 days</td>
                    <td className="py-2">Secure deletion</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Analysis Results</td>
                    <td className="py-2">90 days</td>
                    <td className="py-2">Secure deletion</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Account Information</td>
                    <td className="py-2">Until account deletion</td>
                    <td className="py-2">Account deletion</td>
                  </tr>
                  <tr>
                    <td className="py-2">Usage Analytics</td>
                    <td className="py-2">2 years</td>
                    <td className="py-2">Anonymization</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Security</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.1 Security Measures</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
              <li><strong>Access Controls:</strong> Strict access controls and authentication</li>
              <li><strong>Network Security:</strong> Secure infrastructure and firewalls</li>
              <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
              <li><strong>Employee Training:</strong> Regular security awareness training</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.2 Data Protection Standards</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Compliance with industry security standards</li>
              <li>Regular security updates and patches</li>
              <li>Incident response and breach notification procedures</li>
              <li>Business continuity and disaster recovery plans</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.1 We Do Not Share</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your uploaded documents with third parties</li>
              <li>Your analysis results with other users</li>
              <li>Your personal information for marketing purposes</li>
              <li>Your data with advertisers or data brokers</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.2 Limited Sharing Scenarios</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Essential third-party services (hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or court order</li>
              <li><strong>Business Transfers:</strong> In case of company sale or merger</li>
              <li><strong>Safety:</strong> To protect rights, property, or safety</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.1 GDPR Rights (EU Users)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.2 How to Exercise Your Rights</h3>
            <p>To exercise any of these rights, please contact us at privacy@mapmygap.com. We will respond to your request within 30 days.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Cookies and Tracking</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.1 Types of Cookies</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us improve our service</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.2 Cookie Management</h3>
            <p>You can control cookies through your browser settings. However, disabling certain cookies may affect service functionality.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. International Data Transfers</h2>
            <p>Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses and adequacy decisions.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Children's Privacy</h2>
            <p>Our service is not intended for children under 16. We do not knowingly collect personal information from children under 16. If you believe we have collected such information, please contact us immediately.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
            <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-semibold">Privacy Officer</p>
              <p>Email: privacy@mapmygap.com</p>
              <p>Website: https://mapmygap.com</p>
              <p>Address: [Your Company Address]</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Data Protection Authority</h2>
            <p>If you are in the EU and have concerns about our data processing, you have the right to lodge a complaint with your local data protection authority.</p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                By using MapMyGap, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
