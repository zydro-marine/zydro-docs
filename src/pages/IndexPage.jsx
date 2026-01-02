import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, HStack, Button, Stack, Text, Link, Spinner } from '@chakra-ui/react';
import * as TbIcons from 'react-icons/tb';
import SearchBar from '../components/SearchBar';
import './IndexPage.scss';

function getProjectIcon(projectName) {
  const iconMap = {
    'raspberry-pi': TbIcons.TbCpu,
    'compute-module': TbIcons.TbChip,
    'raspberry-pi-os': TbIcons.TbBrandLinux,
    'raspberry-pi-connect': TbIcons.TbPlugConnected,
  };

  const normalizedName = projectName.toLowerCase().replace(/\s+/g, '-');
  return iconMap[normalizedName] || TbIcons.TbFileText;
}

function IndexPage({ manifest }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!manifest || !manifest.categories) {
    return (
      <Box display="flex" justifyContent="center" padding="40px">
        <Spinner />
      </Box>
    );
  }

  const allProjects = manifest.categories.flatMap(category =>
    category.projects.map(project => ({
      ...project,
      categoryName: category.displayName || category.name,
      categoryPath: category.path
    }))
  );

  const projectsToShow = selectedCategory
    ? allProjects.filter(p => p.categoryPath === selectedCategory)
    : allProjects;

  return (
    <Box className="index-page" width="100%">
      <Box as="header" className="index-header" width="100%" paddingTop="60px" paddingBottom="0" backgroundColor="#fafafa">
        <Box className="index-header-content" margin="0 auto" maxWidth="1200px" paddingLeft="30px" paddingRight="30px" paddingBottom="0">
          <Heading as="h1" className="index-title" size="xl" marginBottom="30px">
            Documentation
          </Heading>
          
          <Box className="index-search" marginBottom="30px" maxWidth="600px">
            <SearchBar />
          </Box>

          <HStack className="index-categories" spacing="0" flexWrap="wrap" borderBottom="3px solid #e0e0e0" marginBottom="0">
            <Button
              onClick={() => setSelectedCategory(null)}
              className={`index-category-button ${selectedCategory === null ? 'active' : ''}`}
              borderRadius="0"
              borderTopRadius="6px"
              padding="16px 24px"
              fontSize="16px"
              fontWeight="500"
              height="auto"
              backgroundColor={selectedCategory === null ? 'transparent' : 'transparent'}
              color={selectedCategory === null ? '#0066cc' : 'rgba(0,0,0,0.7)'}
              border="none"
              borderBottom={selectedCategory === null ? '3px solid #0066cc' : '3px solid transparent'}
              marginBottom="-3px"
              _hover={{
                backgroundColor: 'transparent',
                color: '#0066cc',
                borderBottom: '3px solid rgba(0,102,204,0.5)'
              }}
            >
              All
            </Button>
            {manifest.categories.map(category => (
              <Button
                key={category.path}
                onClick={() => setSelectedCategory(category.path)}
                className={`index-category-button ${selectedCategory === category.path ? 'active' : ''}`}
                borderRadius="0"
                borderTopRadius="6px"
                padding="16px 24px"
                fontSize="16px"
                fontWeight="500"
                height="auto"
                backgroundColor="transparent"
                color={selectedCategory === category.path ? '#0066cc' : 'rgba(0,0,0,0.7)'}
                border="none"
                borderBottom={selectedCategory === category.path ? '3px solid #0066cc' : '3px solid transparent'}
                marginBottom="-3px"
                _hover={{
                  backgroundColor: 'transparent',
                  color: '#0066cc',
                  borderBottom: '3px solid rgba(0,102,204,0.5)'
                }}
              >
                {category.displayName || category.name}
              </Button>
            ))}
          </HStack>
        </Box>
      </Box>

      <Box className="index-content" padding="40px" width="100%">
          <Stack flex="1" direction="row" spacing="20px" flexWrap="wrap" shouldWrapChildren>
            {projectsToShow.map(project => {
              const projectName = project.path.split('/').pop();
              const projectPath = `/${project.categoryPath}/${projectName}`;

              const IconComponent = getProjectIcon(project.name);

              return (
                <Link
                minW="300px"
                  key={project.path}
                  as={RouterLink}
                  to={projectPath}
                  className="index-tile-link"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box className="index-tile" padding="20px" border="1px solid #e0e0e0" borderRadius="8px" backgroundColor="white" minHeight="150px" display="flex" flexDirection="column" _hover={{ borderColor: '#0066cc', boxShadow: '0 2px 8px rgba(0,102,204,0.1)' }} transition="all 0.2s">
                    <Text className="index-tile-category" fontSize="12px" textTransform="uppercase" color="rgba(0,0,0,0.5)" marginBottom="10px" fontWeight="600" letterSpacing="0.5px" overflowWrap="break-word" wordBreak="break-word">
                      {project.categoryName}
                    </Text>
                    <HStack className="index-tile-header" spacing="12px" marginBottom="10px" alignItems="flex-start" flex="1">
                      <Box fontSize="24px" color="#0066cc" flexShrink="0" marginTop="2px">
                        <IconComponent className="index-tile-icon" />
                      </Box>
                      <Heading as="h2" className="index-tile-title" size="md" color="black" overflowWrap="break-word" wordBreak="break-word" lineHeight="1.4">
                        {project.displayName || project.name}
                      </Heading>
                    </HStack>
                    {project.pages && project.pages.length > 0 && (
                      <Text className="index-tile-meta" fontSize="14px" color="rgba(0,0,0,0.6)" marginTop="auto" paddingTop="10px">
                        {project.pages.length} {project.pages.length === 1 ? 'page' : 'pages'}
                      </Text>
                    )}
                  </Box>
                </Link>
              );
            })}
          </Stack>
        </Box>
    </Box>
  );
}

export default IndexPage;
