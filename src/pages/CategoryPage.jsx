import { useParams, Navigate } from 'react-router-dom';

function CategoryPage({ manifest }) {
  const { category } = useParams();

  if (!manifest || !manifest.categories) {
    return <div>Loading...</div>;
  }

  const categoryData = manifest.categories.find(cat => cat.path === category);

  if (!categoryData) {
    return (
      <div className="category-error">
        <h2>Category not found</h2>
      </div>
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
    <div className="category-error">
      <h2>Category not found</h2>
      <p>No projects found in this category.</p>
    </div>
  );
}

export default CategoryPage;
