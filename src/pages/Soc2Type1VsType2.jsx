import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const SITE = 'https://www.mapmygap.com';
const PAGE_URL = `${SITE}/guides/soc-2-type-1-vs-type-2`;

const faqs = [
  {
    question: 'Is SOC 2 Type II the same control set as Type I?',
    answer:
      'The Trust Services Criteria can be the same. Security is required in both reports, and Availability, Processing Integrity, Confidentiality, and Privacy are optional in both. The difference is the test. Type I asks whether the controls were suitably designed on a specific date. Type II also asks whether those controls operated effectively across a period of time.',
  },
  {
    question: 'How long is a SOC 2 Type II period?',
    answer:
      'The company and the CPA firm agree on the period. A first Type II is often three to six months. Later reports are often twelve months. The auditor has to collect evidence from inside that window, so the controls need to be running before the period starts.',
  },
  {
    question: 'Can we skip Type I and go straight to Type II?',
    answer:
      'Yes, if the controls have already been operating long enough to cover the examination period. Type I is a faster first report when a customer will accept a design opinion. It is not a required step on the way to Type II.',
  },
  {
    question: 'Will enterprise buyers accept a Type I report?',
    answer:
      'Some will, especially early in a deal or from a younger company. Many security reviews ask for a Type II because it shows the controls worked over time, not only that they were written down on one date. Read the questionnaire. If it says SOC 2 Type II, a Type I report will not satisfy it.',
  },
  {
    question: 'Can MapMyGap issue a Type I or Type II report?',
    answer:
      'No. MapMyGap compares your policies and procedures to SOC 2 and shows the gaps. A licensed CPA firm still has to examine the controls and issue the report.',
  },
];

const comparison = [
  ['What the auditor tests', 'Whether controls were suitably designed on one date', 'Whether controls were designed properly and operated effectively over a period'],
  ['Time covered', 'A specific date', 'A period, often three to twelve months'],
  ['Evidence', 'Policies, control descriptions, and a point-in-time walkthrough', 'Those items, plus samples that the controls ran during the period'],
  ['How long it takes', 'Shorter, because there is no observation window', 'At least as long as the period, plus the examination'],
  ['What buyers usually want', 'Acceptable for some early reviews', 'The report named in most enterprise security reviews'],
  ['What you receive', 'A restricted SOC 2 report from a CPA firm', 'A restricted SOC 2 report from a CPA firm'],
];

