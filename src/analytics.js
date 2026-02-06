// Centralized Google Analytics / Google Ads loader, gated by consent

const GA_MEASUREMENT_ID = 'G-613K4Q3WKK';
const GOOGLE_ADS_ID = 'AW-17916960843';

export function loadAnalytics() {
  if (typeof window === 'undefined') return;

  // Avoid initializing multiple times
  if (window.gtagInitialized) return;

  // Create script tag for gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  // Configure Google Analytics
  gtag('config', GA_MEASUREMENT_ID);

  // Configure Google Ads (same gtag instance)
  gtag('config', GOOGLE_ADS_ID);

  window.gtagInitialized = true;
}

export function hasConsentedToAnalytics() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('cookieConsent') === 'accepted';
}

export function setAnalyticsConsent(consent) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('cookieConsent', consent ? 'accepted' : 'rejected');
}

