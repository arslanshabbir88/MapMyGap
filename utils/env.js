/**
 * Environment Variable Validation
 * 
 * Features:
 * - Check required environment variables at startup
 * - Validate environment variable formats
 * - Fail fast with clear error messages
 */

// Required environment variables
const REQUIRED_ENV_VARS = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GCP_PROJECT_ID',
  'GCP_SERVICE_KEY',
  'GCP_LOCATION'
];

// Optional environment variables with defaults
const OPTIONAL_ENV_VARS = {
  'NODE_ENV': 'development',
  'GCP_LOCATION': 'us-central1'
};

/**
 * Validate all required environment variables
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateEnvironment() {
  const errors = [];
  const missing = [];
  
  // Check required variables
  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    errors.push(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Validate specific formats
  if (process.env.SUPABASE_URL && !process.env.SUPABASE_URL.startsWith('https://')) {
    errors.push('SUPABASE_URL must start with https://');
  }
  
  if (process.env.GCP_PROJECT_ID && !/^[a-z0-9-]+$/.test(process.env.GCP_PROJECT_ID)) {
    errors.push('GCP_PROJECT_ID must contain only lowercase letters, numbers, and hyphens');
  }
  
  if (process.env.GCP_LOCATION && !/^[a-z0-9-]+$/.test(process.env.GCP_LOCATION)) {
    errors.push('GCP_LOCATION must contain only lowercase letters, numbers, and hyphens');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    missing
  };
}

/**
 * Get environment variable with fallback
 * @param {string} name - Environment variable name
 * @param {string} defaultValue - Default value
 * @returns {string} - Environment variable value or default
 */
export function getEnvVar(name, defaultValue = null) {
  return process.env[name] || defaultValue;
}

/**
 * Check if running in production
 * @returns {boolean} - True if production environment
 */
export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in development
 * @returns {boolean} - True if development environment
 */
export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Initialize environment validation
 * Call this at the start of your application
 */
export function initializeEnvironment() {
  const validation = validateEnvironment();
  
  if (!validation.valid) {
    console.error('❌ Environment validation failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    
    if (validation.missing.length > 0) {
      console.error('\nMissing environment variables:');
      validation.missing.forEach(varName => console.error(`  - ${varName}`));
    }
    
    throw new Error('Environment validation failed');
  }
  
  console.log('✅ Environment validation passed');
  return true;
}
