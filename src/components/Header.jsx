import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Link, Button, HStack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import './Header.scss';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  return (
    <Box as="header" className="header" width="100%">
      <Box className="header-content" margin="0 auto" maxWidth="1200px" paddingLeft="30px" paddingRight="30px" display="flex" flexDir="row" justifyContent="stretch" alignItems="center" height="100%">
        <Link as={RouterLink} to="/" className="header-link" textDecoration="none" color="black" fontWeight="600">
          Zydro Documentation
        </Link>
        {!isIndexPage && (
          <Box className="header-search" flex="1" marginLeft="20px" marginRight="20px">
            <SearchBar />
          </Box>
        )}
        <Box className="header-auth" display="flex" flexDir="row" alignItems="center" gap="10px">
          {isAuthenticated ? (
            <>
              <Text className="header-user" fontSize="14px">
                {user?.name || 'User'}
              </Text>
              <Button
                onClick={logout}
                className="header-button"
                size="sm"
                variant="styledOutline"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Text className="header-user" fontSize="14px" color="rgba(0,0,0,0.6)">
              Not signed in
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
