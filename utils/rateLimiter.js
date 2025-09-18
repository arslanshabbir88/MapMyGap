/**
 * Simple In-Memory Rate Limiter
 * 
 * Features:
 * - Per-IP rate limiting
 * - Configurable limits and windows
 * - Memory-based (resets on server restart)
 * - Lightweight for serverless environments
 */

// In-memory store for rate limiting
const rateLimitStore = new Map();

// Default rate limit configuration
const DEFAULT_LIMITS = {
  // Per IP limits
  ip: {
    requests: 100, // requests per window
    window: 15 * 60 * 1000, // 15 minutes in milliseconds
  },
  // Per user limits (if userId provided)
  user: {
    requests: 50, // requests per window
    window: 15 * 60 * 1000, // 15 minutes in milliseconds
  }
};

/**
 * Check if request should be rate limited
 * @param {string} identifier - IP address or user ID
 * @param {string} type - 'ip' or 'user'
 * @param {Object} limits - Custom limits (optional)
 * @returns {Object} - { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(identifier, type = 'ip', limits = null) {
  const config = limits || DEFAULT_LIMITS[type];
  const now = Date.now();
  const key = `${type}:${identifier}`;
  
  // Get existing record or create new one
  let record = rateLimitStore.get(key) || {
    count: 0,
    resetTime: now + config.window
  };
  
  // Reset if window has expired
  if (now >= record.resetTime) {
    record = {
      count: 0,
      resetTime: now + config.window
    };
  }
  
  // Check if limit exceeded
  if (record.count >= config.requests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      limit: config.requests,
      window: config.window
    };
  }
  
  // Increment counter
  record.count++;
  rateLimitStore.set(key, record);
  
  return {
    allowed: true,
    remaining: config.requests - record.count,
    resetTime: record.resetTime,
    limit: config.requests,
    window: config.window
  };
}

/**
 * Get rate limit info without incrementing counter
 * @param {string} identifier - IP address or user ID
 * @param {string} type - 'ip' or 'user'
 * @param {Object} limits - Custom limits (optional)
 * @returns {Object} - Rate limit status
 */
export function getRateLimitInfo(identifier, type = 'ip', limits = null) {
  const config = limits || DEFAULT_LIMITS[type];
  const now = Date.now();
  const key = `${type}:${identifier}`;
  
  const record = rateLimitStore.get(key);
  
  if (!record || now >= record.resetTime) {
    return {
      allowed: true,
      remaining: config.requests,
      resetTime: now + config.window,
      limit: config.requests,
      window: config.window
    };
  }
  
  return {
    allowed: record.count < config.requests,
    remaining: Math.max(0, config.requests - record.count),
    resetTime: record.resetTime,
    limit: config.requests,
    window: config.window
  };
}

/**
 * Clear rate limit for specific identifier
 * @param {string} identifier - IP address or user ID
 * @param {string} type - 'ip' or 'user'
 */
export function clearRateLimit(identifier, type = 'ip') {
  const key = `${type}:${identifier}`;
  rateLimitStore.delete(key);
}

/**
 * Clear all rate limits (useful for testing)
 */
export function clearAllRateLimits() {
  rateLimitStore.clear();
}

/**
 * Get all current rate limit records (for debugging)
 * @returns {Map} - All rate limit records
 */
export function getAllRateLimits() {
  return new Map(rateLimitStore);
}
