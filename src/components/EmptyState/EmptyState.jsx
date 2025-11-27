import { FiInbox, FiUsers, FiMessageCircle, FiBell } from 'react-icons/fi';
import './EmptyState.css';

const EmptyState = ({ 
  icon: Icon = FiInbox, 
  title, 
  message, 
  action,
  actionLabel 
}) => {
  return (
    <div className="empty-state">
      <Icon className="empty-state-icon" />
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-message">{message}</p>}
      {action && actionLabel && (
        <button className="empty-state-action" onClick={action}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

