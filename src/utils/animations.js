// Intersection Observer for scroll animations
export const observeElements = (selector, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    el.classList.add('fade-in-on-scroll');
    observer.observe(el);
  });

  return observer;
};

// Number counter animation
export const animateCounter = (element, target, duration = 2000) => {
  if (!element) return;
  
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(current));
    }
  }, 16);
};

// Format numbers with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Parallax effect
export const parallaxScroll = (element, speed = 0.5) => {
  if (!element) return;
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + scrolled;
    const elementHeight = rect.height;
    
    if (scrolled + window.innerHeight > elementTop && scrolled < elementTop + elementHeight) {
      const yPos = -(scrolled - elementTop) * speed;
      element.style.transform = `translateY(${yPos}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};

