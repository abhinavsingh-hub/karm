import { useEffect, useRef } from 'react';
import { FiMapPin, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { observeElements } from '../../utils/animations';
import './HowItWorks.css';

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      observeElements('.how-it-works-card', {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      });
    }
  }, []);

  const steps = [
    {
      icon: FiMapPin,
      title: 'Discover Causes Nearby',
      description: 'Find local social causes and initiatives in your area. Connect with communities that need your help.',
      color: 'var(--accent-turquoise)',
    },
    {
      icon: FiUsers,
      title: 'Connect & Collaborate',
      description: 'Join forces with students, NGOs, and institutions. Build meaningful partnerships for social impact.',
      color: 'var(--accent-amber)',
    },
    {
      icon: FiTrendingUp,
      title: 'Track Your Impact',
      description: 'See the real difference you make. Monitor your contributions and celebrate collective achievements.',
      color: 'var(--accent-indigo)',
    },
  ];

  return (
    <section className="how-it-works section" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps to start making a difference</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="how-it-works-card"
                style={{ '--card-color': step.color }}
              >
                <div className="card-icon-wrapper">
                  <Icon className="card-icon" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="card-number">{index + 1}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

