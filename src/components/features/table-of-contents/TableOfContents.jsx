import { Box, VStack, Text, Link } from '@chakra-ui/react';
import './TableOfContents.scss';

function TableOfContents({ headings }) {
  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box as="aside" className="table-of-contents" width="250px" flexShrink="0" padding="20px" borderLeft="1px solid #e0e0e0" backgroundColor="#fafafa" position="sticky" top="0" alignSelf="flex-start" maxHeight="100vh" overflowY="auto">
      <Text className="toc-header" fontWeight="600" fontSize="14px" marginBottom="15px" textTransform="uppercase" color="rgba(0,0,0,0.6)" letterSpacing="0.5px">
        Contents
      </Text>
      <Box as="nav" className="toc-nav">
        <VStack spacing="5px" align="stretch" className="toc-list">
          {headings.map((heading) => (
            <Box
              key={heading.id}
              className={`toc-item toc-item-${heading.level}`}
              paddingLeft={heading.level > 1 ? `${(heading.level - 1) * 12}px` : '0'}
            >
              <Link
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className="toc-link"
                fontSize={heading.level === 1 ? '14px' : '13px'}
                fontWeight={heading.level === 1 ? '600' : '400'}
                color="rgba(0,0,0,0.7)"
                textDecoration="none"
                _hover={{
                  color: '#0066cc',
                  textDecoration: 'none'
                }}
                display="block"
                padding="4px 0"
              >
                {heading.text}
              </Link>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

export default TableOfContents;
