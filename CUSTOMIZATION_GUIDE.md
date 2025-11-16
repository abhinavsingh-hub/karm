# Customization Guide for Karm Website

This guide explains how to customize various aspects of the Karm website, including colors, typography, animations, and content.

## 🎨 Color Palette Customization

### Location
Colors are defined in `src/styles/variables.css`

### How to Change Colors

1. **Open** `src/styles/variables.css`

2. **Modify Color Variables**:

```css
:root {
  /* Change primary indigo color */
  --color-indigo-900: #1e3a5f;  /* Change to your color */
  --color-indigo-800: #2d4a6e;
  
  /* Change turquoise accent */
  --color-turquoise-500: #40e0d0;  /* Change to your color */
  
  /* Change amber accent */
  --color-amber-500: #ffb84d;  /* Change to your color */
}
```

3. **Update Dark Mode Colors** (if needed):

```css
[data-theme="dark"] {
  --dark-indigo: #4a90e2;  /* Your dark mode indigo */
  --dark-turquoise: #5eead4;  /* Your dark mode turquoise */
  --dark-amber: #fbbf24;  /* Your dark mode amber */
}
```

4. **Save and refresh** - Changes apply immediately in development

### Color Usage Tips

- Maintain contrast ratios for accessibility (WCAG AA minimum)
- Test colors in both light and dark modes
- Use color picker tools to find complementary colors

## 🔤 Typography Customization

### Location
Typography is configured in `src/styles/index.css`

### How to Change Fonts

1. **Update Google Fonts Import** in `src/styles/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap');
```

2. **Change Font Family Variables**:

```css
body {
  font-family: 'YourFont', 'FallbackFont', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'YourHeadingFont', serif;
}
```

3. **Adjust Font Sizes**:

```css
h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);  /* Adjust as needed */
}

p {
  font-size: 1.1rem;  /* Adjust body text size */
}
```

### Recommended Font Combinations

- **Modern**: Inter (body) + Playfair Display (headings)
- **Friendly**: Poppins (body) + Merriweather (headings)
- **Professional**: Roboto (body) + Montserrat (headings)

## 🎬 Hero Section Animation Customization

### Location
Hero animations are in `src/components/Hero/Hero.jsx` and `Hero.css`

### Replace Particle Animation with Video

1. **Add video file** to `public/assets/hero-video.mp4`

2. **Update Hero.jsx**:

```jsx
// Remove or comment out the canvas particle code
// Add video element instead:

<div className="hero-video-wrapper">
  <video
    className="hero-video"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/assets/hero-video.mp4" type="video/mp4" />
  </video>
  <div className="hero-video-overlay" />
</div>
```

3. **Update Hero.css**:

```css
.hero-video-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 58, 95, 0.4);
  z-index: 2;
}
```

### Adjust Particle Effects

1. **Modify particle count** in `Hero.jsx`:

```javascript
const particleCount = 50;  // Increase or decrease
```

2. **Change particle colors**:

```javascript
ctx.fillStyle = `rgba(64, 224, 208, ${this.opacity})`;  // Change RGB values
```

3. **Adjust particle speed**:

```javascript
this.speedX = Math.random() * 2 - 1;  // Change multiplier
this.speedY = Math.random() * 2 - 1;
```

## 🗺️ World Map Customization

### Current Implementation
The map is a static SVG in `src/components/Hero/Hero.jsx`

### Customize Map Appearance

1. **Change dot colors**:

```jsx
<circle className="impact-dot" cx="200" cy="150" r="4" fill="#40e0d0" />
// Change fill color to your preference
```

2. **Add more dots**:

```jsx
<circle className="impact-dot" cx="X" cy="Y" r="4" fill="#ffb84d" />
// Add more circles with different coordinates
```

3. **Adjust dot animation**:

```css
.impact-dot {
  animation: pulse 2s ease-in-out infinite;  /* Change duration */
}
```

### Replace with Custom SVG Map

1. **Create or download** an SVG world map
2. **Replace the SVG content** in `Hero.jsx`
3. **Add animated dots** at desired locations

## 📝 Content Customization

### Update Text Content

1. **Hero Section** - `src/components/Hero/Hero.jsx`:
```jsx
<h1 className="hero-title">
  <span className="title-main">For Humanity</span>  {/* Change tagline */}
</h1>
<p className="hero-subtitle">
  Join the movement...  {/* Change subtitle */}
</p>
```

