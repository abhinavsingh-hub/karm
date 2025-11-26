import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmptyState from '../components/EmptyState/EmptyState';
import { FiUsers } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { generateMockUsers } from '../utils/mockData';
import './ConnectionsPage.css';

const ConnectionsPage = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    loadConnections();
  }, [user]);

  const loadConnections = () => {
    const users = storage.get('users') || [];
    if (users.length === 0) {
      const mockUsers = generateMockUsers();
      storage.set('users', mockUsers);
      setSuggested(mockUsers.filter(u => u.id !== user?.id).slice(0, 10));
    } else {
      const userConnections = users.filter(u => user?.connections?.includes(u.id));
      const suggestedUsers = users.filter(u => 
        u.id !== user?.id && 
        !user?.connections?.includes(u.id)
      );
      setConnections(userConnections);
      setSuggested(suggestedUsers.slice(0, 10));
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <div className="connections-page">
      <Navbar />
      <div className="connections-container">
        <h1>My Connections</h1>
        {connections.length === 0 ? (
          <EmptyState
            icon={FiUsers}
            title="No connections yet"
            message="Start connecting with people and organizations!"
          />
        ) : (
          <div className="connections-grid">
            {connections.map(conn => (
              <div key={conn.id} className="connection-card">
                <div className="connection-avatar">
                  {conn.profilePicture ? (
                    <img src={conn.profilePicture} alt={conn.name} />
                  ) : (
                    <div className="avatar-placeholder">{getInitials(conn.name)}</div>
                  )}
                </div>
                <div className="connection-name">{conn.name}</div>
                <div className="connection-type">{conn.type}</div>
                <div className="connection-location">{conn.location}</div>
              </div>
            ))}
          </div>
        )}

        <h2 className="section-title">Suggested Connections</h2>
        <div className="connections-grid">
          {suggested.map(user => (
            <div key={user.id} className="connection-card">
              <div className="connection-avatar">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} />
                ) : (
                  <div className="avatar-placeholder">{getInitials(user.name)}</div>
                )}
              </div>
              <div className="connection-name">{user.name}</div>
              <div className="connection-type">{user.type}</div>
              <div className="connection-location">{user.location}</div>
              <button className="connect-button">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;

