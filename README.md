# Unlicode Website

A high-end, luxury website for Unlicode - an Open Source IDE with Unlimited Tokens for Agents Powered by Local LLMs.

## 🚀 Features

- **Modern Design**: Glassmorphism and neumorphism styling with luxury aesthetics
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Smooth animations, testimonials carousel, FAQ accordion
- **Performance Optimized**: Fast loading with optimized assets and code
- **Accessibility**: Keyboard navigation, screen reader support, focus states
- **SEO Ready**: Meta tags, semantic HTML, and optimized structure

## 📱 Pages

- **Homepage**: Hero section, features, testimonials, pricing, FAQ
- **Documentation**: Installation guides, API reference, tutorials
- **Blog**: 4 pre-populated articles with newsletter signup
- **Contact**: Contact form with validation and company information
- **404**: Custom error page with helpful navigation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Styling**: Custom CSS with CSS Grid, Flexbox, and CSS Variables
- **Icons**: Phosphor Icons
- **Fonts**: Inter (Google Fonts)
- **Server**: Simple Express server for static file serving

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unlicode-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run build` - Build the project (no build step required for static site)

## 📁 Project Structure

```
unlicode-web/
├── src/
│   └── public/            # Static files
│       ├── index.html     # Homepage
│       ├── documentation.html # Documentation page
│       ├── blog.html      # Blog page
│       ├── contact.html   # Contact page
│       ├── 404.html       # 404 error page
│       ├── styles.css     # Consolidated stylesheet (all styles)
│       ├── script.js      # Main JavaScript
│       ├── components/    # UI components
│       │   └── ui/
│       │       ├── header.css # Header component styles
│       │       └── header.js  # Header component logic
│       └── images/        # Images and assets
│           └── unlicode-logo.png
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🎨 Design Features

### Typography
- **Font**: Inter (light weight for all text)
- **Letter Spacing**: Tight spacing for headings
- **Opacity**: Lower opacity for body text

### Icons
- **Icon Set**: Phosphor Icons (light weight)
- **Usage**: Throughout the interface for visual hierarchy

### Buttons
- **Style**: Neumorphism 3D style
- **Effects**: Glowing hover effects
- **Animations**: Smooth transitions and transforms

### Cards
- **Style**: Glassmorphic with background blur
- **Opacity**: Low opacity backgrounds
- **Effects**: Hover animations and shadows

## 🎭 Animations

- **Page Load**: Content fades in from 0% to 100% opacity
- **Scroll Effects**: Sections animate with opacity and blur
- **Hover States**: Smooth transitions on interactive elements
- **Testimonials**: Auto-advancing carousel with manual controls
- **FAQ**: Smooth accordion animations

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: 480px, 768px, 1024px
- **Navigation**: Collapsible mobile menu with smooth animations
- **Grid Layouts**: Responsive grids that adapt to screen size
- **Touch Support**: Swipe gestures for mobile users

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear focus indicators
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: High contrast ratios
- **Alt Text**: Descriptive text for images

## 🔧 Customization

### Colors
Update the CSS variables in `src/public/styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    /* ... more variables */
}
```

### Content
- **Text**: Update HTML files directly
- **Images**: Replace placeholder content with actual images
- **Blog Posts**: Modify the API endpoint in `server.js`

### Styling
- **Layouts**: Modify CSS Grid and Flexbox properties
- **Animations**: Adjust timing and easing functions
- **Responsive**: Update breakpoints and mobile styles

## 🚀 Deployment

### Static Hosting
1. Build the project: `npm run build`
2. Upload the `src/public/` folder to your hosting provider
3. Configure your server to serve static files

### Node.js Hosting
1. Deploy to platforms like Heroku, Vercel, or DigitalOcean
2. Set environment variables if needed
3. Ensure the port is configured correctly

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

- **Optimized Images**: WebP format with fallbacks
- **Minified CSS/JS**: Production-ready code
- **Lazy Loading**: Images and content load as needed
- **Caching**: Browser caching headers
- **Compression**: Gzip compression for text assets
- **Consolidated CSS**: Single stylesheet reduces HTTP requests

## 🔒 Security

- **Content Security Policy**: Configured in server.js
- **Input Validation**: Form validation on client and server
- **HTTPS**: Secure connections recommended
- **XSS Protection**: Sanitized user inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/documentation` page
- **Issues**: Report bugs via GitHub issues
- **Contact**: Use the contact form on the website
- **Community**: Join our Discord server

## 🎯 Roadmap

- [ ] Add more blog articles
- [ ] Implement search functionality
- [ ] Add user authentication
- [ ] Create admin dashboard
- [ ] Add analytics tracking
- [ ] Implement A/B testing
- [ ] Add multi-language support

## 🙏 Acknowledgments

- **Phosphor Icons** for the beautiful icon set
- **Google Fonts** for the Inter typeface
- **Express.js** for the simple server framework
- **CSS Grid & Flexbox** for modern layouts

---

Built with ❤️ by the Unlicode team
