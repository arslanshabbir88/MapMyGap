import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';
import { GUIDES } from './guides';

const SITE = 'https://mapmygap.com';

const Guides = ({ onShowLogin, onShowSignup }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE}/guides#webpage`,
        url: `${SITE}/guides`,
        name: 'Compliance Guides | MapMyGap',
        description:
          'Practical guides on SOC 2, ISO 27001, and other compliance frameworks, written for teams preparing for an audit.',
        publisher: { '@id': `${SITE}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SharedNavigation onShowLogin={onShowLogin} onShowSignup={onShowSignup} />

      <main>
        <section className="py-24 sm:py-32 bg-slate-800/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4">Guides</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Compliance guides
            </h1>
            <p className="text-xl text-slate-400">
              Short, practical explanations of the frameworks customers ask for, and how to prepare your policies before an audit.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                className="block bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-slate-500 transition-colors"
              >
                <p className="text-sm text-slate-500 mb-2">{guide.dateLabel}</p>
                <h2 className="text-2xl font-bold text-white mb-3">{guide.title}</h2>
                <p className="text-slate-400 mb-4">{guide.description}</p>
                <span className="text-blue-400 font-semibold">Read the guide</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Guides;
