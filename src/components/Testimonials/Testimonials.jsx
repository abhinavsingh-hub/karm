import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Student, IIT Delhi',
      avatar: 'RS',
      quote: 'Karm has transformed how I contribute to my community. The platform makes it so easy to find causes that matter and connect with like-minded people.',
      impact: 'Organized 5 clean-up drives',
    },
    {
      name: 'Priya Patel',
      role: 'NGO Founder, Mumbai',
      avatar: 'PP',
      quote: 'As an NGO, Karm has been a game-changer. We\'ve connected with hundreds of volunteers and scaled our impact beyond what we imagined possible.',
      impact: 'Connected 200+ volunteers',
    },
    {
      name: 'Dr. Amit Kumar',
      role: 'College Coordinator, Delhi University',
      avatar: 'AK',
      quote: 'Our college has partnered with Karm to manage all our social initiatives. The dashboard and collaboration tools are exactly what we needed.',
      impact: 'Managed 15 initiatives',
    },
    {
      name: 'Sneha Reddy',
      role: 'Citizen Volunteer, Hyderabad',
      avatar: 'SR',
      quote: 'I love how Karm gamifies volunteering. The badges and impact tracking keep me motivated, and I\'ve made so many meaningful connections.',
      impact: 'Earned 12 volunteer badges',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="testimonials section" id="testimonials">
      <div className="testimonials-background">
        <div className="floating-hearts">
          {[...Array(6)].map((_, i) => (
            <FiHeart key={i} className="heart-icon" style={{ '--delay': i * 0.5 + 's' }} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2>Stories of Impact</h2>
          <p>Real stories from our community</p>
        </div>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={goToPrevious} aria-label="Previous">
            <FiChevronLeft />
          </button>

          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card glass">
                  <div className="quote-icon">
                    <FiHeart />
                  </div>
                  <blockquote className="testimonial-quote">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{testimonial.avatar}</div>
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                      <div className="author-impact">{testimonial.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={goToNext} aria-label="Next">
            <FiChevronRight />
          </button>
        </div>

        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

