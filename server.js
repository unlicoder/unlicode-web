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

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'documentation.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'contact.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'blog.html'));
});

// API endpoint for blog posts
app.get('/api/blog-posts', (req, res) => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Unlicode: Your First Local LLM Setup",
      excerpt: "Learn how to set up Unlicode with your first local language model and start coding with unlimited tokens.",
      author: "Unlicode Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Tutorial"
    },
    {
      id: 2,
      title: "Why Local LLMs Are the Future of AI-Powered Development",
      excerpt: "Discover the benefits of running AI models locally and how Unlicode makes it accessible to every developer.",
      author: "AI Research Team",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Insights"
    },
    {
      id: 3,
      title: "Optimizing Performance: CPU vs GPU vs HPU for Local LLMs",
      excerpt: "A comprehensive guide to choosing the right hardware setup for optimal local LLM performance.",
      author: "Performance Team",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Technical"
    },
    {
      id: 4,
      title: "Building Secure AI Applications with Unlicode's Privacy Features",
      excerpt: "Explore how Unlicode ensures your code and prompts never leave your machine while maintaining full functionality.",
      author: "Security Team",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Security"
    }
  ];
  
  res.json(blogPosts);
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'src', 'public', '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`🚀 Unlicode website running on http://localhost:${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/documentation`);
  console.log(`📧 Contact: http://localhost:${PORT}/contact`);
  console.log(`📝 Blog: http://localhost:${PORT}/blog`);
});
