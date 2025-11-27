import { useState } from 'react';
import { FiImage, FiTag, FiSmile } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../utils/storage';
import { useToast } from '../Toast/ToastContainer';
import './PostComposer.css';

const PostComposer = ({ onPostCreated }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const posts = storage.get('posts') || [];
    const newPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      content: content.trim(),
      category: null,
      location: user.location || 'Global',
      images: [],
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString()
    };

    posts.unshift(newPost);
    storage.set('posts', posts);

    setContent('');
    setIsExpanded(false);
    showToast('Post created successfully!', 'success');
    
    if (onPostCreated) onPostCreated();
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <div className="post-composer">
      <form onSubmit={handleSubmit}>
        <div className="composer-header">
          <div className="composer-avatar">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">{getInitials(user?.name)}</div>
            )}
          </div>
          <textarea
            className="composer-input"
            placeholder="Share what's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            rows={isExpanded ? 4 : 1}
          />
        </div>
        
        {isExpanded && (
          <div className="composer-footer">
            <div className="composer-actions">
              <button type="button" className="action-button" title="Add image">
                <FiImage />
              </button>
              <button type="button" className="action-button" title="Add tag">
                <FiTag />
              </button>
              <button type="button" className="action-button" title="Add emoji">
                <FiSmile />
              </button>
            </div>
            <div className="composer-submit">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={!content.trim()}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostComposer;

