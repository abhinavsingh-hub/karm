import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FiHome, 
  FiUsers, 
  FiBriefcase, 
  FiMessageCircle, 
  FiBell, 
  FiUser,
  FiSearch,
  FiLogOut,
  FiSettings,
  FiCompass
} from 'react-icons/fi';
import { storage } from '../../utils/storage';
import { generateMockNotifications } from '../../utils/mockData';
import './Navbar.css';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications
    if (user) {
      const userNotifications = storage.get(`notifications_${user.id}`) || generateMockNotifications(user.id);
      setNotifications(userNotifications);
      setUnreadCount(userNotifications.filter(n => !n.read).length);
      storage.set(`notifications_${user.id}`, userNotifications);
    }
  }, [user]);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { icon: FiHome, label: 'Home', path: '/home' },
    { icon: FiUsers, label: 'Connections', path: '/connections' },
    { icon: FiBriefcase, label: 'Campaigns', path: '/campaigns' },
    { icon: FiCompass, label: 'Discover', path: '/discover' },
    { icon: FiMessageCircle, label: 'Messages', path: '/messages' },
    { icon: FiBell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <span className="logo-text">Karm</span>
          <span className="logo-tagline">For Humanity</span>
        </Link>

        <div className="navbar-search">
          <form onSubmit={handleSearch} className="search-form">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search organizations, campaigns, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearch(true)}
              className="search-input"
            />
            {showSearch && searchQuery && (
              <button type="submit" className="search-submit">Search</button>
            )}
          </form>
        </div>

        <div className="navbar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const showBadge = item.path === '/notifications' && unreadCount > 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon className="nav-icon" />
                {showBadge && <span className="nav-badge">{unreadCount}</span>}
              </Link>
            );
          })}

          <div className="nav-user-menu">
            <button
              className="nav-user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title="Profile"
            >
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} className="user-avatar" />
              ) : (
                <div className="user-avatar-placeholder">
                  {getInitials(user?.name || 'U')}
                </div>
              )}
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-dropdown-header">
                  <div className="user-dropdown-avatar">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt={user.name} />
                    ) : (
                      <div>{getInitials(user?.name || 'U')}</div>
                    )}
                  </div>
                  <div className="user-dropdown-info">
                    <div className="user-dropdown-name">{user?.name}</div>
                    <div className="user-dropdown-email">{user?.email}</div>
                  </div>
                </div>
                <div className="user-dropdown-divider" />
                <Link
                  to={`/profile/${user?.id}`}
                  className="user-dropdown-item"
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiUser className="dropdown-icon" />
                  View Profile
                </Link>
                <Link
                  to="/settings"
                  className="user-dropdown-item"
                  onClick={() => setShowUserMenu(false)}
                >
                  <FiSettings className="dropdown-icon" />
                  Settings
                </Link>
                <div className="user-dropdown-divider" />
                <button
                  className="user-dropdown-item sign-out"
                  onClick={handleSignOut}
                >
                  <FiLogOut className="dropdown-icon" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div className="dropdown-overlay" onClick={() => setShowUserMenu(false)} />
      )}
    </nav>
  );
};

export default Navbar;

