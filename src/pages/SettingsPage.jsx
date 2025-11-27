import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './SettingsPage.css';

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="settings-page">
      <Navbar />
      <div className="settings-container">
        <h1>Settings</h1>

        <div className="settings-section">
          <h2>Profile Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="save-button">Save Changes</button>
          </form>
        </div>

        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="theme-toggle-section">
            <span>Theme</span>
            <button onClick={toggleTheme} className="theme-button">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

