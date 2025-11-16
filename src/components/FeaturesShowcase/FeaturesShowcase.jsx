import { useEffect, useRef } from 'react';
import { FiThumbsUp, FiAward, FiPackage, FiBarChart2 } from 'react-icons/fi';
import { observeElements } from '../../utils/animations';
import './FeaturesShowcase.css';

const FeaturesShowcase = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      observeElements('.feature-card', {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      });
    }
  }, []);

  const features = [
    {
      icon: FiThumbsUp,
      title: 'Real-time Issue Posting & Upvoting',
      description: 'Post local issues and causes. Community upvoting ensures the most urgent needs get attention.',
      mockup: 'issue-posting',
      gradient: 'var(--gradient-primary)',
    },
    {
      icon: FiAward,
      title: 'Gamified Volunteering Badges',
      description: 'Earn badges and recognition for your contributions. Track your volunteering journey.',
      mockup: 'badges',
      gradient: 'var(--gradient-secondary)',
    },
    {
      icon: FiPackage,
      title: 'Food Connect System',
      description: 'Connect leftover food from events and restaurants with those who need it most.',
      mockup: 'food-connect',
      gradient: 'linear-gradient(135deg, #ffb84d 0%, #40e0d0 100%)',
    },
    {
      icon: FiBarChart2,
      title: 'NGO Collaboration Dashboard',
      description: 'Comprehensive dashboard for NGOs to manage volunteers, track impact, and collaborate.',
      mockup: 'dashboard',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #ffb84d 100%)',
    },
  ];

  return (
    <section className="features-showcase section" id="features" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to make a real impact</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card"
                style={{ '--feature-gradient': feature.gradient }}
              >
                <div className="feature-icon">
                  <Icon />
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-mockup">
                  <div className="device-frame">
                    <div className="device-screen">
                      <div className="mockup-content" data-mockup={feature.mockup}>
                        <div className="mockup-header"></div>
                        <div className="mockup-body">
                          <div className="mockup-element"></div>
                          <div className="mockup-element"></div>
                          <div className="mockup-element"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;

