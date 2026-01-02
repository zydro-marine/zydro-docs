import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
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
    <Box className="auth-required" display="flex" justifyContent="center" alignItems="center" minHeight="400px" padding="40px">
      <Box className="auth-required-card" maxWidth="500px" width="100%" padding="40px" border="1px solid #e0e0e0" borderRadius="8px" backgroundColor="white">
        <VStack spacing="20px" align="stretch">
          <Heading as="h2" className="auth-required-title" size="lg" textAlign="center">
            Authentication Required
          </Heading>
          <Text className="auth-required-message" textAlign="center" color="rgba(0,0,0,0.7)">
            This page requires authentication to access. Please sign in to continue.
          </Text>
          <Button
            onClick={handleLogin}
            className="auth-required-button"
            variant="black"
            width="100%"
          >
            Sign In
          </Button>
          <Text className="auth-required-note" fontSize="12px" textAlign="center" color="rgba(0,0,0,0.5)">
            Note: This is a demo authentication. In production, integrate with your auth system.
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default AuthRequired;
