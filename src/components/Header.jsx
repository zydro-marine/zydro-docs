import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import './Header.scss';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-link">
          Zydro Documentation
        </Link>
        {!isIndexPage && (
          <div className="header-search">
            <SearchBar />
          </div>
        )}
        <div className="header-auth">
          {isAuthenticated ? (
            <>
              <span className="header-user">
                {user?.name || 'User'}
              </span>
              <button
                onClick={logout}
                className="header-button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <span className="header-user">
              Not signed in
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
