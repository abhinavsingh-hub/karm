// Mock data generation utilities
import { storage } from './storage';

const firstNames = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Vikram', 'Anjali', 'Raj', 'Kavita', 'Arjun', 'Meera'];
const lastNames = ['Sharma', 'Patel', 'Kumar', 'Reddy', 'Singh', 'Mehta', 'Gupta', 'Verma', 'Joshi', 'Malik'];
const organizations = ['Green Earth NGO', 'Help India Foundation', 'Child Care Society', 'Food for All', 'Education First'];
const colleges = ['IIT Delhi', 'Delhi University', 'Mumbai University', 'Bangalore University', 'Hyderabad University'];

const categories = ['Environment', 'Education', 'Health', 'Animal Welfare', 'Food Connect', 'Community'];
const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'];

// Generate random name
const getRandomName = () => {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

// Generate random email
const getRandomEmail = (name) => {
  const username = name.toLowerCase().replace(' ', '.');
  return `${username}@example.com`;
};

// Generate user ID
const generateUserId = () => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initialize and generate mock users
export const generateMockUsers = () => {
  const users = [];

  // Generate Individual users
  for (let i = 0; i < 20; i++) {
    const name = getRandomName();
    users.push({
      id: generateUserId(),
      name,
      email: getRandomEmail(name),
      type: 'individual',
      password: 'password123', // In real app, this would be hashed
      profilePicture: null,
      coverPhoto: null,
      bio: `Passionate about making a difference in ${locations[Math.floor(Math.random() * locations.length)]}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      connections: [],
      posts: [],
      campaigns: [],
      impact: {
        posts: Math.floor(Math.random() * 50),
        campaigns: Math.floor(Math.random() * 10),
        connections: Math.floor(Math.random() * 100),
        upvotes: Math.floor(Math.random() * 500)
      }
    });
  }

  // Generate Non-Profit organizations
  for (let i = 0; i < 10; i++) {
    const orgName = organizations[Math.floor(Math.random() * organizations.length)] + ` ${i > 0 ? i : ''}`;
    users.push({
      id: generateUserId(),
      name: orgName,
      organization: orgName,
      email: getRandomEmail(orgName.replace(/\s+/g, '')),
      type: 'nonprofit',
      password: 'password123',
      profilePicture: null,
      coverPhoto: null,
      bio: `Dedicated to serving the community and making a lasting impact.`,
      location: locations[Math.floor(Math.random() * locations.length)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      connections: [],
      posts: [],
      campaigns: [],
      impact: {
        posts: Math.floor(Math.random() * 100),
        campaigns: Math.floor(Math.random() * 20),
        connections: Math.floor(Math.random() * 500),
        upvotes: Math.floor(Math.random() * 2000)
      }
    });
  }

  // Generate Institutions
  for (let i = 0; i < 5; i++) {
    const collegeName = colleges[Math.floor(Math.random() * colleges.length)];
    users.push({
      id: generateUserId(),
      name: collegeName,
      organization: collegeName,
      email: getRandomEmail(collegeName.replace(/\s+/g, '')),
      type: 'institution',
      password: 'password123',
      profilePicture: null,
      coverPhoto: null,
      bio: `Promoting social responsibility and community engagement.`,
      location: locations[Math.floor(Math.random() * locations.length)],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      connections: [],
      posts: [],
      campaigns: [],
      impact: {
        posts: Math.floor(Math.random() * 150),
        campaigns: Math.floor(Math.random() * 30),
        connections: Math.floor(Math.random() * 1000),
        upvotes: Math.floor(Math.random() * 3000)
      }
    });
  }

  return users;
};

// Get user by ID
export const getMockUserById = (userId) => {
  const users = storage.get('users') || [];
  return users.find(u => u.id === userId);
};

// Generate mock posts
export const generateMockPosts = (userId) => {
  const posts = [];
  const postCount = Math.floor(Math.random() * 10) + 5;

  for (let i = 0; i < postCount; i++) {
    posts.push({
      id: `post_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      content: `This is a meaningful post about ${categories[Math.floor(Math.random() * categories.length)].toLowerCase()}. Together we can make a difference!`,
      category: categories[Math.floor(Math.random() * categories.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      images: [],
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return posts;
};

// Generate mock campaigns
export const generateMockCampaigns = () => {
  const campaigns = [];
  const users = storage.get('users') || [];
  const orgUsers = users.filter(u => u.type === 'nonprofit' || u.type === 'institution');

  for (let i = 0; i < 30; i++) {
    const org = orgUsers[Math.floor(Math.random() * orgUsers.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    campaigns.push({
      id: `campaign_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      title: `${category} Campaign - ${i + 1}`,
      description: `Join us in making a difference through this important ${category.toLowerCase()} initiative. Your support can change lives.`,
      category,
      location: locations[Math.floor(Math.random() * locations.length)],
      organizationId: org.id,
      organizationName: org.name,
      coverImage: null,
      goal: Math.floor(Math.random() * 10000) + 1000,
      current: Math.floor(Math.random() * 8000),
      participants: [],
      volunteers: [],
      status: ['active', 'completed', 'upcoming'][Math.floor(Math.random() * 3)],
      tags: [category, locations[Math.floor(Math.random() * locations.length)]],
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return campaigns;
};

// Generate mock connections
export const generateMockConnections = (userId) => {
  const users = storage.get('users') || [];
  const otherUsers = users.filter(u => u.id !== userId);
  const connectionCount = Math.floor(Math.random() * 15) + 5;
  const connections = [];

  for (let i = 0; i < connectionCount && i < otherUsers.length; i++) {
    const user = otherUsers[Math.floor(Math.random() * otherUsers.length)];
    if (!connections.find(c => c.id === user.id)) {
      connections.push({
        id: user.id,
        name: user.name,
        type: user.type,
        profilePicture: user.profilePicture,
        location: user.location
      });
    }
  }

  return connections;
};

// Generate mock messages
export const generateMockMessages = (currentUserId, otherUserId) => {
  const messages = [];
  const messageCount = Math.floor(Math.random() * 10) + 5;

  for (let i = 0; i < messageCount; i++) {
    const isFromCurrent = Math.random() > 0.5;
    messages.push({
      id: `msg_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      fromId: isFromCurrent ? currentUserId : otherUserId,
      toId: isFromCurrent ? otherUserId : currentUserId,
      content: `This is a message about a potential collaboration or shared interest.`,
      read: i < messageCount - 1, // Last message is unread
      createdAt: new Date(Date.now() - (messageCount - i) * 60 * 60 * 1000).toISOString()
    });
  }

  return messages;
};

// Generate mock notifications
export const generateMockNotifications = (userId) => {
  const notifications = [];
  const types = ['like', 'comment', 'connection_request', 'campaign_update', 'message'];
  
  for (let i = 0; i < 15; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    notifications.push({
      id: `notif_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      message: getNotificationMessage(type),
      read: Math.random() > 0.3,
      relatedId: `item_${i}`,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const getNotificationMessage = (type) => {
  const messages = {
    like: 'liked your post',
    comment: 'commented on your post',
    connection_request: 'sent you a connection request',
    campaign_update: 'updated their campaign',
    message: 'sent you a message'
  };
  return `${getRandomName()} ${messages[type]}`;
};

