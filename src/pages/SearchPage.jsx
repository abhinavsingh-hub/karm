import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import EmptyState from '../components/EmptyState/EmptyState';
import { FiSearch } from 'react-icons/fi';
import { storage } from '../utils/storage';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({ users: [], campaigns: [], organizations: [] });
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = (searchQuery) => {
    const users = storage.get('users') || [];
    const campaigns = storage.get('campaigns') || [];
    const lowerQuery = searchQuery.toLowerCase();

    const userResults = users.filter(u => 
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery)
    );

    const campaignResults = campaigns.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery)
    );

    const orgResults = users.filter(u =>
      (u.type === 'nonprofit' || u.type === 'institution') &&
      (u.name.toLowerCase().includes(lowerQuery) ||
       u.organization?.toLowerCase().includes(lowerQuery))
    );

    setResults({
      users: userResults,
      campaigns: campaignResults,
      organizations: orgResults
    });
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-container">
        <div className="search-header">
          <h1>Search Results</h1>
          <p className="search-query">"{query}"</p>
        </div>

        <div className="search-tabs">
          <button
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All ({results.users.length + results.campaigns.length + results.organizations.length})
          </button>
          <button
            className={`tab ${activeTab === 'people' ? 'active' : ''}`}
            onClick={() => setActiveTab('people')}
          >
            People ({results.users.length})
          </button>
          <button
            className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
            onClick={() => setActiveTab('campaigns')}
          >
            Campaigns ({results.campaigns.length})
          </button>
          <button
            className={`tab ${activeTab === 'organizations' ? 'active' : ''}`}
            onClick={() => setActiveTab('organizations')}
          >
            Organizations ({results.organizations.length})
          </button>
        </div>

        <div className="search-results">
          {(activeTab === 'all' || activeTab === 'people') && (
            <div className="results-section">
              <h2>People</h2>
              {results.users.length === 0 ? (
                <p className="no-results">No people found</p>
              ) : (
                <div className="results-grid">
                  {results.users.map(user => (
                    <div key={user.id} className="result-card">
                      <div className="result-avatar">
                        {user.profilePicture ? (
                          <img src={user.profilePicture} alt={user.name} />
                        ) : (
                          <div className="avatar-placeholder">{getInitials(user.name)}</div>
                        )}
                      </div>
                      <div className="result-name">{user.name}</div>
                      <div className="result-type">{user.type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'campaigns') && (
            <div className="results-section">
              <h2>Campaigns</h2>
              {results.campaigns.length === 0 ? (
                <p className="no-results">No campaigns found</p>
              ) : (
                <div className="results-grid">
                  {results.campaigns.map(campaign => (
                    <div key={campaign.id} className="result-card">
                      <div className="result-title">{campaign.title}</div>
                      <div className="result-description">{campaign.description}</div>
                      <div className="result-org">{campaign.organizationName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'organizations') && (
            <div className="results-section">
              <h2>Organizations</h2>
              {results.organizations.length === 0 ? (
                <p className="no-results">No organizations found</p>
              ) : (
                <div className="results-grid">
                  {results.organizations.map(org => (
                    <div key={org.id} className="result-card">
                      <div className="result-avatar">
                        {getInitials(org.name)}
                      </div>
                      <div className="result-name">{org.name}</div>
                      <div className="result-type">{org.type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

