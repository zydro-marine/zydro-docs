import { useParams, Redirect } from 'react-router-dom';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import MarkdownPage from '../components/MarkdownPage';
import './ProjectPage.scss';

function ProjectPage({ manifest }) {
  const { category, project } = useParams();

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
      <Box padding="40px">
        <Heading as="h2" size="lg">Category not found</Heading>
      </Box>
    );
  }

  const projectData = categoryData.projects.find(proj => {
    const projectName = proj.path.split('/').pop();
    return projectName === project;
  });

  if (!projectData) {
    return (
      <Box padding="40px">
        <Heading as="h2" size="lg">Project not found</Heading>
      </Box>
    );
  }

  if (projectData.indexFile) {
    return <MarkdownPage file={projectData.indexFile} />;
  }

  const firstPage = projectData.pages && projectData.pages.length > 0
    ? projectData.pages[0]
    : null;

  if (firstPage) {
    const pageName = firstPage.path.split('/').pop();
    return <Redirect to={`/${category}/${project}/${pageName}`} />;
  }

  return (
    <Box padding="40px">
      <Heading as="h2" size="lg">{projectData.displayName || projectData.name}</Heading>
      <Text marginTop="10px">No content available for this project.</Text>
    </Box>
  );
}

export default ProjectPage;
