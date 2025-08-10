import React, { useState } from 'react';

// --- Helper Components ---

// Icon component for better UI
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const FileUploadIcon = () => <Icon path="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.158 10.308L12 14.25l1.592-1.592m-3.184 0M12 12.75v-1.5m-3.184 4.692L6.625 16.5" className="w-10 h-10 mx-auto text-slate-500" />;
const CheckCircleIcon = () => <Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" className="w-5 h-5 text-green-400" />;
const XCircleIcon = () => <Icon path="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" className="w-5 h-5 text-red-400" />;
const ExclamationTriangleIcon = () => <Icon path="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" className="w-5 h-5 text-yellow-400" />;
const LightbulbIcon = () => <Icon path="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.625a6.01 6.01 0 00-1.5-1.125M12 18h.008M12 18h-.008m0 0A6.003 6.003 0 0112 3.75m0 14.25A6.003 6.003 0 0012 3.75m0 14.25v-5.25" className="w-6 h-6 text-blue-400" />;
const SparklesIcon = () => <Icon path="M9.813 15.904L9 18l-1.813-2.096a4.5 4.5 0 00-6.214-6.214L1 8l2.096-1.813a4.5 4.5 0 006.214-6.214L9 0l.813 2.096a4.5 4.5 0 006.214 6.214L18 8l-2.096.813a4.5 4.5 0 00-6.214 6.214zM18 18l-1.813-2.096a4.5 4.5 0 00-6.214-6.214L9 8l2.096-1.813a4.5 4.5 0 006.214-6.214L18 0l.813 2.096a4.5 4.5 0 006.214 6.214L27 8l-2.096.813a4.5 4.5 0 00-6.214 6.214L18 18z" className="w-5 h-5 mr-2" />;
const ArrowLeftIcon = () => <Icon path="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" className="w-4 h-4 mr-2" />;


