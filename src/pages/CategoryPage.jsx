import { useParams, Navigate } from 'react-router-dom';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

function CategoryPage({ manifest }) {
  const { category } = useParams();

  if (!manifest || !manifest.categories) {
    return (
      <Box display="flex" justifyContent="center" padding="40px">
        <Spinner />
      </Box>
    );
  }

  const categoryData = manifest.categories.find(cat => cat.path === category);

  if (!categoryData) {
    return (
      <Box className="category-error" padding="40px">
        <Heading as="h2" size="lg">Category not found</Heading>
      </Box>
    );
  }

  // Find the first page in the first project
  if (categoryData.projects && categoryData.projects.length > 0) {
    const firstProject = categoryData.projects[0];
    const projectName = firstProject.path.split('/').pop();
    
    // If project has an index file, go to project page
    if (firstProject.indexFile) {
      return <Navigate to={`/${category}/${projectName}`} replace />;
    }
    
    // Otherwise, go to first page in the project
    if (firstProject.pages && firstProject.pages.length > 0) {
      const firstPage = firstProject.pages[0];
      const pageName = firstPage.path.split('/').pop();
      return <Navigate to={`/${category}/${projectName}/${pageName}`} replace />;
    }
    
    // If project has no pages, go to project page (will handle error there)
    return <Navigate to={`/${category}/${projectName}`} replace />;
  }

  return (
    <Box className="category-error" padding="40px">
      <Heading as="h2" size="lg">Category not found</Heading>
      <Text marginTop="10px">No projects found in this category.</Text>
    </Box>
  );
}

export default CategoryPage;
