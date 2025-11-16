import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About', href: '#about' },
      { name: 'Impact', href: '#impact' },
      { name: 'Partnerships', href: '#partnerships' },
      { name: 'Blog', href: '#blog' },
    ],
    resources: [
      { name: 'Help Center', href: '#help' },
      { name: 'Community Guidelines', href: '#guidelines' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
    ],
    connect: [
      { name: 'Contact', href: '#contact' },
      { name: 'Press Kit', href: '#press' },
      { name: 'Careers', href: '#careers' },
    ],
  };

  const socialLinks = [
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">Karm</span>
              <p className="footer-quote">"Good karma starts with one act."</p>
            </div>
            <div className="social-links">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul className="footer-links">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Karm. All rights reserved.</p>
          <p>Connecting humans with their humanity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

