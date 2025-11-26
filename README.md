# Karm - For Humanity

A **fully functional social platform** for **Karm** — The Social Platform for Social Good.

Karm connects students, colleges, NGOs, and citizens to collaborate on local social causes, reduce food waste, and make measurable community impact.

**Version 1.0.0** - Complete Platform Implementation ✅

## 🚀 Features

### Core Platform Features

- **Authentication System**: Sign up/Sign in for Individuals, Non-Profits, and Institutions
- **LinkedIn-Style Home Page**: Feed with posts, sidebars, stats, and trending content
- **Campaigns**: Browse, filter, and join campaigns with progress tracking
- **Connections**: Network management with suggestions and connection requests
- **Messaging**: Full chat interface for conversations
- **Notifications**: Real-time notification feed
- **Search**: Global search for organizations, campaigns, and people
- **Profiles**: Complete user profiles with stats and posts
- **Settings**: Profile and theme customization

### Design & UX

- **Modern Design**: Futuristic yet warm aesthetic with vibrant gradients and glass-morphism
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Elegant dark mode with gradient inversion
- **Smooth Animations**: Particle effects, parallax scrolling, and micro-interactions
- **Interactive Components**: Toast notifications, loading states, empty states

## 🛠️ Tech Stack

- **React 19.2.0**: Component-based UI framework
- **React Router DOM 7.9.6**: Client-side routing
- **Vite 7.2.2**: Fast build tool and dev server
- **React Icons 5.5.0**: Icon library
- **localStorage**: Data persistence (ready for backend integration)
- **CSS Custom Properties**: Theme system with dark mode

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

## 📚 Documentation

- **[FULL_PLATFORM_GUIDE.md](./FULL_PLATFORM_GUIDE.md)** ⭐ - Complete platform documentation (START HERE)
- [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) - How to customize colors, typography, and content
- [MAP_API_INTEGRATION_GUIDE.md](./MAP_API_INTEGRATION_GUIDE.md) - How to integrate a real map API
- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Detailed build and deployment instructions

## 🆕 What's New in Version 1.0.0

The platform has been completely transformed:

- ✅ Full authentication system with sign up/sign in
- ✅ LinkedIn-style home page with feed and sidebars
- ✅ Complete navigation with search functionality
- ✅ All core pages: Profile, Campaigns, Connections, Messages, Notifications, Search, Settings
- ✅ Reusable UI components (Toast, Loading, EmptyState)
- ✅ Mock data system with localStorage persistence
- ✅ Protected routes and authentication flow
- ✅ Responsive design on all devices

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
