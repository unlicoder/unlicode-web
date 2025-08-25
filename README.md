# Unlicode Web

A modern, responsive website for Unlicode - an Open Source IDE with Unlimited Tokens for Agents Powered by Local LLMs.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express
- **Styling**: Custom CSS with Glassmorphism effects
- **Icons**: Phosphor Icons

## 📁 Structure

```
unlicode-web/
├── src/public/     # Static files (HTML, CSS, JS)
├── server.js       # Express server
├── config.js       # Configuration
├── env.example     # Environment variables template
└── package.json    # Dependencies
```

## 🎨 Features

- Modern glassmorphism design
- Responsive mobile-first layout
- Smooth animations and interactions
- Theme switching (light/dark mode)
- Search functionality
- Testimonials carousel
- FAQ accordion
- SEO optimized
- Accessibility focused

## 🔧 Scripts

- `npm start` - Production server
- `npm run dev` - Development server with auto-reload
- `npm run test:manual` - Manual testing checklist
- `npm run health` - Check server health
- `npm run clean` - Clean install

## 🧪 Testing

### Manual Testing Checklist
1. **Browser Console**: Check for JavaScript errors
2. **Theme Toggle**: Verify light/dark mode switching
3. **Search Functionality**: Test search input and icon
4. **Navigation**: Test desktop and mobile navigation
5. **Testimonials**: Verify carousel functionality
6. **FAQ**: Test accordion expand/collapse
7. **Responsiveness**: Test on different screen sizes
8. **Performance**: Check loading times and animations

### Health Check
```bash
npm run health
# or manually
curl http://localhost:3000/health
```

## 🚨 Recent Fixes Applied

- ✅ Fixed JavaScript runtime errors
- ✅ Added missing DOM elements
- ✅ Implemented comprehensive error handling
- ✅ Secured CORS configuration
- ✅ Enhanced Content Security Policy
- ✅ Added testimonials and FAQ sections
- ✅ Improved server error handling
- ✅ Added graceful shutdown
- ✅ Enhanced logging and monitoring

## 🔒 Security Features

- Helmet.js for security headers
- Secure CORS configuration
- Content Security Policy (CSP)
- Environment-based configuration
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts
- Optimized for all screen sizes

## 📄 License

Apache 2.0

## 🐛 Bug Reports

If you encounter any issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Check the server logs
4. Run the health check endpoint
