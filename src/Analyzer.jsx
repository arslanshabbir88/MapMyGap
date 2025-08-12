import React, { useState, useMemo } from 'react';
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
const TrashIcon = () => <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="w-4 h-4" />;

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
const DetailModal = ({ result, fileContent, selectedFramework, onClose }) => {
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
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
            
            const resp = await fetch('/api/generate-control-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalDocument: fileContent,
                    targetControl: result.control,
                    framework: selectedFramework
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            if (!resp.ok) {
                const text = await resp.text();
                try {
                    // Try to parse as JSON for better error handling
                    const errorData = JSON.parse(text);
                    if (errorData.error === 'API rate limit exceeded') {
                        setGenerationError(`Rate limit exceeded: ${errorData.details} ${errorData.suggestion}`);
                    } else if (errorData.error === 'AI generation timed out') {
                        setGenerationError(`AI generation timed out: ${errorData.details} ${errorData.suggestion}`);
                    } else if (errorData.error === 'Authentication failed') {
                        setGenerationError(`Authentication failed: ${errorData.details} ${errorData.suggestion}`);
                    } else if (errorData.error === 'Google AI service error') {
                        setGenerationError(`Google AI service error: ${errorData.details} ${errorData.suggestion}`);
                    } else if (errorData.error === 'Configuration error') {
                        setGenerationError(`Configuration error: ${errorData.details} ${errorData.suggestion}`);
                    } else if (errorData.error === 'Service temporarily unavailable') {
                        setGenerationError(`Service unavailable: ${errorData.details} ${errorData.suggestion}`);
                    } else {
                        setGenerationError(`${errorData.error}: ${errorData.details || ''} ${errorData.suggestion || ''}`.trim());
                    }
                } catch {
                    // If not JSON, use the raw text
                    setGenerationError(text || 'Failed to generate text');
                }
                return;
            }
            const data = await resp.json();
            setGeneratedText(data.generatedText || '');
        } catch (err) {
            if (err.name === 'AbortError') {
                setGenerationError('Request timed out. Please try again or review manually.');
            } else {
                setGenerationError(err.message || 'Generation failed');
            }
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
  const [selectedCategories, setSelectedCategories] = useState(['AC', 'AU', 'IA', 'IR', 'SC']); // Default to core NIST families
  const [modalData, setModalData] = useState(null);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { user, supabase } = useAuth();

  const getFileExt = (name) => (name?.split('.').pop() || '').toLowerCase();
  const isTextFile = (file) => file?.type === 'text/plain' || getFileExt(file?.name) === 'txt';
  const isSupportedFile = (file) => ['txt','docx','pdf','xlsx','xls'].includes(getFileExt(file?.name));

  // Filtering logic for analysis results
  const filteredResults = useMemo(() => {
    if (!analysisResults?.categories) return [];
    
    return analysisResults.categories
      .filter(category => 
        !categoryFilter || category.name === categoryFilter
      )
      .map(category => ({
        ...category,
        results: category.results.filter(result => {
          const matchesSearch = !searchTerm || 
            result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (result.details && result.details.toLowerCase().includes(searchTerm.toLowerCase()));
          
          const matchesStatus = !statusFilter || result.status === statusFilter;
          
          return matchesSearch && matchesStatus;
        })
      }))
      .filter(category => category.results.length > 0);
  }, [analysisResults, searchTerm, statusFilter, categoryFilter]);

  const totalControls = useMemo(() => {
    if (!analysisResults?.categories) return 0;
    return analysisResults.categories.reduce((total, cat) => total + cat.results.length, 0);
  }, [analysisResults]);

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
      
      // Process the data to ensure proper structure
      const processedData = (data || []).map(item => {
        // Ensure we have the required structure
        let processedItem = { ...item };
        
        // Handle different data structures
        if (item.results && typeof item.results === 'string') {
          try {
            processedItem.results = JSON.parse(item.results);
          } catch (e) {
            console.error('Failed to parse results:', e);
            processedItem.results = [];
          }
        }
        
        if (item.summary && typeof item.summary === 'string') {
          try {
            processedItem.summary = JSON.parse(item.summary);
          } catch (e) {
            console.error('Failed to parse summary:', e);
            processedItem.summary = { score: 0, covered: 0, partial: 0, gaps: 0 };
          }
        }
        
        // Ensure summary has required fields
        if (!processedItem.summary) {
          processedItem.summary = { score: 0, covered: 0, partial: 0, gaps: 0 };
        }
        
        // Calculate score if missing
        if (processedItem.summary.score === undefined || processedItem.summary.score === null) {
          if (processedItem.results && Array.isArray(processedItem.results)) {
            let covered = 0, partial = 0, gaps = 0;
            processedItem.results.forEach(category => {
              if (category.results && Array.isArray(category.results)) {
                category.results.forEach(result => {
                  if (result.status === 'covered') covered++;
                  else if (result.status === 'partial') partial++;
                  else if (result.status === 'gap') gaps++;
                });
              }
            });
            const total = covered + partial + gaps;
            processedItem.summary = {
              score: total > 0 ? Math.round(((covered + partial * 0.5) / total) * 100) : 0,
              covered,
              partial,
              gaps
            };
          }
        }
        
        return processedItem;
      });
      
      setAnalysisHistory(processedData);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const saveAnalysisToHistory = async (results, filename) => {
    if (!user) return;
    
    try {
      // Ensure we have a proper filename
      const displayName = filename || uploadedFile?.name || 'Untitled Document';
      
      // Ensure results and summary are properly structured
      const dataToSave = {
        user_id: user.id,
        framework: selectedFramework,
        filename: displayName,
        results: results.categories || results,
        summary: results.summary || {
          score: 0,
          covered: 0,
          partial: 0,
          gaps: 0
        }
      };
      
      const { error } = await supabase
        .from('analysis_history')
        .insert(dataToSave);

      if (error) throw error;
      
      // Reload history to show the new entry
      await loadAnalysisHistory();
    } catch (err) {
      console.error('Error saving analysis:', err);
    }
  };

  const deleteAnalysisFromHistory = async (analysisId) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('analysis_history')
        .delete()
        .eq('id', analysisId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Remove from local state
      setAnalysisHistory(prev => prev.filter(item => item.id !== analysisId));
    } catch (err) {
      console.error('Error deleting analysis:', err);
      alert('Failed to delete analysis. Please try again.');
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
        if (selectedFramework === 'NIST_800_53' && selectedCategories.length > 0) {
          form.append('categories', JSON.stringify(selectedCategories));
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
          console.log('Raw response length:', rawJson.length);
          console.log('Selected framework:', selectedFramework);
          
          // Log the first 500 characters to see the structure
          console.log('First 500 chars of response:', rawJson.substring(0, 500));
          
          // Check if the response looks like JSON
          if (!rawJson.trim().startsWith('{') && !rawJson.trim().startsWith('[')) {
            console.error('Response does not appear to be JSON:', rawJson);
            throw new Error('AI response is not in valid JSON format. Please try again.');
          }
          
          let parsedJson;
          try {
            parsedJson = JSON.parse(rawJson);
            console.log('Parsed JSON structure:', parsedJson);
            console.log('Type of parsedJson:', typeof parsedJson);
            console.log('Is Array?', Array.isArray(parsedJson));
            console.log('Has categories property?', parsedJson.hasOwnProperty('categories'));
            console.log('Categories type:', typeof parsedJson.categories);
            console.log('Categories is array?', Array.isArray(parsedJson.categories));
            console.log('First category name:', parsedJson.categories?.[0]?.name);
            console.log('First control ID:', parsedJson.categories?.[0]?.results?.[0]?.id);
            
            // Log the full structure for debugging
            console.log('Full parsed response keys:', Object.keys(parsedJson));
            if (parsedJson.categories) {
              console.log('Categories length:', parsedJson.categories.length);
              console.log('First category structure:', parsedJson.categories[0]);
            }
          } catch (parseError) {
            console.error('JSON parsing failed:', parseError);
            console.error('Failed to parse:', rawJson);
            throw new Error(`Failed to parse AI response: ${parseError.message}`);
          }
          
          // Validate the structure and handle different response formats
          if (!Array.isArray(parsedJson)) {
            // Try to handle different response structures
            if (parsedJson.categories && Array.isArray(parsedJson.categories)) {
              console.log('Found categories in response object, using that instead');
              parsedJson = parsedJson.categories;
            } else if (parsedJson.categories && !Array.isArray(parsedJson.categories)) {
              console.log('Found categories object, converting to array format');
              parsedJson = [parsedJson.categories];
            } else {
              console.log('Unexpected response structure:', parsedJson);
              throw new Error("AI response structure is not recognized. Please try again.");
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
        
        /* Enhanced animations and effects */
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.2); }
        }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        /* Smooth transitions */
        .transition-all { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .transition-transform { transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        
        /* Enhanced hover effects */
        .hover-lift:hover { transform: translateY(-2px); }
        .hover-scale:hover { transform: scale(1.02); }
        
        /* Glass morphism effects */
        .glass-effect {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        /* Custom focus rings */
        .focus-ring:focus {
          outline: none;
          ring: 2px;
          ring-color: #3b82f6;
          ring-offset: 2px;
          ring-offset-color: #0f172a;
        }
      `}</style>
                          <DetailModal result={modalData} fileContent={fileContent} selectedFramework={selectedFramework} onClose={() => setModalData(null)} />
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
                </div>
              )}
              <button onClick={onNavigateHome} className="inline-flex items-center text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                <ArrowLeftIcon />
                Back to Home
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Step Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <div className={`flex items-center space-x-1 sm:space-x-2 ${!uploadedFile ? 'text-blue-400' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${!uploadedFile ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  1
                </div>
                <span className="font-medium text-sm sm:text-base">Configure</span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-slate-600"></div>
              <div className={`flex items-center space-x-1 sm:space-x-2 ${uploadedFile && !analysisResults ? 'text-blue-400' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${uploadedFile && !analysisResults ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  2
                </div>
                <span className="font-medium text-sm sm:text-base">Analyze</span>
              </div>
              <div className="w-8 sm:w-16 h-0.5 bg-slate-600"></div>
              <div className={`flex items-center space-x-1 sm:space-x-2 ${analysisResults ? 'text-blue-400' : 'text-slate-400'}`}>
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${analysisResults ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  3
                </div>
                <span className="font-medium text-sm sm:text-base">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Configuration Panel - 40% width */}
            <div className="xl:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-4 sm:p-6 rounded-2xl shadow-lg self-start sticky top-24">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Configuration</h2>
                <p className="text-xs sm:text-sm text-slate-400">Set up your analysis parameters and upload your document</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="framework" className="block text-sm font-medium text-slate-300 mb-3">Select Framework</label>
                <div className="relative">
                  <select 
                    id="framework" 
                    value={selectedFramework}
                    onChange={(e) => { 
                      setSelectedFramework(e.target.value); 
                      setAnalysisResults(null);
                      // Reset categories when framework changes
                      if (e.target.value === 'NIST_800_53') {
                        setSelectedCategories(['AC', 'AU', 'IA', 'IR', 'SC']); // Default to core families
                      } else {
                        setSelectedCategories([]);
                      }
                    }}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:border-slate-500"
                  >
                    {frameworkOptions.map(opt => (
                      <option key={opt.id} value={opt.id} disabled={!opt.enabled}>
                        {opt.name}{!opt.enabled ? ' (Demo disabled)' : ''}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Choose the compliance framework you want to analyze against
                </p>
              </div>

              {/* Control Family Selection for NIST 800-53 */}
              {selectedFramework === 'NIST_800_53' && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-slate-300">
                      Control Families to Analyze
                    </label>
                    <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">
                      {selectedCategories.length} selected
                    </span>
                  </div>
                  
                  <div className="mb-3 p-2 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>Critical</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span>Important</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                        <span>Standard</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Priority indicates the typical importance of controls in this family for most organizations
                    </p>
                  </div>
                  


                  {/* Search and Filter */}
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Search control families..."
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                        // Add search functionality here if needed
                      }}
                    />
                  </div>

                  {/* Control Family Grid */}
                  <div className="max-h-64 overflow-y-auto border border-slate-600 rounded-lg p-3 bg-slate-700/50 custom-scrollbar">
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { code: 'AC', name: 'Access Control', description: 'Control access to information systems and resources', priority: 'high' },
                        { code: 'AU', name: 'Audit & Accountability', description: 'Create, protect, and retain audit records', priority: 'high' },
                        { code: 'IA', name: 'Identification & Authentication', description: 'Identify and authenticate users and devices', priority: 'high' },
                        { code: 'IR', name: 'Incident Response', description: 'Respond to and manage security incidents', priority: 'high' },
                        { code: 'SC', name: 'System & Communications Protection', description: 'Protect system boundaries and communications', priority: 'high' },
                        { code: 'AT', name: 'Awareness & Training', description: 'Ensure personnel are aware of security responsibilities', priority: 'medium' },
                        { code: 'CA', name: 'Assessment & Authorization', description: 'Assess and authorize systems', priority: 'medium' },
                        { code: 'CM', name: 'Configuration Management', description: 'Manage system configurations and changes', priority: 'medium' },
                        { code: 'CP', name: 'Contingency Planning', description: 'Plan for system recovery and continuity', priority: 'medium' },
                        { code: 'PE', name: 'Physical & Environmental Protection', description: 'Protect physical assets and environment', priority: 'medium' },
                        { code: 'PS', name: 'Personnel Security', description: 'Ensure personnel are trustworthy and qualified', priority: 'medium' },
                        { code: 'MP', name: 'Media Protection', description: 'Protect and manage media throughout its lifecycle', priority: 'low' },
                        { code: 'SI', name: 'System & Information Integrity', description: 'Maintain system and information integrity', priority: 'medium' },
                        { code: 'MA', name: 'Maintenance', description: 'Perform system maintenance securely', priority: 'low' },
                        { code: 'RA', name: 'Risk Assessment', description: 'Assess and manage security risks', priority: 'medium' },
                        { code: 'SA', name: 'System & Services Acquisition', description: 'Acquire systems and services securely', priority: 'low' },
                        { code: 'SR', name: 'Supply Chain Risk Management', description: 'Manage supply chain risks', priority: 'low' }
                      ].map(family => (
                        <label key={family.code} className="flex items-start space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-600/50 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(family.code)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, family.code]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== family.code));
                              }
                            }}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-slate-200">{family.code}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                family.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                family.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-slate-500/20 text-slate-300'
                              }`}>
                                {family.priority === 'high' ? 'Critical' :
                                 family.priority === 'medium' ? 'Important' : 'Standard'}
                              </span>
                            </div>
                            <div className="text-slate-400 text-xs mt-1">{family.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selection Summary */}
                  <div className="mt-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Selected families:</span>
                      <span className="text-blue-400 font-medium">
                        {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None'}
                      </span>
                    </div>
                    {selectedCategories.length === 0 && (
                      <div className="mt-2 text-sm text-red-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please select at least one control family to analyze.
                      </div>
                    )}
                    {selectedCategories.length > 8 && (
                      <div className="mt-2 text-sm text-yellow-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Consider selecting fewer families for better performance.
                      </div>
                    )}
                  </div>
                </div>
              )}
              

              <div className="mb-6">
                <label htmlFor="file-upload" className="block text-sm font-medium text-slate-300 mb-3">Upload Standards Document</label>
                <div 
                  className={`mt-2 flex justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${
                    uploadedFile 
                      ? 'border-blue-500 bg-blue-500/5' 
                      : 'border-slate-600 hover:border-blue-500 hover:bg-slate-700/20'
                  } px-6 py-8`}
                >
                  <div className="text-center">
                    {uploadedFile ? (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-blue-300 mb-1">File Selected</p>
                        <p className="text-xs text-slate-400 mb-3">{uploadedFile.name}</p>
                        <button
                          onClick={() => {
                            setUploadedFile(null);
                            setFileContent('');
                            setError(null);
                          }}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mb-3">
                          <FileUploadIcon />
                        </div>
                        <div className="flex text-sm leading-6 text-slate-400 mb-2">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 hover:text-blue-300 transition-colors">
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              accept=".txt,.docx,.pdf,.xlsx,.xls" 
                              className="sr-only" 
                              onChange={handleFileChange}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const files = e.dataTransfer.files;
                                if (files.length > 0) {
                                  handleFileChange({ target: { files } });
                                }
                              }}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-slate-500">
                          Supported: TXT, DOCX, PDF, XLSX, XLS
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Max size: 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                  <strong>Selected file:</strong> {uploadedFile.name}
                </div>
              )}
               {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-red-300 mb-1">Analysis Error</h4>
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile || isAnalyzing || (selectedFramework === 'NIST_800_53' && selectedCategories.length === 0)}
                className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 disabled:from-slate-600 disabled:to-slate-600 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing with AI...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Analyze for Compliance Gaps</span>
                  </>
                )}
              </button>
              
              {selectedFramework === 'NIST_800_53' && selectedCategories.length === 0 && (
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-yellow-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Please select at least one control family to analyze</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Analysis Results Panel - 60% width */}
            <div className="xl:col-span-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-4 sm:p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white">Analysis Results</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Review your compliance assessment and identify gaps</p>
                </div>
                {user && (
                  <button
                    onClick={() => {
                      setShowHistory(!showHistory);
                      if (!showHistory) loadAnalysisHistory();
                    }}
                    className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-700/50 border border-slate-600 hover:border-slate-500 text-sm"
                  >
                    <HistoryIcon />
                    <span className="text-sm">History</span>
                  </button>
                )}
              </div>

              {/* Search and Filter Controls */}
              {analysisResults && (
                <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Search Controls</label>
                      <input
                        type="text"
                        placeholder="Search by control ID, name, or description..."
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="lg:w-48">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Status</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">All Statuses</option>
                        <option value="covered">Covered</option>
                        <option value="partial">Partial</option>
                        <option value="gap">Gaps</option>
                      </select>
                    </div>
                    <div className="lg:w-48">
                      <label className="block text-sm font-medium text-slate-300 mb-2">Filter by Category</label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="">All Categories</option>
                        {analysisResults.categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span>Showing {filteredResults.reduce((total, cat) => total + cat.results.length, 0)} of {totalControls} controls</span>
                      </span>
                      {(searchTerm || statusFilter || categoryFilter) && (
                        <span className="text-blue-400">
                          Filters active
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('');
                        setCategoryFilter('');
                      }}
                      className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 text-sm border border-blue-400/30 rounded-lg hover:bg-blue-400/10"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Analysis History Panel */}
              {showHistory && user && (
                <div className="mb-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Analysis History</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={loadAnalysisHistory}
                        disabled={isLoadingHistory}
                        className="text-slate-400 hover:text-white transition-colors px-3 py-1 rounded border border-slate-600 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Refresh history"
                      >
                        {isLoadingHistory ? '↻' : '↻'}
                      </button>
                      <button
                        onClick={() => setShowHistory(false)}
                        className="text-slate-400 hover:text-white transition-colors px-3 py-1 rounded border border-slate-600 hover:border-slate-500"
                      >
                        ← Back to Analysis
                      </button>
                    </div>
                  </div>
                  {isLoadingHistory ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className="text-slate-400">Loading history...</p>
                    </div>
                  ) : analysisHistory.length > 0 ? (
                    <div className="space-y-3">
                      {analysisHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                          <div className="flex-1">
                            <p className="text-white font-medium">{item.filename || 'Untitled Document'}</p>
                            <p className="text-sm text-slate-400">
                              {item.framework || 'Unknown Framework'} • {new Date(item.created_at).toLocaleDateString()}
                            </p>
                            {item.summary && (
                              <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                                <span>Covered: {item.summary.covered || 0}</span>
                                <span>Partial: {item.summary.partial || 0}</span>
                                <span>Gaps: {item.summary.gaps || 0}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-slate-300">
                              Score: {item.summary?.score !== undefined ? `${item.summary.score}%` : 'N/A'}
                            </span>
                            <button
                              onClick={() => {
                                try {
                                  // Validate the data before setting it
                                  if (!item.results || !item.summary) {
                                    alert('This historical analysis appears to be incomplete. Please run a new analysis.');
                                    return;
                                  }
                                  
                                  // Set the analysis results from history
                                  setAnalysisResults({ 
                                    summary: item.summary, 
                                    categories: item.results 
                                  });
                                  // Set the framework to match the historical analysis
                                  if (item.framework) {
                                    setSelectedFramework(item.framework);
                                  }
                                  // Hide the history panel to show the results
                                  setShowHistory(false);
                                  // Scroll to the results section
                                  setTimeout(() => {
                                    const resultsSection = document.querySelector('[data-results-section]');
                                    if (resultsSection) {
                                      resultsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }, 100);
                                } catch (error) {
                                  console.error('Error loading historical analysis:', error);
                                  alert('Failed to load this historical analysis. Please try again or run a new analysis.');
                                }
                              }}
                              className="text-blue-400 hover:text-blue-300 text-sm transition-colors px-3 py-1 rounded border border-blue-400/30 hover:bg-blue-400/10"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this analysis? This action cannot be undone.')) {
                                  deleteAnalysisFromHistory(item.id);
                                }
                              }}
                              className="text-red-400 hover:text-red-300 text-sm transition-colors px-2 py-1 rounded border border-red-400/30 hover:bg-red-400/10"
                              title="Delete analysis"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-slate-400 mb-2">No analysis history yet.</p>
                      <p className="text-sm text-slate-500">Run your first analysis to see it here.</p>
                      <button
                        onClick={() => setShowHistory(false)}
                        className="mt-3 text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded border border-blue-400/30 hover:bg-blue-400/10"
                      >
                        Start New Analysis
                      </button>
                    </div>
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
                <div className="space-y-6 animate-fade-in" data-results-section>
                  {/* Header with Actions */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Compliance Summary</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Framework: {selectedFramework} • {frameworkOptions.find(f => f.id === selectedFramework)?.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setAnalysisResults(null);
                          setUploadedFile(null);
                          setFileContent('');
                          setError(null);
                        }}
                        className="text-slate-400 hover:text-white transition-colors px-3 py-2 rounded border border-slate-600 hover:border-slate-500 text-sm"
                      >
                        New Analysis
                      </button>
                      {user && (
                        <button
                          onClick={() => setShowHistory(true)}
                          className="text-blue-400 hover:text-blue-300 transition-colors px-3 py-2 rounded border border-blue-400/30 hover:bg-blue-400/10 text-sm"
                        >
                          View History
                        </button>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadReport(analysisResults, `compliance-analysis-${selectedFramework}.json`, 'json')}
                          className="inline-flex items-center px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors border border-slate-600"
                        >
                          <DownloadIcon />
                          JSON
                        </button>
                        <button
                          onClick={() => downloadReport(analysisResults, `compliance-analysis-${selectedFramework}.csv`, 'csv')}
                          className="inline-flex items-center px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors border border-slate-600"
                        >
                          <DownloadIcon />
                          CSV
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl shadow-lg">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-400 mb-1">{analysisResults.summary.score}%</p>
                        <p className="text-xs font-medium text-blue-300 uppercase tracking-wider">Overall Score</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl shadow-lg">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-400 mb-1">{analysisResults.summary.covered}</p>
                        <p className="text-xs font-medium text-green-300 uppercase tracking-wider">Covered</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl shadow-lg">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-yellow-400 mb-1">{analysisResults.summary.partial}</p>
                        <p className="text-xs font-medium text-yellow-300 uppercase tracking-wider">Partial</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl shadow-lg">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-red-400 mb-1">{analysisResults.summary.gaps}</p>
                        <p className="text-xs font-medium text-red-300 uppercase tracking-wider">Gaps</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredResults.length > 0 ? (
                      filteredResults.map(category => (
                        <div key={category.name} className="bg-slate-800/70 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
                          <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700">
                            <h4 className="font-semibold text-white text-lg mb-1">{category.name}</h4>
                            <p className="text-sm text-slate-400">{category.description}</p>
                            <div className="mt-2 flex items-center space-x-4 text-xs text-slate-500">
                              <span className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span>{category.results.filter(r => r.status === 'covered').length} covered</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>{category.results.filter(r => r.status === 'partial').length} partial</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>{category.results.filter(r => r.status === 'gap').length} gaps</span>
                              </span>
                            </div>
                          </div>
                          <ul className="divide-y divide-slate-700">
                            {category.results.map(result => (
                              <li key={result.id} onClick={() => setModalData(result)} className="p-4 flex items-center justify-between hover:bg-slate-700/50 cursor-pointer transition-all duration-200 group">
                                <div className="flex items-start flex-1 min-w-0">
                                    {renderStatusIcon(result.status)}
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{result.id}</p>
                                        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors mt-1 leading-relaxed">{result.control}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 ml-4">
                                  <span className={`capitalize text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${getStatusChipClass(result.status)}`}>
                                    {result.status}
                                  </span>
                                  <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-slate-400">
                        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <p className="font-medium text-lg mb-2">No controls match your current filters</p>
                        <p className="text-sm">Try adjusting your search terms or filters to see more results</p>
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setStatusFilter('');
                            setCategoryFilter('');
                          }}
                          className="mt-4 text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 text-sm border border-blue-400/30 rounded-lg hover:bg-blue-400/10"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    )}
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

