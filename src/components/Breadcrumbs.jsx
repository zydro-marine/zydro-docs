import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Link, HStack, Text } from '@chakra-ui/react';
import './Breadcrumbs.scss';

function getFirstPagePath(categoryData) {
  if (!categoryData.projects || categoryData.projects.length === 0) {
    return null;
  }

  const firstProject = categoryData.projects[0];
  const projectName = firstProject.path.split('/').pop();
  
  if (firstProject.indexFile) {
    return `/${categoryData.path}/${projectName}`;
  }
  
  if (firstProject.pages && firstProject.pages.length > 0) {
    const firstPage = firstProject.pages[0];
    const pageName = firstPage.path.split('/').pop();
    return `/${categoryData.path}/${projectName}/${pageName}`;
  }
  
  return `/${categoryData.path}/${projectName}`;
}

function Breadcrumbs({ manifest }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  if (!manifest || !manifest.categories || pathParts.length === 0) {
    return null;
  }

  const breadcrumbs = [
    { name: 'Docs', path: '/' }
  ];

  const category = pathParts[0];
  const categoryData = manifest.categories.find(cat => cat.path === category);
  
  if (categoryData) {
    const categoryPath = getFirstPagePath(categoryData);
    if (categoryPath) {
      breadcrumbs.push({
        name: categoryData.name,
        path: categoryPath
      });
    }

    if (pathParts.length > 1) {
      const project = pathParts[1];
      const projectData = categoryData.projects.find(proj => {
        const projectName = proj.path.split('/').pop();
        return projectName === project;
      });

      if (projectData) {
        const projectPath = projectData.indexFile 
          ? `/${category}/${project}`
          : (projectData.pages && projectData.pages.length > 0
              ? `/${category}/${project}/${projectData.pages[0].path.split('/').pop()}`
              : `/${category}/${project}`);
        
        breadcrumbs.push({
          name: projectData.name,
          path: projectPath
        });

        if (pathParts.length > 2) {
          const page = pathParts[2];
          const pageData = projectData.pages.find(p => {
            const pageName = p.path.split('/').pop();
            return pageName === page;
          });

          if (pageData) {
            breadcrumbs.push({
              name: pageData.name,
              path: `/${category}/${project}/${page}`
            });
          }
        }
      }
    }
  }

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Box as="nav" className="breadcrumbs" key={location.pathname} padding="1rem 2rem" backgroundColor="#fafafa" borderBottom="1px solid #e0e0e0" fontSize="0.9rem" width="100%">
      <HStack spacing="0.25rem" display="inline-flex">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <Box key={`${location.pathname}-${index}`} className="breadcrumb-item" display="inline">
              {isLast ? (
                <Text className="breadcrumb-current" color="#333" fontWeight="500" display="inline">
                  {crumb.name}
                </Text>
              ) : (
                <>
                  <Link as={RouterLink} to={crumb.path} className="breadcrumb-link" color="#0066cc" textDecoration="none" _hover={{ textDecoration: 'underline' }} display="inline">
                    {crumb.name}
                  </Link>
                  <Text className="breadcrumb-separator" color="#999" margin="0 0.25rem" display="inline">
                    {' > '}
                  </Text>
                </>
              )}
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}

export default Breadcrumbs;
