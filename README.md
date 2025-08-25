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

## 🚀 Production Deployment

### Prerequisites
- Node.js 16+ installed on your server
- Domain name configured with DNS
- SSL certificate (recommended for production)
- Environment variables properly configured

### 1. Environment Configuration

**Copy and configure environment variables:**
```bash
cp env.example .env
```

**Required production variables:**
```bash
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com
```

**Optional security variables:**
```bash
# Rate limiting (requests per window)
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100

# Additional security headers
SECURE_HEADERS=true
```

### 2. Validation & Testing

**Validate configuration before deployment:**
```bash
npm run validate
```

**Expected output:**
```
🔍 Validating configuration...

✅ Configuration validation passed!
📋 Current configuration:
   Port: 3000
   Environment: production
   CORS Origin: ["https://yourdomain.com"]
   Static Cache: 31536000s
   HTML Cache: 3600s
   Compression Threshold: 1024 bytes

🔒 Production security checks passed

🚀 Configuration is ready!
```

### 3. Deployment Options

#### Option A: Traditional VPS/Server

**1. Upload code to server:**
```bash
# On your local machine
git clone <your-repo>
cd unlicode-web
npm install --production
npm run validate
```

**2. Start production server:**
```bash
npm start
```

**3. Use PM2 for process management (recommended):**
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "unlicode-web"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Option B: Docker Deployment

**1. Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

**2. Build and run:**
```bash
docker build -t unlicode-web .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e CORS_ORIGIN=https://yourdomain.com \
  unlicode-web
```

**3. Docker Compose (recommended):**
```yaml
version: '3.8'
services:
  unlicode-web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - CORS_ORIGIN=https://yourdomain.com
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
```

#### Option C: Cloud Platform Deployment

**DigitalOcean App Platform:**
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push

**Heroku:**
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://yourdomain.com
git push heroku main
```

**Vercel:**
1. Connect your repository
2. Set environment variables in project settings
3. Deploy automatically

### 4. Reverse Proxy Setup (Nginx)

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static asset caching
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 5. SSL Certificate Setup

**Let's Encrypt (free):**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. Monitoring & Logging

**Setup logging:**
```bash
# Create logs directory
mkdir logs

# Use PM2 for logging
pm2 start server.js --name "unlicode-web" --log logs/app.log --error logs/error.log
```

**Health monitoring:**
```bash
# Check application health
curl https://yourdomain.com/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

### 7. Performance Optimization

**Enable compression:**
```bash
# Already configured in server.js
# Compression threshold: 1KB
```

**Static asset caching:**
```bash
# Already configured:
# CSS/JS/Images: 1 year cache
# HTML: 1 hour cache
```

**CDN setup (optional):**
- Configure Cloudflare or similar CDN
- Set cache rules for static assets
- Enable HTTP/2 and HTTP/3

### 8. Security Checklist

- [ ] Environment variables properly set
- [ ] CORS_ORIGIN configured for production domain
- [ ] SSL certificate installed and working
- [ ] Security headers enabled (Helmet.js)
- [ ] Content Security Policy configured
- [ ] Rate limiting implemented (if needed)
- [ ] Firewall rules configured
- [ ] Regular security updates scheduled

### 9. Troubleshooting

**Common issues and solutions:**

**Port already in use:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

**Permission denied:**
```bash
# Check file permissions
ls -la
# Fix if needed
chmod 755 server.js
```

**Environment validation fails:**
```bash
# Check .env file exists
ls -la .env

# Validate configuration
npm run validate

# Check environment variables
echo $NODE_ENV
echo $CORS_ORIGIN
```

**Server won't start:**
```bash
# Check logs
npm run health
tail -f logs/error.log

# Validate config
npm run validate
```

### 10. Maintenance

**Regular tasks:**
- Monitor server logs for errors
- Check SSL certificate expiration
- Update dependencies monthly
- Monitor performance metrics
- Backup configuration files

**Update application:**
```bash
git pull origin main
npm install --production
npm run validate
pm2 restart unlicode-web
```

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
├── validate-config.js # Configuration validation
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
- `npm run validate` - Validate configuration
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
- ✅ Added production deployment guide
- ✅ Implemented configuration validation

## 🔒 Security Features

- Helmet.js for security headers
- Secure CORS configuration
- Content Security Policy (CSP)
- Environment-based configuration
- Input validation and sanitization
- Production environment validation
- Secure deployment practices

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
5. Validate configuration with `npm run validate`

## 🆘 Support

For deployment issues:
1. Check the troubleshooting section above
2. Verify environment configuration
3. Check server logs and error messages
4. Ensure all prerequisites are met
