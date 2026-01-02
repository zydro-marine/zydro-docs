import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '..', 'docs');
const publicDocsDir = path.join(__dirname, '..', 'public', 'docs');
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];
  const frontmatter = {};

  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content: markdownContent };
}

function getDisplayName(fullPath, defaultName) {
  if (!fullPath || !fs.existsSync(fullPath)) {
    return defaultName;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    return frontmatter.displayName || defaultName;
  } catch (err) {
    console.warn(`Error reading ${fullPath}:`, err.message);
    return defaultName;
  }
}

function getPriority(fullPath, defaultPriority = 999) {
  if (!fullPath || !fs.existsSync(fullPath)) {
    return defaultPriority;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    const priority = frontmatter.priority ? parseInt(frontmatter.priority, 10) : defaultPriority;
    return isNaN(priority) ? defaultPriority : priority;
  } catch (err) {
    console.warn(`Error reading ${fullPath}:`, err.message);
    return defaultPriority;
  }
}

function scanDocsDirectory(dir, basePath = '', depth = 0) {
  const entries = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  let indexFile = null;

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

    if (item.isDirectory()) {
      if (depth === 0) {
        const category = {
          name: item.name,
          path: relativePath,
          projects: [],
          indexFile: null,
          displayName: item.name
        };

        const indexPath = path.join(fullPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          category.indexFile = `${relativePath}/index.md`;
          category.displayName = getDisplayName(indexPath, item.name);
          category.priority = getPriority(indexPath, 999);
        } else {
          category.priority = 999;
        }

        const subItems = scanDocsDirectory(fullPath, relativePath, depth + 1);
        subItems.forEach(subItem => {
          if (subItem.type === 'project') {
            category.projects.push(subItem);
          }
        });

        entries.push({
          type: 'category',
          ...category
        });
      } else if (depth === 1) {
        const project = {
          name: item.name,
          path: relativePath,
          pages: [],
          indexFile: null,
          displayName: item.name
        };

        const indexPath = path.join(fullPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          project.indexFile = `${relativePath}/index.md`;
          project.displayName = getDisplayName(indexPath, item.name);
          project.priority = getPriority(indexPath, 999);
        } else {
          project.priority = 999;
        }

        const subItems = scanDocsDirectory(fullPath, relativePath, depth + 1);
        subItems.forEach(subItem => {
          if (subItem.type === 'page') {
            project.pages.push(subItem);
          }
        });

        entries.push({
          type: 'project',
          ...project
        });
      }
    } else if (item.name.endsWith('.md')) {
      if (item.name === 'index.md') {
        indexFile = relativePath;
      } else {
        const pageName = item.name.replace('.md', '');
        const pagePath = path.join(dir, item.name);
        const priority = getPriority(pagePath, 999);
        entries.push({
          type: 'page',
          name: pageName,
          path: relativePath.replace('.md', ''),
          file: relativePath,
          priority: priority
        });
      }
    }
  }

  return entries;
}

function copyDocs() {
  try {
    if (fs.existsSync(docsDir) && fs.statSync(docsDir).isDirectory()) {
      fs.mkdirSync(publicDocsDir, { recursive: true });
      fs.cpSync(docsDir, publicDocsDir, { recursive: true, force: true });
      console.log('Docs copied to public/docs');
    }
  } catch (err) {
    console.warn('Error copying docs directory:', err.message);
  }
}

function generateManifest() {
  if (!fs.existsSync(docsDir)) {
    console.log('Docs directory does not exist, creating empty manifest');
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify({ categories: [] }, null, 2));
    return;
  }

  copyDocs();

  const structure = scanDocsDirectory(docsDir);
  const categories = structure.filter(item => item.type === 'category');

  // Sort categories by priority
  categories.sort((a, b) => (a.priority || 999) - (b.priority || 999));

  const manifest = {
    categories: categories.map(cat => {
      // Sort projects by priority
      const sortedProjects = [...cat.projects].sort((a, b) => (a.priority || 999) - (b.priority || 999));
      
      return {
        name: cat.name,
        displayName: cat.displayName || cat.name,
        path: cat.path,
        indexFile: cat.indexFile || null,
        projects: sortedProjects.map(project => {
          // Sort pages by priority
          const sortedPages = [...project.pages].sort((a, b) => (a.priority || 999) - (b.priority || 999));
          
          return {
            name: project.name,
            displayName: project.displayName || project.name,
            path: project.path,
            indexFile: project.indexFile || null,
            pages: sortedPages.map(page => ({
              name: page.name,
              path: page.path,
              file: page.file
            }))
          };
        })
      };
    })
  };

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Manifest generated successfully at', manifestPath);
  console.log('Found', categories.length, 'categories');
  const totalProjects = categories.reduce((sum, cat) => sum + cat.projects.length, 0);
  console.log('Found', totalProjects, 'projects');
}

generateManifest();
