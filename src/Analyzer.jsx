import React, { useState } from 'react';
import { useAuth } from './AuthContext';

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
const ClipboardIcon = () => <Icon path="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" className="w-4 h-4" />;
const DownloadIcon = () => <Icon path="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" className="w-4 h-4" />;
const UserIcon = () => <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className="w-5 h-5" />;
const HistoryIcon = () => <Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" className="w-5 h-5" />;

// Helper functions for status rendering
const renderStatusIcon = (status) => {
  switch (status) {
    case 'covered': return <CheckCircleIcon />;
    case 'partial': return <ExclamationTriangleIcon />;
    case 'gap': return <XCircleIcon />;
    default: return <Icon path="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" className="w-5 h-5 text-slate-400" />;
  }
};

const getStatusChipClass = (status) => {
  switch (status) {
    case 'covered': return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'partial': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'gap': return 'bg-red-500/10 text-red-400 border-red-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

// Utility functions for copy/download
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
};

const downloadReport = (data, filename, type = 'json') => {
  let content, mimeType;
  if (type === 'csv') {
    content = convertToCSV(data);
    mimeType = 'text/csv';
  } else {
    content = JSON.stringify(data, null, 2);
    mimeType = 'application/json';
  }
  
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const convertToCSV = (data) => {
  const headers = ['Category', 'Control ID', 'Control', 'Status', 'Details', 'Recommendation'];
  const rows = [];
  
  data.categories.forEach(category => {
    category.results.forEach(result => {
      rows.push([
        category.name,
        result.id,
        result.control,
        result.status,
        result.details || '',
        result.recommendation || ''
      ]);
    });
  });
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(','))
    .join('\n');
  
  return csvContent;
};

// --- Modal Component ---
const DetailModal = ({ result, fileContent, onClose }) => {
    if (!result) return null;
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [generationError, setGenerationError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const getStatusChipClass = (status) => {
        switch (status) {
          case 'covered': return 'bg-green-500/10 text-green-400 border-green-500/20';
          case 'partial': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
          case 'gap': return 'bg-red-500/10 text-red-400 border-red-500/20';
          default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    const handleGenerateText = async () => {
        if (!result) return;
        try {
            setGenerationError('');
            setGeneratedText('');
            setIsGenerating(true);
            const resp = await fetch('/api/generate-control-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileContent,
                    controlId: result.id,
                    controlText: result.control,
                    status: result.status,
                    details: result.details || ''
                })
            });
            if (!resp.ok) {
                const text = await resp.text();
                throw new Error(text || 'Failed to generate text');
            }
            const data = await resp.json();
            setGeneratedText(data.sampleText || '');
        } catch (err) {
            setGenerationError(err.message || 'Generation failed');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopyText = async () => {
        if (generatedText) {
            const success = await copyToClipboard(generatedText);
            if (success) {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            }
        }
    };

    const handleCopyControl = async () => {
        const controlText = `${result.id}: ${result.control}\n\nStatus: ${result.status}\nDetails: ${result.details || 'N/A'}\nRecommendation: ${result.recommendation || 'N/A'}`;
        const success = await copyToClipboard(controlText);
        if (success) {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
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
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={handleCopyControl}
                            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                            title="Copy control details"
                        >
                            <ClipboardIcon />
                        </button>
                        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                            <Icon path="M6 18L18 6M6 6l12 12" />
                        </button>
                    </div>
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
                            {generationError && (
                              <p className="mt-3 text-sm text-red-400">{generationError}</p>
                            )}
                            {generatedText && (
                              <div className="mt-4 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="text-slate-200 font-semibold">Suggested Control Text</h5>
                                  <button 
                                    onClick={handleCopyText}
                                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                                  >
                                    <ClipboardIcon />
                                    {copySuccess ? 'Copied!' : 'Copy'}
                                  </button>
                                </div>
                                <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-6">{generatedText}</pre>
                              </div>
                            )}
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

function Analyzer({ onNavigateHome }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState('NIST_CSF');
  const [selectedControlFamilies, setSelectedControlFamilies] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const { user, supabase } = useAuth();

  const getFileExt = (name) => (name?.split('.').pop() || '').toLowerCase();
  const isTextFile = (file) => file?.type === 'text/plain' || getFileExt(file?.name) === 'txt';
  const isSupportedFile = (file) => ['txt','docx','pdf','xlsx','xls'].includes(getFileExt(file?.name));

  const loadAnalysisHistory = async () => {
    if (!user) return;
    
    try {
      setIsLoadingHistory(true);
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setAnalysisHistory(data || []);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const saveAnalysisToHistory = async (results, filename) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('analysis_history')
        .insert({
          user_id: user.id,
          framework: selectedFramework,
          filename: filename,
          results: results,
          summary: results.summary
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error saving analysis:', err);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!isSupportedFile(file)) {
        setError('Unsupported file type. Please upload a .txt, .docx, .pdf, .xlsx, or .xls file. (.doc is not supported)');
        setUploadedFile(null);
        setFileContent('');
        return;
    }

    setUploadedFile(file);
    setAnalysisResults(null);
    setError(null);

    if (isTextFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => setFileContent(e.target.result);
      reader.readAsText(file);
    } else {
      // We'll extract text on the server for non-txt files
      setFileContent('');
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResults(null);

    try {
      let result;
      if (isTextFile(uploadedFile) && fileContent) {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileContent, framework: selectedFramework }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        result = await response.json();
      } else {
        const form = new FormData();
        form.append('file', uploadedFile);
        form.append('framework', selectedFramework);
        
        // Add selected control families for NIST 800-53
        if (selectedFramework === 'NIST_800_53' && selectedControlFamilies.length > 0) {
          form.append('selectedFamilies', JSON.stringify(selectedControlFamilies));
        }
        const response = await fetch('/api/upload-analyze', { method: 'POST', body: form });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        result = await response.json();
        if (result.extractedText) {
          setFileContent(result.extractedText);
        }
      }

      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
          let rawJson = result.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
          console.log('Raw AI response:', rawJson);
          console.log('Selected framework:', selectedFramework);
          
          let parsedJson = JSON.parse(rawJson);
          console.log('Parsed JSON structure:', parsedJson);
          console.log('Type of parsedJson:', typeof parsedJson);
          console.log('Is Array?', Array.isArray(parsedJson));
          console.log('First category name:', parsedJson.categories?.[0]?.name);
          console.log('First control ID:', parsedJson.categories?.[0]?.results?.[0]?.id);
          
          // Validate the structure and ensure it's an array
          if (!Array.isArray(parsedJson)) {
            // Try to handle different response structures
            if (parsedJson.categories && Array.isArray(parsedJson.categories)) {
              console.log('Found categories in response object, using that instead');
              parsedJson = parsedJson.categories;
            } else {
              throw new Error("AI response is not in the expected array format. Please try again.");
            }
          }
          
          let covered = 0, partial = 0, gaps = 0;
          
          // Safely iterate through categories
          parsedJson.forEach(cat => {
            if (cat && cat.results && Array.isArray(cat.results)) {
              cat.results.forEach(res => {
                if (res && res.status) {
                  if (res.status === 'covered') covered++;
                  else if (res.status === 'partial') partial++;
                  else if (res.status === 'gap') gaps++;
                }
              });
            }
          });
          
          const total = covered + partial + gaps;
          const score = total > 0 ? Math.round(((covered + partial * 0.5) / total) * 100) : 0;
          const results = { summary: { total, covered, partial, gaps, score }, categories: parsedJson };
          setAnalysisResults(results);
          
          // Save to history for authenticated users
          if (user) {
            await saveAnalysisToHistory(results, uploadedFile.name);
          }
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
    { id: 'PCI_DSS', name: 'PCI DSS v4.0', enabled: true },
    { id: 'ISO_27001', name: 'ISO/IEC 27001:2022', enabled: true },
    { id: 'SOC_2', name: 'SOC 2 Type II', enabled: true },
    { id: 'FFIEC_CAT', name: 'FFIEC Cybersecurity Assessment Tool', enabled: false },
    { id: 'NYDFS_500', name: 'NYDFS Part 500', enabled: false },
  ];
  
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
      <DetailModal result={modalData} fileContent={fileContent} onClose={() => setModalData(null)} />
      <div className="aurora-bg min-h-screen font-sans text-slate-300">
        <header className="sticky top-0 z-10 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">AlignIQ</h1>
              <p className="text-slate-400 mt-1">Compliance Analyzer</p>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <UserIcon />
                    <span className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowHistory(!showHistory);
                      if (!showHistory) loadAnalysisHistory();
                    }}
                    className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50"
                  >
                    <HistoryIcon />
                    <span className="text-sm">History</span>
                  </button>
                </div>
              )}
              <button onClick={onNavigateHome} className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                <ArrowLeftIcon />
                Back to Home
              </button>
            </div>
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
                  onChange={(e) => { setSelectedFramework(e.target.value); setAnalysisResults(null); setSelectedControlFamilies([]); }}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  {frameworkOptions.map(opt => <option key={opt.id} value={opt.id} disabled={!opt.enabled}>{opt.name}{!opt.enabled ? ' (Demo disabled)' : ''}</option>)}
                </select>
              </div>

              {/* Control Family Selection for NIST 800-53 */}
              {selectedFramework === 'NIST_800_53' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select Control Families (Optional)
                    <span className="text-xs text-slate-500 ml-2">Leave empty for smart auto-selection</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {[
                      { code: 'AC', name: 'Access Control', desc: 'User access & authentication' },
                      { code: 'AU', name: 'Audit & Accountability', desc: 'Logging & monitoring' },
                      { code: 'IA', name: 'Identification & Auth', desc: 'User identity & MFA' },
                      { code: 'SC', name: 'System Protection', desc: 'Network security & encryption' },
                      { code: 'IR', name: 'Incident Response', desc: 'Security incidents & procedures' },
                      { code: 'CM', name: 'Configuration Mgmt', desc: 'System configs & changes' },
                      { code: 'CP', name: 'Contingency Planning', desc: 'Business continuity' },
                      { code: 'AT', name: 'Awareness & Training', desc: 'Security training' },
                      { code: 'CA', name: 'Assessment & Monitoring', desc: 'Security assessments' },
                      { code: 'PE', name: 'Physical Security', desc: 'Facilities & environment' },
                      { code: 'PS', name: 'Personnel Security', desc: 'Employee screening' },
                      { code: 'MP', name: 'Media Protection', desc: 'Data storage & media' },
                      { code: 'SI', name: 'System Integrity', desc: 'Malware protection & updates' },
                      { code: 'MA', name: 'Maintenance', desc: 'System maintenance & patches' },
                      { code: 'RA', name: 'Risk Assessment', desc: 'Risk analysis & threats' },
                      { code: 'SA', name: 'System Acquisition', desc: 'Procurement & vendors' },
                      { code: 'SR', name: 'Supply Chain Risk', desc: 'Third-party risk' }
                    ].map(family => (
                      <label key={family.code} className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedControlFamilies.includes(family.code)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedControlFamilies([...selectedControlFamilies, family.code]);
                            } else {
                              setSelectedControlFamilies(selectedControlFamilies.filter(f => f !== family.code));
                            }
                          }}
                          className="mt-1 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                        />
                        <div className="text-xs">
                          <div className="font-medium text-slate-300">{family.code}</div>
                          <div className="text-slate-500">{family.name}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {selectedControlFamilies.length > 0 && (
                    <div className="mt-2 text-xs text-blue-400">
                      Selected: {selectedControlFamilies.join(', ')} ({selectedControlFamilies.length} families)
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-slate-300 mb-2">Upload Standards Document</label>
                <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-slate-600 px-6 py-10 hover:border-blue-500 transition-colors duration-300">
                  <div className="text-center">
                    <FileUploadIcon />
                    <div className="mt-4 flex text-sm leading-6 text-slate-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 hover:text-blue-300">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" accept=".txt,.docx,.pdf,.xlsx,.xls" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500">Supported: TXT, DOCX, PDF, XLSX, XLS</p>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">3. Analysis Results</h2>
                {analysisResults && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadReport(analysisResults, `compliance-analysis-${selectedFramework}.json`, 'json')}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                    >
                      <DownloadIcon />
                      JSON
                    </button>
                    <button
                      onClick={() => downloadReport(analysisResults, `compliance-analysis-${selectedFramework}.csv`, 'csv')}
                      className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                    >
                      <DownloadIcon />
                      CSV
                    </button>
                  </div>
                )}
              </div>

              {/* Analysis History Panel */}
              {showHistory && user && (
                <div className="mb-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Analysis History</h3>
                  {isLoadingHistory ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-slate-400">Loading history...</p>
                    </div>
                  ) : analysisHistory.length > 0 ? (
                    <div className="space-y-3">
                      {analysisHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                          <div>
                            <p className="text-white font-medium">{item.filename}</p>
                            <p className="text-sm text-slate-400">{item.framework} • {new Date(item.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-slate-300">Score: {item.summary.score}%</span>
                            <button
                              onClick={() => setAnalysisResults({ summary: item.summary, categories: item.results })}
                              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-center py-4">No analysis history yet. Run your first analysis to see it here.</p>
                  )}
                </div>
              )}

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
                      <div className="mt-2 text-sm text-slate-400">
                        Framework: {selectedFramework} • {frameworkOptions.find(f => f.id === selectedFramework)?.name}
                      </div>
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

export default Analyzer;
