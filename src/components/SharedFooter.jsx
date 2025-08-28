import React from 'react';
import { Link } from 'react-router-dom';

const SharedFooter = () => {
  return (
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
  );
};

export default SharedFooter;
