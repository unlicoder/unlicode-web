const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const config = require('./config');

const app = express();
const PORT = config.port;

// Compression middleware for better performance
app.use(compression({ threshold: config.compressionThreshold }));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: config.cspDirectives,
  },
}));

// CORS middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
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
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});



// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`🚀 Unlicode website running on http://localhost:${PORT}`);
});