2. **How It Works** - `src/components/HowItWorks/HowItWorks.jsx`:
```jsx
const steps = [
  {
    title: 'Discover Causes Nearby',  // Change titles
    description: 'Find local...',  // Change descriptions
  },
  // ... more steps
];
```

3. **Impact Stats** - `src/components/ImpactTracker/ImpactTracker.jsx`:
```jsx
const stats = [
  {
    value: '23,000',  // Update numbers
    label: 'Meals Saved',  // Update labels
  },
];
```

4. **Community Posts** - `src/components/CommunityFeed/CommunityFeed.jsx`:
```jsx
const posts = [
  {
    title: 'Clean-Up Drive...',  // Update post titles
    author: 'Rahul Sharma',  // Update authors
    // ... more fields
  },
];
```

5. **Testimonials** - `src/components/Testimonials/Testimonials.jsx`:
```jsx
const testimonials = [
  {
    name: 'Rahul Sharma',  // Update names
    quote: 'Karm has transformed...',  // Update quotes
  },
];
```

### Update Footer Links

Edit `src/components/Footer/Footer.jsx`:

```jsx
const footerLinks = {
  company: [
    { name: 'About', href: '#about' },  // Update links
  ],
  // ... more sections
};
```

## 🎭 Animation Customization

### Adjust Animation Speeds

In `src/styles/index.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
  /* Change duration in component CSS */
}

/* In component CSS files */
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;  /* Change 0.6s to your preference */
}
```

### Disable Animations

For users who prefer reduced motion, add to `src/styles/index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🖼️ Image Customization

### Add Custom Images

1. **Place images** in `public/assets/`
2. **Reference in components**:

```jsx
<img src="/assets/your-image.jpg" alt="Description" />
```

### Optimize Images

- Use WebP format for better compression
- Resize images to appropriate dimensions
- Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)

## 🎯 Component-Specific Customization

### Header

- **Logo text**: `src/components/Header/Header.jsx`
- **Navigation links**: Update `navLinks` array
- **Mobile menu**: Adjust breakpoint in `Header.css`

### Sign-In Modal

- **Form fields**: Modify in `SignInModal.jsx`
- **Validation**: Add validation logic in `handleSubmit`
- **Styling**: Update `SignInModal.css`

### Features Showcase

- **Feature cards**: Update `features` array in `FeaturesShowcase.jsx`
- **Mockups**: Customize device frames in `FeaturesShowcase.css`

## 🔧 Advanced Customization

### Add New Sections

1. Create new component in `src/components/YourSection/`
2. Add component files: `YourSection.jsx` and `YourSection.css`
3. Import and add to `App.jsx`:

```jsx
import YourSection from './components/YourSection/YourSection';

// In App component
<YourSection />
```

### Modify Theme System

1. **Add new theme variables** in `src/styles/variables.css`
2. **Update ThemeContext** in `src/contexts/ThemeContext.jsx` if needed
3. **Use variables** in component CSS files

### Add Routing

If you need multiple pages:

1. Install React Router:
```bash
npm install react-router-dom
```

2. Set up routes in `App.jsx` or create `AppRouter.jsx`

## 📱 Responsive Breakpoints

Customize breakpoints in component CSS files:

```css
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 769px) and (max-width: 1023px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

## ✅ Testing Customizations

After making changes:

1. **Test in development**:
```bash
npm run dev
```

2. **Test in production build**:
```bash
npm run build
npm run preview
```

3. **Test responsive design**:
   - Use browser DevTools
   - Test on real devices
   - Check different screen sizes

4. **Test dark mode**:
   - Toggle dark mode
   - Verify all colors work in both themes

## 🆘 Troubleshooting

### Colors Not Updating

- Clear browser cache
- Check CSS variable names match
- Verify `data-theme` attribute on `<html>`

### Fonts Not Loading

- Check Google Fonts URL is correct
- Verify font name matches import
- Check network tab for 404 errors

### Animations Not Working

- Check browser console for errors
- Verify CSS classes are applied
- Check Intersection Observer support

---

Need more help? Check the [BUILD_GUIDE.md](./BUILD_GUIDE.md) or [MAP_API_INTEGRATION_GUIDE.md](./MAP_API_INTEGRATION_GUIDE.md).

