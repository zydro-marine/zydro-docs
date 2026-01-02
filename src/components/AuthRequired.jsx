import { useAuth } from '../contexts/AuthContext';
import './AuthRequired.scss';

function AuthRequired({ onLogin }) {
  const { login } = useAuth();

  const handleLogin = () => {
    login({ name: 'User', email: 'user@example.com' });
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="auth-required">
      <div className="auth-required-card">
        <h2 className="auth-required-title">
          Authentication Required
        </h2>
        <p className="auth-required-message">
          This page requires authentication to access. Please sign in to continue.
        </p>
        <button
          onClick={handleLogin}
          className="auth-required-button"
        >
          Sign In
        </button>
        <p className="auth-required-note">
          Note: This is a demo authentication. In production, integrate with your auth system.
        </p>
      </div>
    </div>
  );
}

export default AuthRequired;
