import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
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
    <Box className="app-container" minHeight="100vh" display="flex" flexDirection="column" width="100%">
      <Header />
      {!isIndexPage && <Breadcrumbs manifest={manifest} />}
      <Box className={`app-content ${isIndexPage ? 'no-sidebar' : ''}`} display="flex" flex="1" alignSelf="stretch" minHeight="0">
        {!isIndexPage && <Sidebar manifest={manifest} />}
        <Box as="main" className="app-main" flex="1" display="flex" flexDirection="column" width="100%">
          <Switch>
            <Route exact path="/" render={() => <IndexPage manifest={manifest} />} />
            <Route exact path="/:category" render={() => <CategoryPage manifest={manifest} />} />
            <Route exact path="/:category/:project" render={() => <ProjectPage manifest={manifest} />} />
            <Route exact path="/:category/:project/:page" render={() => <DocPage manifest={manifest} />} />
          </Switch>
        </Box>
      </Box>
      <Footer />
    </Box>
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
