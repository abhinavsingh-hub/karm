# Karm - For Humanity

A stunning, modern, emotionally powerful website for **Karm** — The Social Platform for Social Good.

Karm connects students, colleges, NGOs, and citizens to collaborate on local social causes, reduce food waste, and make measurable community impact.

## 🚀 Features

- **Modern Design**: Futuristic yet warm aesthetic with vibrant gradients and glass-morphism
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Elegant dark mode with gradient inversion
- **Smooth Animations**: Particle effects, parallax scrolling, and micro-interactions
- **Interactive Components**: Sign-in modal, testimonials carousel, community feed
- **Impact Tracking**: Animated statistics and progress visualizations

## 🛠️ Tech Stack

- **React 18+**: Component-based UI framework
- **Vite**: Fast build tool and dev server
- **CSS Modules**: Scoped styling with animations
- **React Icons**: Icon library
- **Intersection Observer API**: Scroll-triggered animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Karm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## 📁 Project Structure

```
karm/
├── public/
│   └── assets/          # Images, icons, and static assets
├── src/
│   ├── components/      # React components
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── SignInModal/
│   │   ├── HowItWorks/
│   │   ├── FeaturesShowcase/
│   │   ├── ImpactTracker/
│   │   ├── CommunityFeed/
│   │   ├── Testimonials/
│   │   ├── JoinCTA/
│   │   └── Footer/
│   ├── contexts/        # React contexts (Theme)
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles and variables
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

See the following guides for customization:
- [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) - How to customize colors, typography, and content
- [MAP_API_INTEGRATION_GUIDE.md](./MAP_API_INTEGRATION_GUIDE.md) - How to integrate a real map API
- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Detailed build and deployment instructions

## 🌈 Color Palette

- **Deep Indigo**: `#1e3a5f` - Trust and professionalism
- **Turquoise**: `#40e0d0` - Hope and innovation
- **Warm Amber**: `#ffb84d` - Impact and energy

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🚢 Deployment

The site can be deployed to any static hosting service:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload the `dist` folder

See [BUILD_GUIDE.md](./BUILD_GUIDE.md) for detailed deployment instructions.

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the development team.

---

**"Good karma starts with one act."** - Karm
