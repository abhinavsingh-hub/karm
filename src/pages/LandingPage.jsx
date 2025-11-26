import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInModal from '../components/SignInModal/SignInModal';
import Header from '../components/Header/Header';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import FeaturesShowcase from '../components/FeaturesShowcase/FeaturesShowcase';
import ImpactTracker from '../components/ImpactTracker/ImpactTracker';
import CommunityFeed from '../components/CommunityFeed/CommunityFeed';
import Testimonials from '../components/Testimonials/Testimonials';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  // Background particle animation (moving dots)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(64, 224, 208, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [signInType, setSignInType] = useState('individual');
  const [isSignIn, setIsSignIn] = useState(false);

  const handleJoinClick = (type = 'individual') => {
    setSignInType(type);
    setIsSignIn(false);
    setIsSignInModalOpen(true);
  };

  const handleSignInClick = () => {
    setIsSignIn(true);
    setIsSignInModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignInModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsSignInModalOpen(false);
    navigate('/home');
  };

  return (
    <div className="landing-page">
      <Header onSignInClick={handleSignInClick} />
      
      <section className="landing-hero">
        <canvas ref={canvasRef} className="landing-particle-canvas" />
        <div className="hero-image-overlay" />
        <div className="container hero-grid">
          <div className="hero-content-section">
            <div className="hero-text-content">
              <h1 className="hero-title">
                <span className="title-main">For Humanity</span>
              </h1>
              <p className="hero-subtitle">
                Join the movement of connecting humans with their humanity. 
                Together we can create lasting impact in our communities.
              </p>
              <div className="hero-buttons">
                <button className="hero-cta primary" onClick={() => handleJoinClick('individual')}>
                  Join Karm
                  <span className="cta-arrow">→</span>
                </button>
                <button className="hero-cta secondary" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
            </div>
          </div>

          <div className="hero-form-section">
            <div className="auth-form-card">
              <h2>{isSignIn ? 'Welcome Back' : 'Get Started'}</h2>
              <p className="form-subtitle">
                {isSignIn ? 'Sign in to continue your journey' : 'Join thousands making a difference'}
              </p>
              <div className="auth-cta-buttons">
                <button 
                  className="auth-cta primary"
                  onClick={() => {
                    setIsSignIn(false);
                    setIsSignInModalOpen(true);
                  }}
                >
                  Sign Up
                </button>
                <button 
                  className="auth-cta secondary"
                  onClick={() => {
                    setIsSignIn(true);
                    setIsSignInModalOpen(true);
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={handleCloseModal} 
        defaultType={signInType}
        isSignIn={isSignIn}
        onSuccess={handleAuthSuccess}
      />

      <main>
        <section id="about" className="about-section">
          <div className="container">
            <h2>About Us</h2>
            <p>
              Our site acts as a social platform for social good, a digital bridge connecting individuals,
              institutions, and NGOs based on location, interests, and causes.
            </p>
            <p>
              Like a blend of LinkedIn and Reddit, it enables users to discover issues nearby, post community concerns,
              contribute resources, or collaborate for long‑term projects.
            </p>
            <p>Key aspects of value:</p>
            <ul>
              <li>Encourages community participation through localized issue discovery.</li>
              <li>Promotes transparency and measurable social contribution.</li>
              <li>
                Reduces daily food wastage by connecting food suppliers (canteens, colleges, hostels) directly with NGOs.
              </li>
            </ul>
          </div>
        </section>
        <HowItWorks />
        <FeaturesShowcase />
        <ImpactTracker />
        <CommunityFeed />
        <Testimonials />
        <JoinCTA onJoinClick={handleJoinClick} />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;

