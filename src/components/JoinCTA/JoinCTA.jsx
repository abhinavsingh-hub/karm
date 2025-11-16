import { FiUser, FiHome, FiUsers } from 'react-icons/fi';
import './JoinCTA.css';

const JoinCTA = ({ onJoinClick }) => {
  const ctaOptions = [
    {
      icon: FiUser,
      label: 'Sign Up as Individual',
      description: 'Join as a student or citizen',
      onClick: () => onJoinClick && onJoinClick('individual'),
    },
    {
      icon: FiHome,
      label: 'Register NGO',
      description: 'Register your non-profit organization',
      onClick: () => onJoinClick && onJoinClick('nonprofit'),
    },
    {
      icon: FiUsers,
      label: 'Partner with College',
      description: 'Partner your institution with Karm',
      onClick: () => onJoinClick && onJoinClick('institution'),
    },
  ];

  return (
    <section className="join-cta section" id="join">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Be part of your city's story of change.</h2>
          <p className="cta-subtitle">
            Join thousands of changemakers making a real difference in their communities.
          </p>

          <div className="cta-buttons">
            {ctaOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  className="cta-button"
                  onClick={option.onClick}
                >
                  <Icon className="button-icon" />
                  <div className="button-content">
                    <span className="button-label">{option.label}</span>
                    <span className="button-description">{option.description}</span>
                  </div>
                  <span className="button-arrow">→</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;

