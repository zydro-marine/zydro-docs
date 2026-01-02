import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Breadcrumbs from './components/Breadcrumbs';
import IndexPage from './pages/IndexPage';
import CategoryPage from './pages/CategoryPage';
import ProjectPage from './pages/ProjectPage';
import DocPage from './pages/DocPage';
import './App.scss';

function AppContent() {
  const [manifest, setManifest] = useState(null);
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

  useEffect(() => {
    fetch('/manifest.json')
      .then(res => res.json())
      .then(data => setManifest(data))
      .catch(err => {
        console.error('Failed to load manifest:', err);
        setManifest({ categories: [] });
      });
  }, []);

  return (
    <div className="app-container">
      <Header />
      {!isIndexPage && <Breadcrumbs manifest={manifest} />}
      <div className={`app-content ${isIndexPage ? 'no-sidebar' : ''}`}>
        {!isIndexPage && <Sidebar manifest={manifest} />}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<IndexPage manifest={manifest} />} />
            <Route path="/:category" element={<CategoryPage manifest={manifest} />} />
            <Route path="/:category/:project" element={<ProjectPage manifest={manifest} />} />
            <Route path="/:category/:project/:page" element={<DocPage manifest={manifest} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
