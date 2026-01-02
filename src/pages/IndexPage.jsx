import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    return <div>Loading...</div>;
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
    <div className="index-page">
      <header className="index-header">
        <div className="index-header-content">
          <h1 className="index-title">Documentation</h1>
          
          <div className="index-search">
            <SearchBar />
          </div>

          <div className="index-categories">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`index-category-button ${selectedCategory === null ? 'active' : ''}`}
            >
              All
            </button>
            {manifest.categories.map(category => (
              <button
                key={category.path}
                onClick={() => setSelectedCategory(category.path)}
                className={`index-category-button ${selectedCategory === category.path ? 'active' : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="index-content">
        <div className="index-grid">
          {projectsToShow.map(project => {
            const projectName = project.path.split('/').pop();
            const projectPath = `/${project.categoryPath}/${projectName}`;

            const IconComponent = getProjectIcon(project.name);

            return (
              <Link
                key={project.path}
                to={projectPath}
                className="index-tile-link"
              >
                <div className="index-tile">
                  <div className="index-tile-category">
                    {project.categoryName}
                  </div>
                  <div className="index-tile-header">
                    <IconComponent className="index-tile-icon" />
                    <h2 className="index-tile-title">
                      {project.name}
                    </h2>
                  </div>
                  {project.pages && project.pages.length > 0 && (
                    <div className="index-tile-meta">
                      {project.pages.length} {project.pages.length === 1 ? 'page' : 'pages'}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
