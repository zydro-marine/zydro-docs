import { Box, HStack, Link, Text } from '@chakra-ui/react';
import './Footer.scss';

function Footer() {
  return (
    <Box as="footer" className="footer" width="100%">
      <Box className="footer-content" margin="0 auto" maxWidth="1200px" paddingLeft="30px" paddingRight="30px" display="flex" flexDir="row" justifyContent="space-between" alignItems="center" paddingTop="20px" paddingBottom="20px">
        <Text className="footer-copyright" fontSize="14px" color="rgba(0,0,0,0.6)">
          © {new Date().getFullYear()} Zydro Documentation
        </Text>
        <HStack className="footer-links" spacing="20px">
          <Link href="#" className="footer-link" fontSize="14px" color="rgba(0,0,0,0.6)" _hover={{ color: 'black', textDecoration: 'none' }}>
            About
          </Link>
          <Link href="#" className="footer-link" fontSize="14px" color="rgba(0,0,0,0.6)" _hover={{ color: 'black', textDecoration: 'none' }}>
            Contact
          </Link>
          <Link href="#" className="footer-link" fontSize="14px" color="rgba(0,0,0,0.6)" _hover={{ color: 'black', textDecoration: 'none' }}>
            Privacy
          </Link>
        </HStack>
      </Box>
    </Box>
  );
}

export default Footer;
