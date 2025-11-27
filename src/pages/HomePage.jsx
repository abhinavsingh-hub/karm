import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Feed from '../components/Feed/Feed';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { generateMockCampaigns, generateMockUsers, getMockUserById } from '../utils/mockData';
import './HomePage.css';

const HomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    connections: 0,
    campaigns: 0,
    impact: 0
  });
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [trendingCampaigns, setTrendingCampaigns] = useState([]);

  useEffect(() => {
    // Initialize data if needed
    if (!storage.get('users')) {
      const mockUsers = generateMockUsers();
      storage.set('users', mockUsers);
    }
    if (!storage.get('campaigns')) {
      const mockCampaigns = generateMockCampaigns();
      storage.set('campaigns', mockCampaigns);
    }

    loadStats();
    loadSuggestedConnections();
    loadTrendingCampaigns();
  }, [user]);

  const loadStats = () => {
    if (!user) return;
    
    const userConnections = user.connections?.length || 0;
    const userCampaigns = user.campaigns?.length || 0;
    const userImpact = user.impact?.upvotes || 0;

    setStats({
      connections: userConnections,
      campaigns: userCampaigns,
      impact: userImpact
    });
  };

  const loadSuggestedConnections = () => {
    const users = storage.get('users') || [];
    const otherUsers = users.filter(u => 
      u.id !== user?.id && 
      !user?.connections?.includes(u.id)
    );
    
    setSuggestedConnections(otherUsers.slice(0, 5));
  };

  const loadTrendingCampaigns = () => {
    const campaigns = storage.get('campaigns') || [];
    const sorted = [...campaigns]
      .sort((a, b) => (b.participants?.length || 0) - (a.participants?.length || 0))
      .slice(0, 5);
    
    setTrendingCampaigns(sorted);
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-container">
        <aside className="home-sidebar left">
          <div className="sidebar-card">
            <h3>Quick Stats</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Connections</span>
                <span className="stat-value">{stats.connections}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Campaigns</span>
                <span className="stat-value">{stats.campaigns}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Impact</span>
                <span className="stat-value">{stats.impact}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>Suggested Connections</h3>
            <div className="suggestions-list">
              {suggestedConnections.map(suggestedUser => (
                <div key={suggestedUser.id} className="suggestion-item">
                  <div className="suggestion-avatar">
                    {suggestedUser.profilePicture ? (
                      <img src={suggestedUser.profilePicture} alt={suggestedUser.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {getInitials(suggestedUser.name)}
                      </div>
                    )}
                  </div>
                  <div className="suggestion-info">
                    <div className="suggestion-name">{suggestedUser.name}</div>
                    <div className="suggestion-location">{suggestedUser.location}</div>
                  </div>
                  <button className="connect-button">Connect</button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="home-main">
          <Feed />
        </main>

        <aside className="home-sidebar right">
          <div className="sidebar-card">
            <h3>Trending Campaigns</h3>
            <div className="campaigns-list">
              {trendingCampaigns.map(campaign => (
                <div key={campaign.id} className="campaign-item">
                  <div className="campaign-title">{campaign.title}</div>
                  <div className="campaign-org">{campaign.organizationName}</div>
                  <div className="campaign-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(campaign.current / campaign.goal) * 100}%` }}
                      />
                    </div>
                    <span className="progress-text">
                      {Math.round((campaign.current / campaign.goal) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;

