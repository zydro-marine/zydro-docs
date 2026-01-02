import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MarkdownPage from '../components/MarkdownPage';
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
      <div className="doc-page-error">
        <h2>Page not found</h2>
        <p>Could not find page "{page}" in project "{project}" of category "{category}"</p>
      </div>
    );
  }

  return <MarkdownPage file={docFile} />;
}

export default DocPage;
