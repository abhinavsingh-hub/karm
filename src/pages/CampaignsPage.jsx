import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmptyState from '../components/EmptyState/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { FiBriefcase, FiFilter } from 'react-icons/fi';
import { storage } from '../utils/storage';
import { generateMockCampaigns } from '../utils/mockData';
import './CampaignsPage.css';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    let allCampaigns = storage.get('campaigns') || [];
    if (allCampaigns.length === 0) {
      allCampaigns = generateMockCampaigns();
      storage.set('campaigns', allCampaigns);
    }
    setCampaigns(allCampaigns);
    setLoading(false);
  };

  const filteredCampaigns = filter === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.status === filter);

  return (
    <div className="campaigns-page">
      <Navbar />
      <div className="campaigns-container">
        <div className="campaigns-header">
          <h1>Campaigns</h1>
          <div className="campaigns-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        {loading ? (
          <div className="campaigns-loading">
            <LoadingSpinner size="large" />
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <EmptyState
            icon={FiBriefcase}
            title="No campaigns found"
            message="Create or join campaigns to make an impact!"
          />
        ) : (
          <div className="campaigns-grid">
            {filteredCampaigns.map(campaign => (
              <div key={campaign.id} className="campaign-card">
                <div className="campaign-header">
                  <div className="campaign-category">{campaign.category}</div>
                  <div className={`campaign-status ${campaign.status}`}>{campaign.status}</div>
                </div>
                <h3 className="campaign-title">{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>
                <div className="campaign-org">{campaign.organizationName}</div>
                <div className="campaign-location">{campaign.location}</div>
                <div className="campaign-progress">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>{Math.round((campaign.current / campaign.goal) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min((campaign.current / campaign.goal) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="progress-numbers">
                    <span>${campaign.current.toLocaleString()}</span>
                    <span>of ${campaign.goal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="campaign-button">Join Campaign</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;

