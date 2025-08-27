const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const config = require('./config');

const app = express();
const PORT = config.port;
const HOST = process.env.HOST || 'localhost';

// Validate critical configuration before starting
if (!config.corsOrigin) {
  console.error('Critical Error: CORS_ORIGIN is not configured');
  console.error('Please set the CORS_ORIGIN environment variable');
  process.exit(1);
}

console.log('Configuration validation passed');
console.log(`CORS Origin: ${JSON.stringify(config.corsOrigin)}`);

// Compression middleware for better performance
app.use(compression({ threshold: config.compressionThreshold }));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: config.cspDirectives,
  },
}));

// CORS middleware with validation
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Cache control middleware for static assets
app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.setHeader('Cache-Control', `public, max-age=${config.staticCacheMaxAge}`);
  } else if (req.url.match(/\.(html)$/)) {
    res.setHeader('Cache-Control', `public, max-age=${config.htmlCacheMaxAge}`);
  }
  next();
});

// Serve static files
console.log('Server initialization details:');
console.log(`  Working directory: ${process.cwd()}`);
console.log(`  Directory: ${__dirname}`);
console.log(`  File: ${__filename}`);

const publicPath = path.resolve(process.cwd(), 'src', 'public');
console.log(`  Static files path: ${publicPath}`);

// Check if the directory exists
const fs = require('fs');
if (!fs.existsSync(publicPath)) {
    console.error(`Error: Directory does not exist: ${publicPath}`);
    console.error(`  Working directory: ${process.cwd()}`);
    console.error(`  Directory: ${__dirname}`);
    process.exit(1);
}

app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => {
  try {
    const indexPath = path.join(publicPath, 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    
    if (!fs.existsSync(indexPath)) {
      console.error(`Error: index.html does not exist at: ${indexPath}`);
      res.status(500).send('index.html not found');
      return;
    }
    
    res.sendFile(indexPath);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Internal server error');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - Page not found: ${req.method} ${req.url}`);
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  
  // Don't expose internal errors in production
  const message = config.nodeEnv === 'production' 
    ? 'Something went wrong!' 
    : err.message;
    
  res.status(err.status || 500).send(message);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, HOST, () => {
  console.log('='.repeat(50));
  console.log(`Unlicode Web Server`);
  console.log(`  URL: http://${HOST}:${PORT}`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  CORS Origins: ${JSON.stringify(config.corsOrigin)}`);
  console.log('='.repeat(50));
});
