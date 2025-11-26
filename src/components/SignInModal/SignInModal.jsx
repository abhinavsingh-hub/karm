import { useState, useEffect } from 'react';
import { FiX, FiUser, FiHome, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './SignInModal.css';

const SignInModal = ({ isOpen, onClose, defaultType = 'individual', isSignIn = false, onSuccess }) => {
  const [selectedType, setSelectedType] = useState(defaultType);
  const [mode, setMode] = useState(isSignIn ? 'signin' : 'signup');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: '',
  });

  const { signUp, signIn } = useAuth();

  useEffect(() => {
    setMode(isSignIn ? 'signin' : 'signup');
    setError('');
    setFormData({ email: '', password: '', name: '', organization: '' });
  }, [isSignIn, isOpen]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const userData = {
          email: formData.email,
          password: formData.password,
          type: selectedType,
          name: selectedType === 'individual' ? formData.name : (formData.organization || ''),
          organization: (selectedType === 'nonprofit' || selectedType === 'institution') ? formData.organization : null,
        };

        const result = await signUp(userData);
        if (result.success) {
          if (onSuccess) onSuccess();
        } else {
          setError(result.error || 'Sign up failed. Please try again.');
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          if (onSuccess) onSuccess();
        } else {
          setError(result.error || 'Sign in failed. Please check your credentials.');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <h2>{mode === 'signin' ? 'Welcome Back' : 'Join Karm'}</h2>
          <p>{mode === 'signin' ? 'Sign in to continue your journey' : 'Choose how you want to make an impact'}</p>
        </div>

        {mode === 'signup' && (
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
        )}

        {error && (
          <div className="error-message" style={{ 
            padding: 'var(--spacing-sm)', 
            background: 'rgba(255, 0, 0, 0.1)', 
            color: '#ff4444', 
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-md)',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form className="signin-form" onSubmit={handleSubmit}>
          {mode === 'signup' && selectedType === 'individual' && (
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

          {mode === 'signup' && selectedType === 'nonprofit' && (
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

          {mode === 'signup' && selectedType === 'institution' && (
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

          {mode === 'signup' && selectedType === 'nonprofit' && (
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

          {mode === 'signup' && selectedType === 'institution' && (
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

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
          </button>

          {!loading && (
            <p className="form-footer">
              {mode === 'signin' ? (
                <>Don't have an account? <a href="#signup" onClick={(e) => { e.preventDefault(); setMode('signup'); setError(''); }}>Sign Up</a></>
              ) : (
                <>Already have an account? <a href="#signin" onClick={(e) => { e.preventDefault(); setMode('signin'); setError(''); }}>Sign In</a></>
              )}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInModal;

