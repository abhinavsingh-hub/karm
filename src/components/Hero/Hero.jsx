import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = ({ onJoinClick }) => {
  const canvasRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animated dots on map
    const mapContainer = mapRef.current;
    if (mapContainer) {
      const dots = mapContainer.querySelectorAll('.impact-dot');
      dots.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.animation = `pulse 2s ease-in-out infinite`;
          dot.style.animationDelay = `${index * 0.2}s`;
        }, index * 100);
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="hero-gradient" />
      
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-main">For Humanity</span>
            </h1>
            <p className="hero-subtitle">
              Join the movement of connecting humans with their humanity.
            </p>
            <button className="hero-cta" onClick={onJoinClick}>
              Join Karm
              <span className="cta-arrow">→</span>
            </button>
          </div>

          <div className="hero-map" ref={mapRef}>
            <svg
              viewBox="0 0 800 400"
              className="world-map"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world map paths */}
              <path
                d="M100,150 Q150,100 200,150 T300,150 Q350,100 400,150 T500,150 Q550,100 600,150"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <path
                d="M150,200 Q200,250 250,200 T350,200 Q400,250 450,200 T550,200 Q600,250 650,200"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              
              {/* Animated impact dots */}
              <circle className="impact-dot" cx="200" cy="150" r="4" fill="#40e0d0" />
              <circle className="impact-dot" cx="350" cy="120" r="4" fill="#ffb84d" />
              <circle className="impact-dot" cx="500" cy="180" r="4" fill="#40e0d0" />
              <circle className="impact-dot" cx="250" cy="200" r="4" fill="#ffb84d" />
              <circle className="impact-dot" cx="450" cy="220" r="4" fill="#40e0d0" />
              <circle className="impact-dot" cx="600" cy="160" r="4" fill="#ffb84d" />
              <circle className="impact-dot" cx="300" cy="250" r="4" fill="#40e0d0" />
              <circle className="impact-dot" cx="550" cy="240" r="4" fill="#ffb84d" />
            </svg>
            <p className="map-label">Live Impact Worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

