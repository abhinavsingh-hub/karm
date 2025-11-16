import { useEffect, useRef, useState } from 'react';
import { animateCounter } from '../../utils/animations';
import './ImpactTracker.css';

const ImpactTracker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const mealsRef = useRef(null);
  const volunteersRef = useRef(null);
  const ngosRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animate counters
            setTimeout(() => {
              if (mealsRef.current) animateCounter(mealsRef.current, 23000, 2000);
              if (volunteersRef.current) animateCounter(volunteersRef.current, 4500, 2000);
              if (ngosRef.current) animateCounter(ngosRef.current, 120, 2000);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const stats = [
    {
      value: '23,000',
      label: 'Meals Saved',
      ref: mealsRef,
      color: 'var(--accent-amber)',
      percentage: 85,
    },
    {
      value: '4,500',
      label: 'Volunteers',
      ref: volunteersRef,
      color: 'var(--accent-turquoise)',
      percentage: 70,
    },
    {
      value: '120',
      label: 'NGOs Connected',
      ref: ngosRef,
      color: 'var(--accent-indigo)',
      percentage: 60,
    },
  ];

  return (
    <section className="impact-tracker section" id="impact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Our Impact</h2>
          <p>Real numbers, real change, real impact</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-value" ref={stat.ref}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className="progress-ring-wrapper">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring-background"
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--bg-tertiary)"
                    strokeWidth="8"
                  />
                  <circle
                    className="progress-ring-progress"
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={
                      isVisible
                        ? `${2 * Math.PI * 50 * (1 - stat.percentage / 100)}`
                        : `${2 * Math.PI * 50}`
                    }
                    style={{
                      transition: 'stroke-dashoffset 2s ease-out',
                      transform: 'rotate(-90deg)',
                      transformOrigin: '60px 60px',
                    }}
                  />
                </svg>
                <div className="progress-percentage">{stat.percentage}%</div>
              </div>
            </div>
          ))}
        </div>

        <div className="impact-stats-text">
          <p className="stats-text">
            <span ref={mealsRef}>23,000</span> meals saved ·{' '}
            <span ref={volunteersRef}>4,500</span> volunteers ·{' '}
            <span ref={ngosRef}>120</span> NGOs connected
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactTracker;

