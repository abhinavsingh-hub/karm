import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`loading-spinner ${size} ${className}`}>
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;

