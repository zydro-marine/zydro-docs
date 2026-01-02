import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';

function CallbackPage() {
  const { handleCallback } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await handleCallback();
        // Redirect to home page after successful authentication
        history.push('/');
      } catch (err) {
        console.error('Error processing OIDC callback:', err);
        // You might want to show an error message here
      }
    };

    processCallback();
  }, [handleCallback, history]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" padding="40px">
      <Spinner size="xl" marginBottom="20px" />
      <Text>Completing sign in...</Text>
    </Box>
  );
}

export default CallbackPage;

