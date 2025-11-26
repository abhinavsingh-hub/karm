import { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import PostComposer from '../PostComposer/PostComposer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import EmptyState from '../EmptyState/EmptyState';
import { FiInbox } from 'react-icons/fi';
import { storage } from '../../utils/storage';
import { generateMockPosts } from '../../utils/mockData';
import { useAuth } from '../../contexts/AuthContext';
import './Feed.css';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    setLoading(true);
    let allPosts = storage.get('posts') || [];
    
    // If no posts exist, generate some mock posts
    if (allPosts.length === 0) {
      const users = storage.get('users') || [];
      users.forEach(u => {
        const userPosts = generateMockPosts(u.id);
        allPosts.push(...userPosts);
      });
      storage.set('posts', allPosts);
    }

    // Sort by date
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setPosts(allPosts);
    setLoading(false);
  };

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
    loadPosts();
  };

  if (loading) {
    return (
      <div className="feed-loading">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="feed">
      <PostComposer onPostCreated={handlePostCreated} />
      
      {posts.length === 0 ? (
        <EmptyState
          icon={FiInbox}
          title="No posts yet"
          message="Be the first to share something with the community!"
        />
      ) : (
        <div className="feed-posts">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onUpdate={loadPosts} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;

