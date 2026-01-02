import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/features/header/Header';
import Footer from './components/features/footer/Footer';
import Sidebar from './components/features/sidebar/Sidebar';
import Breadcrumbs from './components/features/breadcrumbs/Breadcrumbs';
import IndexPage from './components/screens/index-page/IndexPage';
import CategoryPage from './components/screens/category-page/CategoryPage';
import ProjectPage from './components/screens/project-page/ProjectPage';
import DocPage from './components/screens/doc-page/DocPage';
import CallbackPage from './components/screens/callback-page/CallbackPage';
import './App.scss';

function AppContent() {
  const [manifest, setManifest] = useState(null);
  const location = useLocation();
  const isIndexPage = location.pathname === '/';
  const isCallbackPage = location.pathname === '/callback';

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
    <Box>
    <Box className="app-container" minHeight="100vh" display="flex" flexDirection="column" width="100%">
      {!isCallbackPage && <Header />}
      {!isIndexPage && !isCallbackPage && <Breadcrumbs manifest={manifest} />}
      <Box className={`app-content ${isIndexPage || isCallbackPage ? 'no-sidebar' : ''}`} display="flex" flex="1" alignSelf="stretch" minHeight="0">
        {!isIndexPage && !isCallbackPage && <Sidebar manifest={manifest} />}
        <Box as="main" className="app-main" flex="1" display="flex" flexDirection="column" width="100%">
          <Switch>
            <Route exact path="/callback" render={() => <CallbackPage />} />
            <Route exact path="/" render={() => <IndexPage manifest={manifest} />} />
            <Route exact path="/:category" render={() => <CategoryPage manifest={manifest} />} />
            <Route exact path="/:category/:project" render={() => <ProjectPage manifest={manifest} />} />
            <Route exact path="/:category/:project/:page" render={() => <DocPage manifest={manifest} />} />
          </Switch>
        </Box>
      </Box>
    </Box>
    <Box>
      {!isCallbackPage && <Footer />}
    </Box>
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
