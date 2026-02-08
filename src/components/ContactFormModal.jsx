import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

const Icon = ({ path, className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function ContactFormModal({ isOpen, onClose, type = 'support' }) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitType, setSubmitType] = useState(type);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setSubmitType(type);
  }, [type, isOpen]);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (user?.user_metadata?.full_name) setName(user.user_metadata.full_name || '');
  }, [user, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          type: submitType,
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const title = submitType === 'sales' ? 'Contact Sales' : 'Email Support';

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700/50"
            >
              <Icon path="M6 18L18 6M6 6l12 12" />
            </button>
          </div>

          {success ? (
            <p className="text-green-400 font-medium">Message sent. We’ll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-type" className="block text-sm font-medium text-slate-300 mb-1">Regarding</label>
                <select
                  id="contact-type"
                  value={submitType}
                  onChange={(e) => setSubmitType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="support">Support</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Sending…' : 'Send'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
