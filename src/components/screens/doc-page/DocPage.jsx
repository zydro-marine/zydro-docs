import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import MarkdownPage from '../../features/markdown-page/MarkdownPage';
import './DocPage.scss';

function DocPage({ manifest }) {
  const { category, project, page } = useParams();
  const [docFile, setDocFile] = useState(null);

  useEffect(() => {
    if (!manifest || !manifest.categories) return;

    const categoryData = manifest.categories.find(cat => cat.path === category);
    if (!categoryData) {
      setDocFile(null);
      return;
    }

    const projectData = categoryData.projects.find(proj => {
      const projectName = proj.path.split('/').pop();
      return projectName === project;
    });

    if (!projectData) {
      setDocFile(null);
      return;
    }

    const pageData = projectData.pages.find(p => {
      const pageName = p.path.split('/').pop();
      return pageName === page;
    });

    if (pageData) {
      setDocFile(pageData.file);
    } else {
      setDocFile(null);
    }
  }, [manifest, category, project, page]);

  if (!docFile) {
    return (
      <Box className="doc-page-error" padding="40px">
        <Heading as="h2" size="lg">Page not found</Heading>
        <Text marginTop="10px">Could not find page "{page}" in project "{project}" of category "{category}"</Text>
      </Box>
    );
  }

  return <MarkdownPage file={docFile} />;
}

export default DocPage;
