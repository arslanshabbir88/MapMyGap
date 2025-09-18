import crypto from 'crypto';

/**
 * Centralized Logging Utility for MapMyGap APIs
 * 
 * Features:
 * - Request correlation with unique requestId
 * - Structured logging with consistent fields
 * - Privacy-safe data redaction
 * - Security event logging
 * - Performance timing
 */

// Generate unique request ID
export function generateRequestId() {
  return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
}

// Extract client information from request
export function extractClientInfo(req) {
  const userAgent = req.headers['user-agent'] || 'unknown';
  const ip = req.headers['x-forwarded-for'] || 
            req.headers['x-real-ip'] || 
            req.connection?.remoteAddress || 
            'unknown';
  
  return {
    ip: ip.split(',')[0].trim(), // Get first IP if multiple
    userAgent: userAgent.substring(0, 200), // Truncate long user agents
    timestamp: new Date().toISOString()
  };
}

// Redact sensitive data from logs
function redactSensitiveData(data) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  
  const sensitiveKeys = [
    'password', 'token', 'key', 'secret', 'auth', 'credential',
    'fileContent', 'document', 'content', 'text', 'body'
  ];
  
  const redacted = { ...data };
  
  for (const key in redacted) {
    const lowerKey = key.toLowerCase();
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      redacted[key] = '[REDACTED]';
    } else if (typeof redacted[key] === 'object') {
      redacted[key] = redactSensitiveData(redacted[key]);
    }
  }
  
  return redacted;
}

// Base logging function
function log(level, message, data = {}, requestId = null) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message,
    requestId,
    ...redactSensitiveData(data)
  };
  
  console.log(JSON.stringify(logEntry));
}

// Public logging functions
export function logInfo(message, data = {}, requestId = null) {
  log('info', message, data, requestId);
}

export function logError(message, error = null, data = {}, requestId = null) {
  const errorData = {
    ...data,
    error: error ? {
      message: error.message,
      stack: error.stack?.substring(0, 500) // Truncate stack traces
    } : null
  };
  log('error', message, errorData, requestId);
}

export function logWarn(message, data = {}, requestId = null) {
  log('warn', message, data, requestId);
}

export function logDebug(message, data = {}, requestId = null) {
  log('debug', message, data, requestId);
}

// Security event logging
export function logSecurityEvent(event, data = {}, requestId = null) {
  const securityData = {
    event,
    ...data,
    severity: data.severity || 'medium'
  };
  log('security', `Security Event: ${event}`, securityData, requestId);
}

// Performance timing
export function logPerformance(operation, duration, data = {}, requestId = null) {
  log('perf', `Performance: ${operation}`, {
    ...data,
    duration: `${duration}ms`
  }, requestId);
}

// API request logging
export function logApiRequest(req, requestId, additionalData = {}) {
  const clientInfo = extractClientInfo(req);
  logInfo('API Request Started', {
    method: req.method,
    url: req.url,
    ...clientInfo,
    ...additionalData
  }, requestId);
}

// API response logging
export function logApiResponse(req, res, requestId, additionalData = {}) {
  const clientInfo = extractClientInfo(req);
  logInfo('API Request Completed', {
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    ...clientInfo,
    ...additionalData
  }, requestId);
}

// Error response logging
export function logApiError(req, error, requestId, additionalData = {}) {
  const clientInfo = extractClientInfo(req);
  logError('API Request Failed', error, {
    method: req.method,
    url: req.url,
    ...clientInfo,
    ...additionalData
  }, requestId);
}
