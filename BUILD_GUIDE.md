# Build Guide for Karm Website

This guide provides detailed instructions for building, testing, and deploying the Karm website.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- Vite and plugins
- React Icons
- ESLint and other dev dependencies

### 2. Verify Installation

Check that everything is installed correctly:

```bash
npm list --depth=0
```

## 🚀 Development Server

### Start Development Server

```bash
npm run dev
```

The development server will start on `http://localhost:5173` (or the next available port).

### Development Features

- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **Fast Refresh**: React components update without losing state
- **Source Maps**: Easy debugging in browser DevTools
- **Error Overlay**: Clear error messages in the browser

### Development Scripts

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Building for Production

### 1. Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 2. Preview Production Build

Before deploying, preview the production build locally:

```bash
npm run preview
```

This serves the `dist` folder on `http://localhost:4173`.

### 3. Build Output

The `dist` folder contains:
- Optimized and minified JavaScript
- Optimized CSS
- Static assets
- `index.html` with asset references

## 🌍 Environment Variables

Currently, the project doesn't require environment variables. If you need to add them:

1. Create a `.env` file in the root directory:
```env
VITE_API_URL=https://api.example.com
VITE_MAP_API_KEY=your_api_key_here
```

2. Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. Add `.env` to `.gitignore` to keep secrets safe.

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Or connect GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Vite and deploy

**Build Settings**:
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Netlify

1. **Install Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Deploy**:
```bash
netlify deploy --prod
```

3. **Or use Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your Git repository

**Build Settings**:
- Build command: `npm run build`
- Publish directory: `dist`

### Option 3: GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/karm"
}
```

3. **Deploy**:
```bash
npm run deploy
```

### Option 4: AWS S3 + CloudFront

1. **Build the project**:
```bash
npm run build
```

2. **Upload to S3**:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront** for CDN distribution

### Option 5: Traditional Web Hosting

1. **Build the project**:
```bash
npm run build
```

2. **Upload contents of `dist` folder** to your web server via FTP/SFTP

3. **Configure server** to serve `index.html` for all routes (for React Router if added later)

## 🔍 Testing the Build

### Local Testing

1. Build the project:
```bash
npm run build
```

2. Preview locally:
```bash
npm run preview
```

3. Test in different browsers:
   - Chrome/Edge
   - Firefox
   - Safari
   - Mobile browsers

### Performance Testing

Use these tools to test performance:

- **Lighthouse** (Chrome DevTools)
- **PageSpeed Insights**: [pagespeed.web.dev](https://pagespeed.web.dev/)
- **WebPageTest**: [webpagetest.org](https://webpagetest.org/)

### Browser Compatibility

The site is tested and works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build command fails with errors

**Solutions**:
1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Vite cache:
```bash
rm -rf node_modules/.vite
```

3. Check Node.js version:
```bash
node --version  # Should be v18+
```

### Assets Not Loading

**Issue**: Images or fonts not loading in production

**Solutions**:
1. Ensure assets are in `public/` folder
2. Use relative paths: `/assets/image.png`
3. Check `vite.config.js` for asset handling

### Dark Mode Not Working

**Issue**: Dark mode toggle doesn't persist

**Solution**: Check browser localStorage is enabled and not blocked

### Performance Issues

**Issue**: Slow load times

**Solutions**:
1. Optimize images (use WebP format)
2. Enable gzip compression on server
3. Use CDN for assets
4. Check bundle size with:
```bash
npm run build -- --analyze
```

## 📊 Build Optimization

The production build is automatically optimized:

- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Unused code removed
- **Minification**: JavaScript and CSS minified
- **Asset Optimization**: Images and fonts optimized

## 🔐 Security Considerations

1. **API Keys**: Never commit API keys to Git
2. **Environment Variables**: Use `.env` files for secrets
3. **HTTPS**: Always deploy with HTTPS enabled
4. **Content Security Policy**: Configure CSP headers on server

## 📝 Next Steps

After deployment:

1. Set up custom domain (if needed)
2. Configure SSL certificate
3. Set up analytics (Google Analytics, etc.)
4. Configure error tracking (Sentry, etc.)
5. Set up monitoring and alerts

## 🆘 Getting Help

If you encounter issues:

1. Check the [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)
2. Review [MAP_API_INTEGRATION_GUIDE.md](./MAP_API_INTEGRATION_GUIDE.md)
3. Check Vite documentation: [vitejs.dev](https://vitejs.dev/)
4. Check React documentation: [react.dev](https://react.dev/)

---

Happy building! 🚀

