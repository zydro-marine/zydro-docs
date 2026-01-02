import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Link, Spinner } from '@chakra-ui/react';
import './Sidebar.scss';

function Sidebar({ manifest }) {
  const location = useLocation();

  if (!manifest || !manifest.categories) {
    return (
      <Box display="flex" justifyContent="center" padding="20px">
        <Spinner />
      </Box>
    );
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Box as="aside" className="sidebar" width="250px" flexShrink="0" borderRight="1px solid #e0e0e0" backgroundColor="#fafafa" alignSelf="stretch" minHeight="100%" overflowY="auto" overflowX="hidden">
      <Box as="nav" padding="20px">
        <VStack spacing="20px" align="stretch">
          {manifest.categories.map(category => {
            return (
              <Box key={category.path} className="sidebar-category">
                <Text className="sidebar-category-header" fontWeight="600" fontSize="14px" textTransform="uppercase" color="rgba(0,0,0,0.6)" marginBottom="10px" letterSpacing="0.5px">
                  {category.name}
                </Text>
                {category.projects && category.projects.length > 0 && (
                  <VStack spacing="5px" align="stretch" className="sidebar-projects">
                    {category.projects.map(project => {
                      const projectName = project.path.split('/').pop();
                      const projectPath = `/${category.path}/${projectName}`;
                      const isProjectActive = isActive(projectPath);
                      
                      return (
                        <Box key={project.path} className="sidebar-project">
                          <Link
                            as={RouterLink}
                            to={projectPath}
                            className={`sidebar-project-link ${isProjectActive ? 'active' : ''}`}
                            display="block"
                            padding="8px 12px"
                            borderRadius="4px"
                            textDecoration="none"
                            color={isProjectActive ? '#0066cc' : 'rgba(0,0,0,0.8)'}
                            backgroundColor={isProjectActive ? 'rgba(0,102,204,0.1)' : 'transparent'}
                            fontWeight={isProjectActive ? '600' : '400'}
                            _hover={{
                              backgroundColor: isProjectActive ? 'rgba(0,102,204,0.1)' : 'rgba(0,0,0,0.05)',
                              textDecoration: 'none'
                            }}
                          >
                            {project.name}
                          </Link>
                          {isProjectActive && project.pages && project.pages.length > 0 && (
                            <VStack spacing="2px" align="stretch" marginTop="5px" paddingLeft="12px" className="sidebar-pages">
                              {project.pages.map(page => {
                                const pageName = page.path.split('/').pop();
                                const pagePath = `/${category.path}/${projectName}/${pageName}`;
                                const isPageActive = location.pathname === pagePath;
                                
                                return (
                                  <Box key={page.path} className="sidebar-page">
                                    <Link
                                      as={RouterLink}
                                      to={pagePath}
                                      className={`sidebar-page-link ${isPageActive ? 'active' : ''}`}
                                      display="block"
                                      padding="6px 12px"
                                      borderRadius="4px"
                                      textDecoration="none"
                                      fontSize="14px"
                                      color={isPageActive ? '#0066cc' : 'rgba(0,0,0,0.7)'}
                                      backgroundColor={isPageActive ? 'rgba(0,102,204,0.1)' : 'transparent'}
                                      fontWeight={isPageActive ? '600' : '400'}
                                      _hover={{
                                        backgroundColor: isPageActive ? 'rgba(0,102,204,0.1)' : 'rgba(0,0,0,0.05)',
                                        textDecoration: 'none'
                                      }}
                                    >
                                      {page.name}
                                    </Link>
                                  </Box>
                                );
                              })}
                            </VStack>
                          )}
                        </Box>
                      );
                    })}
                  </VStack>
                )}
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}

export default Sidebar;
