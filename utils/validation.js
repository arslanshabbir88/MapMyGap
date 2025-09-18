/**
 * Input Validation Utilities
 * 
 * Features:
 * - Request body validation
 * - File type validation
 * - Size validation
 * - Framework validation
 */

// Supported file types and their MIME types
const SUPPORTED_FILE_TYPES = {
  'application/pdf': { extension: 'pdf', maxSize: 10 * 1024 * 1024 }, // 10MB
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { extension: 'docx', maxSize: 10 * 1024 * 1024 }, // 10MB
  'application/msword': { extension: 'doc', maxSize: 10 * 1024 * 1024 }, // 10MB
};

// Supported frameworks
const SUPPORTED_FRAMEWORKS = [
  'NIST_CSF',
  'NIST_800_53', 
  'NIST_800_63B',
  'SOC_1',
  'SOC_2',
  'PCI_DSS',
  'ISO_27001',
  'HIPAA',
  'SOX',
  'NYDFS_500'
];

/**
 * Validate request body for analyze API
 * @param {Object} body - Request body
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateAnalyzeRequest(body) {
  const errors = [];
  
  // Check required fields
  if (!body.fileContent) {
    errors.push('fileContent is required');
  } else if (typeof body.fileContent !== 'string') {
    errors.push('fileContent must be a string');
  } else if (body.fileContent.length === 0) {
    errors.push('fileContent cannot be empty');
  } else if (body.fileContent.length > 1000000) { // 1MB text limit
    errors.push('fileContent exceeds maximum size (1MB)');
  }
  
  if (!body.framework) {
    errors.push('framework is required');
  } else if (!SUPPORTED_FRAMEWORKS.includes(body.framework)) {
    errors.push(`framework must be one of: ${SUPPORTED_FRAMEWORKS.join(', ')}`);
  }
  
  // Validate selectedCategories if provided
  if (body.selectedCategories !== undefined) {
    if (!Array.isArray(body.selectedCategories)) {
      errors.push('selectedCategories must be an array');
    } else if (body.selectedCategories.length > 50) {
      errors.push('selectedCategories cannot exceed 50 items');
    }
  }
  
  // Validate userId if provided
  if (body.userId !== undefined && body.userId !== null) {
    if (typeof body.userId !== 'string') {
      errors.push('userId must be a string');
    } else if (body.userId.length > 100) {
      errors.push('userId exceeds maximum length');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate file upload
 * @param {Object} file - File object
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateFileUpload(file) {
  const errors = [];
  
  if (!file) {
    errors.push('File is required');
    return { valid: false, errors };
  }
  
  // Check file type
  if (!SUPPORTED_FILE_TYPES[file.mimetype]) {
    errors.push(`Unsupported file type: ${file.mimetype}. Supported types: ${Object.keys(SUPPORTED_FILE_TYPES).join(', ')}`);
  }
  
  // Check file size
  if (file.size > SUPPORTED_FILE_TYPES[file.mimetype]?.maxSize) {
    const maxSizeMB = SUPPORTED_FILE_TYPES[file.mimetype]?.maxSize / (1024 * 1024);
    errors.push(`File size exceeds maximum allowed size of ${maxSizeMB}MB`);
  }
  
  // Check file name
  if (!file.originalname || file.originalname.length === 0) {
    errors.push('File name is required');
  } else if (file.originalname.length > 255) {
    errors.push('File name exceeds maximum length');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Sanitize string input
 * @param {string} input - Input string
 * @param {number} maxLength - Maximum length
 * @returns {string} - Sanitized string
 */
export function sanitizeString(input, maxLength = 1000) {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
}

/**
 * Validate framework selection
 * @param {string} framework - Framework name
 * @param {string[]} selectedCategories - Selected categories
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateFrameworkSelection(framework, selectedCategories = []) {
  const errors = [];
  
  if (!SUPPORTED_FRAMEWORKS.includes(framework)) {
    errors.push(`Unsupported framework: ${framework}`);
    return { valid: false, errors };
  }
  
  // Framework-specific validation could be added here
  // For now, just basic validation
  
  if (selectedCategories.length > 50) {
    errors.push('Too many selected categories (maximum 50)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
