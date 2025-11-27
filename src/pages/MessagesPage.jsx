import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmptyState from '../components/EmptyState/EmptyState';
import { FiMessageCircle } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { getMockUserById } from '../utils/mockData';
import './MessagesPage.css';

const MessagesPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadConversations();
  }, [user]);

  const loadConversations = () => {
    // Mock conversations
    const users = storage.get('users') || [];
    const otherUsers = users.filter(u => u.id !== user?.id).slice(0, 5);
    setConversations(otherUsers.map(u => ({
      id: u.id,
      user: u,
      lastMessage: 'Last message preview...',
      unread: Math.random() > 0.5
    })));
  };

  const selectConversation = (conv) => {
    setSelectedConversation(conv);
    // Load messages for this conversation
    setMessages([{
      id: '1',
      fromId: conv.id,
      content: 'Hello! How can we collaborate?',
      createdAt: new Date().toISOString()
    }]);
  };

  return (
    <div className="messages-page">
      <Navbar />
      <div className="messages-container">
        <div className="conversations-sidebar">
          <h2>Messages</h2>
          {conversations.length === 0 ? (
            <EmptyState
              icon={FiMessageCircle}
              title="No messages"
              message="Start a conversation!"
            />
          ) : (
            <div className="conversations-list">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                  onClick={() => selectConversation(conv)}
                >
                  <div className="conversation-avatar">
                    {getInitials(conv.user?.name || 'U')}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-name">{conv.user?.name}</div>
                    <div className="conversation-preview">{conv.lastMessage}</div>
                  </div>
                  {conv.unread && <div className="unread-indicator" />}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="messages-main">
          {selectedConversation ? (
            <div className="chat-container">
              <div className="chat-header">
                <div>{selectedConversation.user?.name}</div>
              </div>
              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} className="message">
                    <div className="message-content">{msg.content}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="chat-input"
                />
                <button className="send-button">Send</button>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={FiMessageCircle}
              title="Select a conversation"
              message="Choose a conversation from the sidebar to start chatting"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
};

export default MessagesPage;

