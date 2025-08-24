// Configuration file for the Unlicode website
module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Security settings
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Cache settings
  staticCacheMaxAge: 31536000, // 1 year for static assets
  htmlCacheMaxAge: 3600, // 1 hour for HTML files
  
  // Compression settings
  compressionThreshold: 1024, // Only compress responses larger than 1KB
  
  // Content Security Policy
  cspDirectives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
  }
};
