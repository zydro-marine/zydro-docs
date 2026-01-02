import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, HStack, Button, SimpleGrid, Text, Link, Spinner } from '@chakra-ui/react';
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
      categoryName: category.name,
      categoryPath: category.path
    }))
  );

  const projectsToShow = selectedCategory
    ? allProjects.filter(p => p.categoryPath === selectedCategory)
    : allProjects;

  return (
    <Box className="index-page" width="100%">
      <Box as="header" className="index-header" width="100%" padding="60px 0" backgroundColor="#fafafa">
        <Box className="index-header-content" margin="0 auto" maxWidth="1200px" paddingLeft="30px" paddingRight="30px">
          <Heading as="h1" className="index-title" size="xl" marginBottom="30px">
            Documentation
          </Heading>
          
          <Box className="index-search" marginBottom="30px" maxWidth="600px">
            <SearchBar />
          </Box>

          <HStack className="index-categories" spacing="10px" flexWrap="wrap">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? 'black' : 'styledOutline'}
              size="sm"
            >
              All
            </Button>
            {manifest.categories.map(category => (
              <Button
                key={category.path}
                onClick={() => setSelectedCategory(category.path)}
                variant={selectedCategory === category.path ? 'black' : 'styledOutline'}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </HStack>
        </Box>
      </Box>

      <Box className="index-content" padding="40px" width="100%">
        <Box className="index-grid" margin="0 auto" maxWidth="1200px">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
            {projectsToShow.map(project => {
              const projectName = project.path.split('/').pop();
              const projectPath = `/${project.categoryPath}/${projectName}`;

              const IconComponent = getProjectIcon(project.name);

              return (
                <Link
                  key={project.path}
                  as={RouterLink}
                  to={projectPath}
                  className="index-tile-link"
                  textDecoration="none"
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box className="index-tile" padding="20px" border="1px solid #e0e0e0" borderRadius="8px" backgroundColor="white" height="100%" _hover={{ borderColor: '#0066cc', boxShadow: '0 2px 8px rgba(0,102,204,0.1)' }} transition="all 0.2s">
                    <Text className="index-tile-category" fontSize="12px" textTransform="uppercase" color="rgba(0,0,0,0.5)" marginBottom="10px" fontWeight="600" letterSpacing="0.5px">
                      {project.categoryName}
                    </Text>
                    <HStack className="index-tile-header" spacing="12px" marginBottom="10px" alignItems="flex-start">
                      <Box fontSize="24px" color="#0066cc" flexShrink="0">
                        <IconComponent className="index-tile-icon" />
                      </Box>
                      <Heading as="h2" className="index-tile-title" size="md" color="black">
                        {project.name}
                      </Heading>
                    </HStack>
                    {project.pages && project.pages.length > 0 && (
                      <Text className="index-tile-meta" fontSize="14px" color="rgba(0,0,0,0.6)">
                        {project.pages.length} {project.pages.length === 1 ? 'page' : 'pages'}
                      </Text>
                    )}
                  </Box>
                </Link>
              );
            })}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

export default IndexPage;
