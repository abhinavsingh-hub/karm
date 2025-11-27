import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import PostCard from '../components/PostCard/PostCard';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { getMockUserById } from '../utils/mockData';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './ProfilePage.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = () => {
    const user = userId ? getMockUserById(userId) : currentUser;
    const allPosts = storage.get('posts') || [];
    const userPosts = allPosts.filter(p => p.userId === user?.id);

    setProfileUser(user);
    setPosts(userPosts);
    setLoading(false);
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-loading">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-not-found">User not found</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-cover" />
          <div className="profile-info">
            <div className="profile-avatar">
              {profileUser.profilePicture ? (
                <img src={profileUser.profilePicture} alt={profileUser.name} />
              ) : (
                <div className="avatar-large">{getInitials(profileUser.name)}</div>
              )}
            </div>
            <div className="profile-details">
              <h1>{profileUser.name}</h1>
              <p className="profile-bio">{profileUser.bio || 'No bio yet'}</p>
              <div className="profile-meta">
                <span>{profileUser.location || 'Global'}</span>
                <span>•</span>
                <span>{profileUser.type}</span>
              </div>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">{profileUser.impact?.posts || 0}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{profileUser.impact?.campaigns || 0}</span>
                  <span className="stat-label">Campaigns</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{profileUser.impact?.connections || 0}</span>
                  <span className="stat-label">Connections</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-posts">
            <h2>Posts</h2>
            {posts.length === 0 ? (
              <p className="no-posts">No posts yet</p>
            ) : (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