const Soc2Type1VsType2 = ({ onShowLogin, onShowSignup }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${PAGE_URL}#article`,
        headline: 'SOC 2 Type I vs Type II: Which Report Should You Get?',
        description:
          'How SOC 2 Type I and Type II differ, who accepts each report, and how to decide which examination to book.',
        datePublished: '2026-10-24',
        dateModified: '2026-10-24',
        author: { '@type': 'Organization', name: 'MapMyGap', url: SITE },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: PAGE_URL,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
          { '@type': 'ListItem', position: 3, name: 'SOC 2 Type I vs Type II', item: PAGE_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SharedNavigation onShowLogin={onShowLogin} onShowSignup={onShowSignup} />

      <main>
        <article>
          <header className="py-20 sm:py-28 bg-slate-800/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm text-slate-500 mb-4">
                <Link to="/guides" className="text-blue-400 hover:text-blue-300">Guides</Link>
                <span className="mx-2">/</span>
                <span>Updated October 2026</span>
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                SOC 2 Type I vs Type II: which report should you get?
              </h1>
              <p className="text-xl text-slate-400">
                Both are SOC 2 reports from a CPA firm. Type I describes the design of your controls on one date. Type II also tests whether those controls worked over a period of time.
              </p>
            </div>
          </header>

          <div className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-lg leading-relaxed">
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">The short answer</h2>
                <p className="text-slate-300 mb-4">
                  Get a <strong className="text-white">Type II</strong> report when customers ask for SOC 2 and their security review will not accept anything weaker. Get a <strong className="text-white">Type I</strong> report when you need a CPA opinion sooner and the buyer has said a point-in-time design report is enough.
                </p>
                <p className="text-slate-300">
                  Type I is not a junior version of the same proof. It answers a smaller question. If the questionnaire says Type II, a Type I report does not close it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Side-by-side comparison</h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-700">
                  <table className="min-w-[720px] w-full text-left text-base">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="px-4 py-3 font-semibold"> </th>
                        <th className="px-4 py-3 font-semibold">Type I</th>
                        <th className="px-4 py-3 font-semibold">Type II</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map(([label, type1, type2]) => (
                        <tr key={label} className="border-t border-slate-700 align-top">
                          <th className="px-4 py-3 font-semibold text-white bg-slate-800/40 w-44">{label}</th>
                          <td className="px-4 py-3 text-slate-300">{type1}</td>
                          <td className="px-4 py-3 text-slate-300">{type2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What a Type I report proves</h2>
                <p className="text-slate-300 mb-4">
                  A Type I examination looks at a single date. The CPA firm reports on whether the controls were suitably designed to meet the Trust Services Criteria you included, and whether those controls were in place on that date.
                </p>
                <p className="text-slate-300">
                  It does not report on whether the access review happened every quarter, or whether the incident process was followed in March. A control can be well designed on the examination date and still fail in practice the month before. That is why a Type I report is faster, and why many buyers treat it as a starting point.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What a Type II report proves</h2>
                <p className="text-slate-300 mb-4">
                  A Type II examination covers a period. The firm still looks at design, and it also tests operating effectiveness. Auditors sample evidence from inside the window: completed access reviews, change tickets, vendor reviews, backups, security training, and incident records.
                </p>
                <p className="text-slate-300 mb-4">
                  The period is agreed with the firm. A first Type II is often three to six months. A renewal is often twelve. The clock does not start when you hire the auditor. It starts when the controls are already operating, because the firm can only test what happened during the period.
                </p>
                <p className="text-slate-300">
                  Enterprise security reviews usually name Type II for this reason. Months of operation are stronger evidence than a description of the control on one day.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What does not change</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>Both reports come from a licensed CPA firm. Neither is a public certificate.</li>
                  <li>Security is required. The other Trust Services Criteria are included only if you choose them.</li>
                  <li>Customers usually receive the report under NDA.</li>
                  <li>The written policies still have to describe the controls the auditor will examine.</li>
                </ul>
                <p className="text-slate-300 mt-4">
                  Choosing between SOC 2 and ISO 27001 is a different decision. That comparison is in <Link to="/guides/soc-2-vs-iso-27001" className="text-blue-400 hover:text-blue-300">SOC 2 vs ISO 27001</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">How to decide</h2>
                <ol className="list-decimal pl-6 space-y-3 text-slate-300">
                  <li>Read the security questionnaire. If it says SOC 2 Type II, book a Type II. A Type I report will not satisfy that request.</li>
                  <li>If a customer will accept Type I and a deal is waiting, a Type I report can come first. Plan the Type II period so it starts as soon as the controls are actually running.</li>
                  <li>If the controls have already operated for several months, skip Type I and examine that history as a Type II.</li>
                  <li>Keep the criteria list short. Security is enough until a contract requires Availability, Confidentiality, or another category.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What to prepare before either examination</h2>
                <p className="text-slate-300 mb-4">
                  Type II fails more often on missing evidence than on missing policy titles. An access-review control that was never performed cannot be sampled. A vendor process with no completed reviews cannot be tested across the period.
                </p>
                <p className="text-slate-300">
                  Start with the documents. Map the policies you already have to the SOC 2 criteria and list what is covered, partial, or missing. Then check that the operating evidence exists for every control you expect the auditor to test. A Type I examination can proceed from the design. A Type II examination still needs the trail.
                </p>
              </section>

              <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Check the policies before you book the exam</h2>
                <p className="text-slate-300 mb-6">
                  MapMyGap reads your policies and procedures and marks gaps against SOC 2. It does not replace the CPA examination, and it does not issue a Type I or Type II report.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/frameworks?framework=soc2" className="inline-flex justify-center px-5 py-3 rounded-lg border border-slate-600 text-white hover:border-slate-400 transition-colors font-semibold">
                    SOC 2 in MapMyGap
                  </Link>
                  <Link to="/pricing" className="inline-flex justify-center px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                    View pricing
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Common questions</h2>
                <div className="space-y-6">
                  {faqs.map((item) => (
                    <div key={item.question}>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.question}</h3>
                      <p className="text-slate-300">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <SharedFooter />
    </div>
  );
};

export default Soc2Type1VsType2;
