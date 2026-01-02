import { useParams, Navigate } from 'react-router-dom';
import MarkdownPage from '../components/MarkdownPage';
import './ProjectPage.scss';

function ProjectPage({ manifest }) {
  const { category, project } = useParams();

  if (!manifest || !manifest.categories) {
    return <div>Loading...</div>;
  }

  const categoryData = manifest.categories.find(cat => cat.path === category);
  if (!categoryData) {
    return (
      <div>
        <h2>Category not found</h2>
      </div>
    );
  }

  const projectData = categoryData.projects.find(proj => {
    const projectName = proj.path.split('/').pop();
    return projectName === project;
  });

  if (!projectData) {
    return (
      <div>
        <h2>Project not found</h2>
      </div>
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
    return <Navigate to={`/${category}/${project}/${pageName}`} replace />;
  }

  return (
    <div>
      <h2>{projectData.name}</h2>
      <p>No content available for this project.</p>
    </div>
  );
}

export default ProjectPage;
