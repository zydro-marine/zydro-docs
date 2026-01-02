import { createContext, useContext, useState, useEffect } from 'react';
import { UserManager } from 'oidc-client-ts';
import { oidcConfig } from '../config/oidc';

const AuthContext = createContext(null);

const userManager = new UserManager(oidcConfig);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    userManager.getUser().then((user) => {
      if (user && !user.expired) {
        setIsAuthenticated(true);
        setUser({
          name: user.profile.name || user.profile.preferred_username || user.profile.email,
          email: user.profile.email,
          profile: user.profile
        });
      }
      setIsLoading(false);
    }).catch((err) => {
      console.error('Error getting user:', err);
      setIsLoading(false);
    });

    // Listen for user loaded events
    userManager.events.addUserLoaded((user) => {
      setIsAuthenticated(true);
      setUser({
        name: user.profile.name || user.profile.preferred_username || user.profile.email,
        email: user.profile.email,
        profile: user.profile
      });
    });

    // Listen for user unloaded events (logout)
    userManager.events.addUserUnloaded(() => {
      setIsAuthenticated(false);
      setUser(null);
    });

    // Listen for access token expiring
    userManager.events.addAccessTokenExpiring(() => {
      // Silent renew should handle this automatically
      console.log('Access token expiring, attempting silent renew...');
    });

    // Listen for access token expired
    userManager.events.addAccessTokenExpired(() => {
      console.log('Access token expired');
      setIsAuthenticated(false);
      setUser(null);
    });

    // Cleanup
    return () => {
      userManager.events.removeUserLoaded();
      userManager.events.removeUserUnloaded();
      userManager.events.removeAccessTokenExpiring();
      userManager.events.removeAccessTokenExpired();
    };
  }, []);

  const login = async () => {
    try {
      await userManager.signinRedirect();
    } catch (err) {
      console.error('Error during login:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await userManager.signoutRedirect();
    } catch (err) {
      console.error('Error during logout:', err);
      // Even if redirect fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleCallback = async () => {
    try {
      const user = await userManager.signinRedirectCallback();
      setIsAuthenticated(true);
      setUser({
        name: user.profile.name || user.profile.preferred_username || user.profile.email,
        email: user.profile.email,
        profile: user.profile
      });
      return user;
    } catch (err) {
      console.error('Error handling callback:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
      handleCallback
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
