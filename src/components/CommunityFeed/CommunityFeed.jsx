import { FiThumbsUp, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import { observeElements } from '../../utils/animations';
import { useEffect } from 'react';
import './CommunityFeed.css';

const CommunityFeed = () => {
  useEffect(() => {
    observeElements('.feed-card', {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });
  }, []);

  const posts = [
    {
      id: 1,
      title: 'Clean-Up Drive at IIT Delhi',
      author: 'Rahul Sharma',
      avatar: 'RS',
      location: 'IIT Delhi',
      upvotes: 342,
      comments: 28,
      category: 'Environment',
      timeAgo: '2 hours ago',
    },
    {
      id: 2,
      title: 'Animal Rescue Mission',
      author: 'Priya Patel',
      avatar: 'PP',
      location: 'Mumbai',
      upvotes: 521,
      comments: 45,
      category: 'Animal Welfare',
      timeAgo: '5 hours ago',
    },
    {
      id: 3,
      title: 'College Food Donation Drive',
      author: 'Amit Kumar',
      avatar: 'AK',
      location: 'Delhi University',
      upvotes: 289,
      comments: 19,
      category: 'Food Connect',
      timeAgo: '1 day ago',
    },
    {
      id: 4,
      title: 'Teaching Underprivileged Kids',
      author: 'Sneha Reddy',
      avatar: 'SR',
      location: 'Hyderabad',
      upvotes: 456,
      comments: 32,
      category: 'Education',
      timeAgo: '1 day ago',
    },
    {
      id: 5,
      title: 'Tree Plantation Campaign',
      author: 'Vikram Singh',
      avatar: 'VS',
      location: 'Bangalore',
      upvotes: 378,
      comments: 24,
      category: 'Environment',
      timeAgo: '2 days ago',
    },
    {
      id: 6,
      title: 'Blood Donation Camp',
      author: 'Anjali Mehta',
      avatar: 'AM',
      location: 'Pune',
      upvotes: 612,
      comments: 67,
      category: 'Health',
      timeAgo: '3 days ago',
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Environment: 'var(--accent-turquoise)',
      'Animal Welfare': 'var(--accent-amber)',
      'Food Connect': 'var(--accent-indigo)',
      Education: 'var(--accent-turquoise)',
      Health: 'var(--accent-amber)',
    };
    return colors[category] || 'var(--accent-turquoise)';
  };

  return (
    <section className="community-feed section" id="community">
      <div className="container">
        <div className="section-header">
          <h2>Community Feed</h2>
          <p>See what our community is doing to make a difference</p>
        </div>

        <div className="feed-grid">
          {posts.map((post) => (
            <div
              key={post.id}
              className="feed-card"
              style={{ '--category-color': getCategoryColor(post.category) }}
            >
              <div className="card-header">
                <div className="author-info">
                  <div className="avatar" style={{ '--avatar-bg': getCategoryColor(post.category) }}>
                    {post.avatar}
                  </div>
                  <div className="author-details">
                    <div className="author-name">{post.author}</div>
                    <div className="post-meta">
                      <span className="location">{post.location}</span>
                      <span className="time">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <div className="category-badge">{post.category}</div>
              </div>

              <h3 className="post-title">{post.title}</h3>

              <div className="card-actions">
                <button className="action-btn upvote">
                  <FiThumbsUp />
                  <span>{post.upvotes}</span>
                </button>
                <button className="action-btn comment">
                  <FiMessageCircle />
                  <span>{post.comments}</span>
                </button>
                <button className="action-btn share">
                  <FiShare2 />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityFeed;

