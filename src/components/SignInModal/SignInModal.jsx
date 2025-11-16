import { useState, useEffect } from 'react';
import { FiX, FiUser, FiHome, FiUsers } from 'react-icons/fi';
import './SignInModal.css';

const SignInModal = ({ isOpen, onClose, defaultType = 'individual' }) => {
  const [selectedType, setSelectedType] = useState(defaultType);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: '',
  });

  if (!isOpen) return null;

  const signInTypes = [
    {
      id: 'individual',
      label: 'Individual',
      icon: FiUser,
      description: 'Join as a student or citizen',
    },
    {
      id: 'nonprofit',
      label: 'Non-Profit Organization',
      icon: FiHome,
      description: 'Register your NGO',
    },
    {
      id: 'institution',
      label: 'Institution',
      icon: FiUsers,
      description: 'Partner as a college',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Sign in:', { type: selectedType, ...formData });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedType(defaultType);
    }
  }, [defaultType, isOpen]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <div className="modal-header">
          <h2>Join Karm</h2>
          <p>Choose how you want to make an impact</p>
        </div>

        <div className="signin-types">
          {signInTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                className={`signin-type ${selectedType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <Icon className="type-icon" />
                <div className="type-info">
                  <span className="type-label">{type.label}</span>
                  <span className="type-description">{type.description}</span>
                </div>
              </button>
            );
          })}
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          {selectedType === 'nonprofit' && (
            <div className="form-group">
              <label htmlFor="organization">Organization Name</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Enter your NGO name"
                required
              />
            </div>
          )}

          {selectedType === 'institution' && (
            <div className="form-group">
              <label htmlFor="organization">Institution Name</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Enter your college name"
                required
              />
            </div>
          )}

          {selectedType === 'individual' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>

          <p className="form-footer">
            Already have an account? <a href="#login">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;

