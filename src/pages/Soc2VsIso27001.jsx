import React from 'react';
import { Link } from 'react-router-dom';
import SharedNavigation from '../components/SharedNavigation';
import SharedFooter from '../components/SharedFooter';

const SITE = 'https://mapmygap.com';
const PAGE_URL = `${SITE}/guides/soc-2-vs-iso-27001`;

const faqs = [
  {
    question: 'Is SOC 2 the same as ISO 27001?',
    answer:
      'No. SOC 2 is an AICPA attestation report on the controls at a service organization. ISO/IEC 27001 is an international standard for an information security management system, and an accredited body can certify that system. They cover similar security work, but the deliverable, the auditor, and the buyers who ask for each one are different.',
  },
  {
    question: 'Which should a SaaS company get first?',
    answer:
      'Start with the one your buyers already name in security reviews. US customers usually ask for a SOC 2 report. Customers in Europe, the UK, and many international procurements usually ask for ISO 27001. If both appear in deals, pick the one blocking revenue now. The policy and control work overlaps, so the second program is smaller than the first.',
  },
  {
    question: 'Is SOC 2 a certification?',
    answer:
      'SOC 2 is an examination report from a CPA firm, not a certification you hang on a public registry. A Type I report describes whether controls were suitably designed at a point in time. A Type II report also covers whether those controls operated effectively over a period, often three to twelve months. Customers typically receive the report under NDA.',
  },
  {
    question: 'How long is an ISO 27001 certificate valid?',
    answer:
      'An ISO 27001 certificate is commonly issued for three years, with surveillance audits in the years between recertification. The certificate can be shown publicly. The scope printed on it is the part of the business the auditor examined.',
  },
  {
    question: 'Can MapMyGap issue a SOC 2 report or an ISO 27001 certificate?',
    answer:
      'No. MapMyGap compares your policies and procedures to SOC 2 or ISO 27001 and shows the gaps. A CPA firm still has to examine you for SOC 2, and an accredited certification body still has to audit you for ISO 27001.',
  },
];

const comparison = [
  ['What you receive', 'An attestation report (Type I or Type II)', 'A certificate for a defined ISMS scope'],
  ['Who issues it', 'A licensed CPA firm', 'An accredited certification body'],
  ['What it is based on', 'AICPA Trust Services Criteria', 'ISO/IEC 27001:2022, with Annex A controls'],
  ['Required coverage', 'Security. Other criteria are optional.', 'An ISMS that meets the standard, scoped to your organization'],
  ['Who usually asks', 'US enterprise and SaaS buyers', 'International buyers, especially in Europe and the UK'],
  ['What you can share', 'The report, usually under NDA', 'A public certificate and statement of applicability'],
  ['Typical proof window', 'Type II needs months of operating evidence', 'Stage 1 and Stage 2 audits, then annual surveillance'],
];

