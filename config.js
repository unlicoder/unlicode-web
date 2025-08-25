// Configuration file for the Unlicode website

// Environment variable validation
function validateEnvironment() {
  const requiredVars = [];
  
  // Production environment requires CORS_ORIGIN
  if (process.env.NODE_ENV === 'production') {
    requiredVars.push('CORS_ORIGIN');
  }
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
}

// Validate environment before exporting config
validateEnvironment();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Security settings
  corsOrigin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  
  // Cache settings
  staticCacheMaxAge: 31536000, // 1 year for static assets
  htmlCacheMaxAge: 3600, // 1 hour for HTML files
  
  // Compression settings
  compressionThreshold: 1024, // Only compress responses larger than 1KB
  
  // Content Security Policy
  cspDirectives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"]
  }
};