// --- Modal Component ---
const DetailModal = ({ result, fileContent, onClose }) => {
    // This component remains the same as before
    if (!result) return null;
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [generationError, setGenerationError] = useState('');

    const getStatusChipClass = (status) => {
        switch (status) {
          case 'covered': return 'bg-green-500/10 text-green-400 border-green-500/20';
          case 'partial': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
          case 'gap': return 'bg-red-500/10 text-red-400 border-red-500/20';
          default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const handleGenerateText = async () => {
        // This function would also need to be updated to call a backend endpoint
        // For now, we'll leave it as is, but it would follow the same pattern as handleAnalyze
        alert("Text generation from the modal would also be a backend function in a production app.");
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 animate-scale-in">
                <div className="p-6 border-b border-slate-700 flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-white">{result.id}: {result.control}</h3>
                        <span className={`mt-2 inline-block capitalize text-xs font-medium px-2 py-1 rounded-full border ${getStatusChipClass(result.status)}`}>
                            {result.status}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <Icon path="M6 18L18 6M6 6l12 12" />
                    </button>
                </div>
                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2 flex items-center"><XCircleIcon /><span className="ml-2">Gap Analysis</span></h4>
                        <p className="text-slate-400 text-sm leading-6">{result.details}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-300 mb-2 flex items-center"><LightbulbIcon /><span className="ml-2">Recommendation</span></h4>
                        <p className="text-slate-400 text-sm leading-6">{result.recommendation}</p>
                    </div>
                    {(result.status === 'gap' || result.status === 'partial') && (
                        <div>
                            <button 
                                onClick={handleGenerateText}
                                disabled={isGenerating}
                                className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-blue-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:bg-slate-500 disabled:from-slate-500 disabled:shadow-none transition-all duration-300"
                            >
                                <SparklesIcon />
                                {isGenerating ? 'Generating...' : 'Generate Control Text'}
                            </button>
                        </div>
                    )}
                </div>
                 <div className="px-6 py-4 bg-slate-800/50 rounded-b-2xl text-right">
                    <button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function Analyzer({ onNavigateHome }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState('NIST_CSF');
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadedFile(file);
    setAnalysisResults(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResults(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('framework', selectedFramework);
    formData.append('frameworkOptions', JSON.stringify(frameworkOptions));
    formData.append('frameworkSourceData', JSON.stringify(frameworkSourceData));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
        
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
          let rawJson = result.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsedJson = JSON.parse(rawJson);
          let covered = 0, partial = 0, gaps = 0;
          parsedJson.forEach(cat => { cat.results.forEach(res => {
                  if (res.status === 'covered') covered++;
                  else if (res.status === 'partial') partial++;
                  else if (res.status === 'gap') gaps++;
              });
          });
          const total = covered + partial + gaps;
          const score = total > 0 ? Math.round(((covered + partial * 0.5) / total) * 100) : 0;
          setAnalysisResults({ summary: { total, covered, partial, gaps, score }, categories: parsedJson });
      } else {
          throw new Error("Invalid response structure from API.");
      }
    } catch (e) {
      console.error(e);
      setError(`An error occurred during analysis: ${e.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const frameworkOptions = [
    { id: 'NIST_CSF', name: 'NIST Cybersecurity Framework (CSF) v2.0', enabled: true },
    { id: 'NIST_800_53', name: 'NIST SP 800-53 Rev. 5', enabled: true },
    { id: 'FFIEC_CAT', name: 'FFIEC Cybersecurity Assessment Tool', enabled: false },
    { id: 'PCI_DSS', name: 'PCI DSS v4.0', enabled: false },
    { id: 'ISO_27001', name: 'ISO/IEC 27001:2022', enabled: false },
    { id: 'NYDFS_500', name: 'NYDFS Part 500', enabled: false },
  ];
  
  const frameworkSourceData = {
    NIST_CSF: {
        categories: [
            { name: 'Govern (GV)', description: 'Establish and monitor the organization’s cybersecurity risk management strategy, expectations, and policy.', results: [ { id: 'GV.RM-01', control: 'An organizational risk management strategy is established.'}, { id: 'GV.SC-04', control: 'Cybersecurity is integrated into the organization’s enterprise risk management portfolio.'}, ]},
            { name: 'Identify (ID)', description: 'Understand the current assets, risks, and responsibilities.', results: [ { id: 'ID.AM-1', control: 'Physical devices and systems within the organization are inventoried.'}, { id: 'ID.RA-1', control: 'Asset vulnerabilities are identified and documented.'}, { id: 'ID.RA-5', control: 'Threats, both internal and external, are identified and documented.'}, ]},
            { name: 'Protect (PR)', description: 'Implement safeguards to ensure delivery of critical services.', results: [ { id: 'PR.AC-4', control: 'Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.'}, { id: 'PR.AC-5', control: 'Identity and access are verified for all users, devices, and other assets.'}, { id: 'PR.DS-2', control: 'Data-in-transit is protected.'}, ]},
            { name: 'Detect (DE)', description: 'Discover and analyze cybersecurity events.', results: [ { id: 'DE.CM-1', control: 'Networks and systems are monitored to detect potential cybersecurity events.'}, { id: 'DE.AE-2', control: 'The impact of events is analyzed.'}, ]},
            { name: 'Respond (RS)', description: 'Take action regarding a detected cybersecurity incident.', results: [ { id: 'RS.RP-1', control: 'A response plan is executed.'}, { id: 'RS.CO-2', control: 'Incidents are reported to appropriate internal and external stakeholders.'}, ]},
            { name: 'Recover (RC)', description: 'Restore assets and operations affected by a cybersecurity incident.', results: [ { id: 'RC.RP-1', control: 'A recovery plan is executed.'}, { id: 'RC.IM-2', control: 'Recovery plans incorporate lessons learned.'}, ]},
        ]
    },
    NIST_800_53: {
        categories: [
            { name: 'Access Control (AC)', description: 'Limit system access to authorized users, processes acting on behalf of users, or devices.', results: [ { id: 'AC-1', control: 'Access Control Policy and Procedures'}, { id: 'AC-2', control: 'Account Management'}, { id: 'AC-3', control: 'Access Enforcement'}, { id: 'AC-4', control: 'Information Flow Enforcement'} ]},
            { name: 'Awareness and Training (AT)', description: 'Ensure that managers and users of organizational systems are made aware of the security risks.', results: [ { id: 'AT-1', control: 'Awareness and Training Policy and Procedures'}, { id: 'AT-2', control: 'Security Awareness Training'} ]},
            { name: 'Configuration Management (CM)', description: 'Establish and maintain baseline configurations and inventories of organizational systems.', results: [ { id: 'CM-1', control: 'Configuration Management Policy and Procedures'}, { id: 'CM-2', control: 'Baseline Configuration'}, { id: 'CM-8', control: 'System Component Inventory'} ]},
            { name: 'Contingency Planning (CP)', description: 'Establish, maintain, and effectively implement a contingency plan for the system.', results: [ { id: 'CP-1', control: 'Contingency Planning Policy and Procedures'}, { id: 'CP-2', control: 'Contingency Plan'} ]},
            { name: 'Identification and Authentication (IA)', description: 'Identify and authenticate organizational users (or processes acting on behalf of users).', results: [ { id: 'IA-1', control: 'Identification and Authentication Policy and Procedures'}, { id: 'IA-2', control: 'Identification and Authentication (Organizational Users)'} ]},
            { name: 'Incident Response (IR)', description: 'Establish an operational incident handling capability for organizational systems.', results: [ { id: 'IR-1', control: 'Incident Response Policy and Procedures'}, { id: 'IR-8', control: 'Incident Response Plan'} ]},
            { name: 'Risk Assessment (RA)', description: 'Periodically assess the risk to organizational operations, assets, and individuals.', results: [ { id: 'RA-1', control: 'Risk Assessment Policy and Procedures'}, { id: 'RA-3', control: 'Risk Assessment'} ]},
            { name: 'System and Information Integrity (SI)', description: 'Protect the integrity of information and systems.', results: [ { id: 'SI-1', control: 'System and Information Integrity Policy and Procedures'}, { id: 'SI-2', control: 'Flaw Remediation'}, { id: 'SI-4', control: 'Information System Monitoring'} ]},
        ]
    },
    FFIEC_CAT: { categories: [] },
    PCI_DSS: { categories: [] },
    ISO_27001: { categories: [] },
    NYDFS_500: { categories: [] },
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'covered': return <CheckCircleIcon />;
      case 'partial': return <ExclamationTriangleIcon />;
      case 'gap': return <XCircleIcon />;
      default: return null;
    }
  };
  
  const getStatusChipClass = (status) => {
    switch (status) {
      case 'covered': return 'bg-green-500/10 text-green-400';
      case 'partial': return 'bg-yellow-500/10 text-yellow-400';
      case 'gap': return 'bg-red-500/10 text-red-400';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <>
      <style>{`
        @keyframes scale-in { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .aurora-bg {
          background: linear-gradient(-45deg, #111827, #1e293b, #334155, #475569);
          background-size: 400% 400%;
          animation: aurora 15s ease infinite;
        }
        .gradient-border {
          border: 1px solid transparent;
          background: linear-gradient(to right, #1e293b, #1e293b) padding-box,
                      linear-gradient(to right, #38bdf8, #818cf8) border-box;
        }
      `}</style>
      <DetailModal result={modalData} fileContent={""} onClose={() => setModalData(null)} />
      <div className="aurora-bg min-h-screen font-sans text-slate-300">
        <header className="sticky top-0 z-10 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">AlignIQ</h1>
              <p className="text-slate-400 mt-1">Compliance Analyzer</p>
            </div>
            <button onClick={onNavigateHome} className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white transition-colors">
              <ArrowLeftIcon />
              Back to Home
            </button>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-lg self-start sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">1. Configuration</h2>
              
              <div className="mb-6">
                <label htmlFor="framework" className="block text-sm font-medium text-slate-300 mb-2">Select Framework</label>
                <select 
                  id="framework" 
                  value={selectedFramework}
                  onChange={(e) => { setSelectedFramework(e.target.value); setAnalysisResults(null); }}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {frameworkOptions.map(opt => <option key={opt.id} value={opt.id} disabled={!opt.enabled}>{opt.name}{!opt.enabled ? ' (Demo disabled)' : ''}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-slate-300 mb-2">Upload Standards Document</label>
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-slate-600 px-6 py-10 hover:border-blue-500 transition-colors duration-300">
                  <div className="text-center">
                    <FileUploadIcon />
                    <div className="mt-4 flex text-sm leading-6 text-slate-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 hover:text-blue-300">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" accept=".txt,.pdf,.docx" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">PDF, DOCX, TXT up to 10MB</p>
                  </div>
                </div>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                  <strong>Selected file:</strong> {uploadedFile.name}
                </div>
              )}
               {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-300">
                  <strong>Error:</strong> {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile || isAnalyzing}
                className="mt-6 w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : '2. Analyze for Gaps'}
              </button>
            </div>

            <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">3. Analysis Results</h2>
              {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                      <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="font-semibold text-white">Performing semantic analysis with AI...</p>
                      <p className="text-sm">This may take a moment.</p>
                  </div>
              )}
              {!isAnalyzing && !analysisResults && (
                <div className="flex flex-col items-center justify-center h-96 text-slate-500 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700">
                  <Icon path="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-12 h-12 text-slate-600 mb-4" />
                  <p className="font-semibold text-slate-300">Your analysis results will appear here.</p>
                  <p className="text-sm">Upload a document and click "Analyze".</p>
                </div>
              )}
              {analysisResults && (
                <div className="space-y-6 animate-fade-in">
                  <div className="p-4 bg-slate-900/50 rounded-lg gradient-border">
                      <h3 className="font-semibold text-white">Compliance Summary</h3>
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                          <div className="p-3 bg-slate-800/70 rounded-lg shadow-inner"><p className="text-2xl font-bold text-blue-400">{analysisResults.summary.score}%</p><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Score</p></div>
                          <div className="p-3 bg-slate-800/70 rounded-lg shadow-inner"><p className="text-2xl font-bold text-green-400">{analysisResults.summary.covered}</p><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Covered</p></div>
                          <div className="p-3 bg-slate-800/70 rounded-lg shadow-inner"><p className="text-2xl font-bold text-yellow-400">{analysisResults.summary.partial}</p><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Partial</p></div>
                          <div className="p-3 bg-slate-800/70 rounded-lg shadow-inner"><p className="text-2xl font-bold text-red-400">{analysisResults.summary.gaps}</p><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gaps</p></div>
                      </div>
                  </div>

                  <div className="space-y-4">
                    {analysisResults.categories.map(category => (
                      <div key={category.name} className="bg-slate-800/70 border border-slate-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div className="p-3 border-b border-slate-700"><h4 className="font-semibold text-white">{category.name}</h4><p className="text-sm text-slate-400">{category.description}</p></div>
                        <ul className="divide-y divide-slate-700">
                          {category.results.map(result => (
                            <li key={result.id} onClick={() => setModalData(result)} className="p-3 flex items-center justify-between hover:bg-slate-700/50 cursor-pointer transition-colors">
                              <div className="flex items-start">
                                  {renderStatusIcon(result.status)}
                                  <div className="ml-3">
                                      <p className="text-sm font-medium text-slate-200">{result.id}</p>
                                      <p className="text-sm text-slate-400">{result.control}</p>
                                  </div>
                              </div>
                              <span className={`capitalize text-xs font-medium px-2 py-1 rounded-full ${getStatusChipClass(result.status)}`}>{result.status}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
