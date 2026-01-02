import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar({ manifest }) {
  const location = useLocation();

  if (!manifest || !manifest.categories) {
    return <div>Loading...</div>;
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="sidebar">
      <nav>
        {manifest.categories.map(category => {
          return (
            <div key={category.path} className="sidebar-category">
              <div className="sidebar-category-header">
                {category.name}
              </div>
              {category.projects && category.projects.length > 0 && (
                <ul className="sidebar-projects">
                  {category.projects.map(project => {
                    const projectName = project.path.split('/').pop();
                    const projectPath = `/${category.path}/${projectName}`;
                    const isProjectActive = isActive(projectPath);
                    
                    return (
                      <li key={project.path} className="sidebar-project">
                        <Link
                          to={projectPath}
                          className={`sidebar-project-link ${isProjectActive ? 'active' : ''}`}
                        >
                          {project.name}
                        </Link>
                        {isProjectActive && project.pages && project.pages.length > 0 && (
                          <ul className="sidebar-pages">
                            {project.pages.map(page => {
                              const pageName = page.path.split('/').pop();
                              const pagePath = `/${category.path}/${projectName}/${pageName}`;
                              const isPageActive = location.pathname === pagePath;
                              
                              return (
                                <li key={page.path} className="sidebar-page">
                                  <Link
                                    to={pagePath}
                                    className={`sidebar-page-link ${isPageActive ? 'active' : ''}`}
                                  >
                                    {page.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
