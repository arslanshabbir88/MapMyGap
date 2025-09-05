import React from 'react';
import Header from './Header';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
