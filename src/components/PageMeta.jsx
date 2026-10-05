import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FRAMEWORK_NAMES = {
  'nist-csf': 'NIST CSF',
  'nist-800-53': 'NIST 800-53',
  'nist-800-63': 'NIST 800-63',
  'soc1': 'SOC 1',
  'soc2': 'SOC 2',
  'iso-27001': 'ISO 27001',
  'pci-dss': 'PCI DSS',
  'nydfs-500': 'NYDFS 500',
  'hipaa': 'HIPAA',
  'sox': 'SOX',
};

const SITE = 'https://mapmygap.com';
const DEFAULT_TITLE = 'MapMyGap - AI-Powered Compliance Gap Analysis';
const DEFAULT_DESC = 'Get professional compliance gap analysis in 5 minutes instead of 6 weeks. AI-powered analysis for NIST CSF, ISO 27001, SOC 2, PCI DSS, HIPAA, and more.';

const ROUTE_META = {
  '/': {
    title: `${DEFAULT_TITLE} | NIST, ISO 27001, SOC 2`,
    description: DEFAULT_DESC,
  },
  '/pricing': {
    title: 'Pricing | MapMyGap',
    description: 'MapMyGap pricing: free 14-day trial, Starter, Professional, and Enterprise plans. AI compliance gap analysis for NIST, ISO 27001, SOC 2, PCI DSS, and more.',
  },
  '/frameworks': {
    title: 'Compliance Frameworks | MapMyGap',
    description: 'Supported frameworks: NIST CSF, NIST 800-53, ISO 27001, SOC 2, PCI DSS, HIPAA, SOX, NYDFS. Compare and analyze against industry standards.',
  },
  '/how-it-works': {
    title: 'How It Works | MapMyGap',
    description: 'Upload documents, select a framework, get AI-powered gap analysis in minutes. Export results and generate implementation text for compliance.',
  },
  '/faq': {
    title: 'FAQ | MapMyGap',
    description: 'Frequently asked questions about MapMyGap: pricing, frameworks, security, free trial, and AI compliance gap analysis.',
  },
  '/about': {
    title: 'About | MapMyGap',
    description: 'MapMyGap makes enterprise-grade compliance gap analysis accessible with AI. Learn about our mission and values.',
  },
  '/security': {
    title: 'Security | MapMyGap',
    description: 'How MapMyGap secures your data: encryption, OAuth, access controls, and secure document storage for compliance analysis.',
  },
  '/terms': {
    title: 'Terms of Service | MapMyGap',
    description: 'MapMyGap terms of service and acceptable use policy.',
  },
  '/privacy': {
    title: 'Privacy Policy | MapMyGap',
    description: 'MapMyGap privacy policy: how we collect, use, and protect your information.',
  },
  '/guides': {
    title: 'Compliance Guides | MapMyGap',
    description: 'Practical guides on SOC 2, ISO 27001, and other frameworks for teams preparing policies before an audit.',
  },
  '/guides/soc-2-vs-iso-27001': {
    title: 'SOC 2 vs ISO 27001 | MapMyGap',
    description: 'SOC 2 vs ISO 27001: what each one proves, who asks for it, and how to choose which compliance framework to pursue first.',
    type: 'article',
  },
  '/subscription-success': {
    title: 'Subscription Active | MapMyGap',
    description: 'Your MapMyGap subscription is active. Start analyzing compliance documents.',
  },
};

export default function PageMeta() {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  useEffect(() => {
    let title = DEFAULT_TITLE;
    let description = DEFAULT_DESC;

    const base = ROUTE_META[pathname];
    if (base) {
      title = base.title;
      description = base.description;
    }

    if (pathname === '/frameworks' && search.startsWith('?framework=')) {
      const slug = new URLSearchParams(search).get('framework');
      const name = FRAMEWORK_NAMES[slug] || slug;
      if (name) {
        title = `${name} | Compliance Frameworks | MapMyGap`;
        description = `MapMyGap supports ${name} for AI-powered compliance gap analysis. Analyze your documents against ${name} controls.`;
      }
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    let canonicalPath = pathname || '/';
    if (pathname === '/frameworks' && search.startsWith('?framework=')) {
      const slug = new URLSearchParams(search).get('framework');
      if (FRAMEWORK_NAMES[slug]) canonicalPath = `/frameworks?framework=${slug}`;
    }
    const canonical = `${SITE}${canonicalPath === '/' ? '/' : canonicalPath}`;

    const setContent = (selector, content) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setContent('meta[name="title"]', title);
    setContent('meta[property="og:title"]', title);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', canonical);
    setContent('meta[property="og:type"]', base?.type || 'website');
    setContent('meta[property="twitter:title"]', title);
    setContent('meta[property="twitter:description"]', description);
    setContent('meta[property="twitter:url"]', canonical);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', canonical);
  }, [pathname, search]);

  return null;
}
