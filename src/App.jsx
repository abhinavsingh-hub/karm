import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SignInModal from './components/SignInModal/SignInModal';
import HowItWorks from './components/HowItWorks/HowItWorks';
import FeaturesShowcase from './components/FeaturesShowcase/FeaturesShowcase';
import ImpactTracker from './components/ImpactTracker/ImpactTracker';
import CommunityFeed from './components/CommunityFeed/CommunityFeed';
import Testimonials from './components/Testimonials/Testimonials';
import JoinCTA from './components/JoinCTA/JoinCTA';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [signInType, setSignInType] = useState('individual');

  const handleJoinClick = (type = 'individual') => {
    setSignInType(type);
    setIsSignInModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Hero onJoinClick={() => handleJoinClick('individual')} />
        <HowItWorks />
        <FeaturesShowcase />
        <ImpactTracker />
        <CommunityFeed />
        <Testimonials />
        <JoinCTA onJoinClick={handleJoinClick} />
      </main>
      <Footer />
      <SignInModal isOpen={isSignInModalOpen} onClose={handleCloseModal} defaultType={signInType} />
    </div>
  );
}

export default App;
