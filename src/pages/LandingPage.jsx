import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [signInType, setSignInType] = useState('individual');
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

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

