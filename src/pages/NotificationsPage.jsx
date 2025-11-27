import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import EmptyState from '../components/EmptyState/EmptyState';
import { FiBell } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../utils/storage';
import { generateMockNotifications } from '../utils/mockData';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const loadNotifications = () => {
    if (!user) return;
    let userNotifications = storage.get(`notifications_${user.id}`) || [];
    if (userNotifications.length === 0) {
      userNotifications = generateMockNotifications(user.id);
      storage.set(`notifications_${user.id}`, userNotifications);
    }
    setNotifications(userNotifications);
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    if (user) {
      storage.set(`notifications_${user.id}`, updated);
    }
  };

  return (
    <div className="notifications-page">
      <Navbar />
      <div className="notifications-container">
        <h1>Notifications</h1>
        {notifications.length === 0 ? (
          <EmptyState
            icon={FiBell}
            title="No notifications"
            message="You're all caught up!"
          />
        ) : (
          <div className="notifications-list">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`notification-item ${!notif.read ? 'unread' : ''}`}
                onClick={() => !notif.read && markAsRead(notif.id)}
              >
                <div className="notification-icon">
                  <FiBell />
                </div>
                <div className="notification-content">
                  <div className="notification-message">{notif.message}</div>
                  <div className="notification-time">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {!notif.read && <div className="unread-dot" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