const Soc2VsIso27001 = ({ onShowLogin, onShowSignup }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${PAGE_URL}#article`,
        headline: 'SOC 2 vs ISO 27001: Which Framework Should You Choose?',
        description:
          'A practical comparison of SOC 2 and ISO 27001: what each one proves, who asks for it, and how to choose which to pursue first.',
        datePublished: '2026-10-04',
        dateModified: '2026-10-04',
        author: { '@type': 'Organization', name: 'MapMyGap', url: SITE },
        publisher: { '@id': `${SITE}/#organization` },
        mainEntityOfPage: PAGE_URL,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE}/guides` },
          { '@type': 'ListItem', position: 3, name: 'SOC 2 vs ISO 27001', item: PAGE_URL },
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
                SOC 2 vs ISO 27001: which framework should you choose?
              </h1>
              <p className="text-xl text-slate-400">
                Both show customers that you take security seriously. They are not interchangeable. This guide explains what each one proves, who asks for it, and how to decide which to pursue first.
              </p>
            </div>
          </header>

          <div className="py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-lg leading-relaxed">
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">The short answer</h2>
                <p className="text-slate-300 mb-4">
                  Choose <strong className="text-white">SOC 2</strong> when US customers ask for a report on how you protect their data. Choose <strong className="text-white">ISO 27001</strong> when buyers, especially outside the United States, ask for a certified information security management system.
                </p>
                <p className="text-slate-300">
                  Many software companies eventually do both. The policies, access controls, vendor reviews, and incident process overlap. The expensive part is standing the program up the first time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Side-by-side comparison</h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-700">
                  <table className="min-w-[720px] w-full text-left text-base">
                    <thead className="bg-slate-800 text-white">
                      <tr>
                        <th className="px-4 py-3 font-semibold"> </th>
                        <th className="px-4 py-3 font-semibold">SOC 2</th>
                        <th className="px-4 py-3 font-semibold">ISO 27001</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map(([label, soc, iso]) => (
                        <tr key={label} className="border-t border-slate-700 align-top">
                          <th className="px-4 py-3 font-semibold text-white bg-slate-800/40 w-44">{label}</th>
                          <td className="px-4 py-3 text-slate-300">{soc}</td>
                          <td className="px-4 py-3 text-slate-300">{iso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What SOC 2 actually is</h2>
                <p className="text-slate-300 mb-4">
                  SOC 2 comes from the American Institute of CPAs. A CPA firm examines the controls at a service organization and issues a report. It is an attestation, not a certificate listed in a public directory.
                </p>
                <p className="text-slate-300 mb-4">
                  Security is the only Trust Services Criterion every SOC 2 report includes. Availability, Processing Integrity, Confidentiality, and Privacy are added when customers or the business need them. A company that only stores documents will not look like a company that promises uptime in a contract.
                </p>
                <p className="text-slate-300">
                  Type I answers whether the controls were designed properly on a given date. Type II answers whether they worked across a period of time. Enterprise buyers usually want Type II, because a design on paper is weaker evidence than months of operation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What ISO 27001 actually is</h2>
                <p className="text-slate-300 mb-4">
                  ISO/IEC 27001:2022 is the international standard for an information security management system, often called an ISMS. The ISMS is the ongoing system: scope, risk assessment, treatment plan, policies, internal audit, and management review. Annex A lists 93 reference controls in four groups: organizational, people, physical, and technological.
                </p>
                <p className="text-slate-300 mb-4">
                  You do not have to implement every Annex A control. You do have to decide, in a statement of applicability, which controls apply to the scope and why the others do not. An accredited certification body then audits that system. The certificate names the scope and is something you can show in a trust center.
                </p>
                <p className="text-slate-300">
                  ISO 27001 is the management standard. ISO 27002 is the companion guidance on the controls. Buyers asking for "ISO 27001" almost always mean the certificate, not a self-scored checklist.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Where they overlap</h2>
                <p className="text-slate-300 mb-4">
                  A team that has already written real policies will recognize the same work in both programs:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li>Access control, including joiner, mover, and leaver steps</li>
                  <li>Change management and secure development</li>
                  <li>Vendor and subprocessor review</li>
                  <li>Incident response and logging</li>
                  <li>Risk assessment and security awareness</li>
                  <li>Backup, asset inventory, and encryption</li>
                </ul>
                <p className="text-slate-300 mt-4">
                  The difference is the wrapper. SOC 2 maps that work to Trust Services Criteria and produces a CPA report. ISO 27001 maps it to an ISMS and produces a certificate. Doing one well makes the other faster. It does not automatically satisfy the other.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">How to decide</h2>
                <ol className="list-decimal pl-6 space-y-3 text-slate-300">
                  <li>Read the last ten security questionnaires. The framework named most often is the one to start with.</li>
                  <li>If US SaaS buyers are blocking deals on a SOC report, start with SOC 2 Security, and add other criteria only when a contract requires them.</li>
                  <li>If European or global procurement asks for a certificate, start with ISO 27001 and define a scope you can actually defend.</li>
                  <li>If you need a public mark this year and a US report next year, sequence them. Build the shared policies once, then map them twice.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What to prepare before you hire an auditor</h2>
                <p className="text-slate-300 mb-4">
                  Auditors examine evidence. The first gap most teams hit is simpler: the written policies do not cover the controls they think they have. Missing access reviews, a vendor policy that names no owner, or an incident plan that was never tested will show up in either program.
                </p>
                <p className="text-slate-300">
                  Map the documents you already have against the framework before you book the audit. That shows which controls are described, which are partial, and which are absent, so the remediation list is specific.
                </p>
              </section>

              <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Run the comparison on your own policies</h2>
                <p className="text-slate-300 mb-6">
                  MapMyGap reads your policies and procedures and marks gaps against SOC 2 or ISO 27001. It does not replace the CPA examination or the certification audit.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/frameworks?framework=soc2" className="inline-flex justify-center px-5 py-3 rounded-lg border border-slate-600 text-white hover:border-slate-400 transition-colors font-semibold">
                    SOC 2 in MapMyGap
                  </Link>
                  <Link to="/frameworks?framework=iso-27001" className="inline-flex justify-center px-5 py-3 rounded-lg border border-slate-600 text-white hover:border-slate-400 transition-colors font-semibold">
                    ISO 27001 in MapMyGap
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

export default Soc2VsIso27001;
