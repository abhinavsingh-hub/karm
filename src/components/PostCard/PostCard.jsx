import { useState } from 'react';
import { FiThumbsUp, FiMessageCircle, FiShare2, FiMoreVertical } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { storage } from '../../utils/storage';
import { getMockUserById } from '../../utils/mockData';
import './PostCard.css';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?.id) || false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showMenu, setShowMenu] = useState(false);

  const postUser = getMockUserById(post.userId);
  const timeAgo = getTimeAgo(post.createdAt);

  const handleLike = () => {
    const posts = storage.get('posts') || [];
    const postIndex = posts.findIndex(p => p.id === post.id);
    
    if (postIndex !== -1) {
      const currentLikes = posts[postIndex].likes || [];
      const newLikes = isLiked
        ? currentLikes.filter(id => id !== user?.id)
        : [...currentLikes, user?.id];
      
      posts[postIndex].likes = newLikes;
      storage.set('posts', posts);
      
      setIsLiked(!isLiked);
      setLikeCount(newLikes.length);
      
      if (onUpdate) onUpdate();
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {postUser?.profilePicture ? (
              <img src={postUser.profilePicture} alt={postUser?.name} />
            ) : (
              <div className="avatar-placeholder">{getInitials(postUser?.name)}</div>
            )}
          </div>
          <div className="author-info">
            <div className="author-name">{postUser?.name || 'Unknown User'}</div>
            <div className="post-meta">
              <span className="post-location">{post.location || 'Global'}</span>
              <span className="post-time">{timeAgo}</span>
            </div>
          </div>
        </div>
        <div className="post-actions-menu">
          <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {post.category && (
        <div className="post-category">{post.category}</div>
      )}

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {post.images && post.images.length > 0 && (
        <div className="post-images">
          {post.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Post image ${idx + 1}`} />
          ))}
        </div>
      )}

      <div className="post-footer">
        <button 
          className={`post-action ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <FiThumbsUp />
          <span>{likeCount}</span>
        </button>
        <button className="post-action">
          <FiMessageCircle />
          <span>{post.comments?.length || 0}</span>
        </button>
        <button className="post-action">
          <FiShare2 />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

const getTimeAgo = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 604800)}w ago`;
};

export default PostCard;

