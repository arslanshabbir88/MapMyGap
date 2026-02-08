import React, { createContext, useContext, useState } from 'react';
import ContactFormModal from '../components/ContactFormModal.jsx';

const ContactFormContext = createContext(null);

export function ContactFormProvider({ children }) {
  const [state, setState] = useState({ open: false, type: 'support' });

  const openContactForm = (type = 'support') => {
    setState({ open: true, type: type === 'sales' ? 'sales' : 'support' });
  };

  const closeContactForm = () => {
    setState((s) => ({ ...s, open: false }));
  };

  return (
    <ContactFormContext.Provider value={{ openContactForm }}>
      {children}
      <ContactFormModal
        isOpen={state.open}
        onClose={closeContactForm}
        type={state.type}
      />
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) return { openContactForm: () => {} };
  return ctx;
}
