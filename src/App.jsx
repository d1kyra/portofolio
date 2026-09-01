import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/Background';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import ProtectedRoute from './components/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';

// Lazy Loaded Pages
const Home = lazy(() => import('./Pages/Home'));
const Bio = lazy(() => import('./Pages/Bio'));
const Portofolio = lazy(() => import('./Pages/Portofolio'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const Articles = lazy(() => import('./Pages/Articles'));
const Hub = lazy(() => import('./Pages/Hub'));
const Contact = lazy(() => import('./Pages/Contact'));
const Login = lazy(() => import('./Pages/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const WelcomeScreen = lazy(() => import('./Pages/WelcomeScreen'));
const NotFound = lazy(() => import('./Pages/404'));

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem('d1kyra_welcomed');
  });

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('d1kyra_welcomed', 'true');
    setShowWelcome(false);
  };

  return (
    <HelmetProvider>
      <ThemeProvider>
        <MusicProvider>
          <AnimatedBackground />
          <FloatingMusicPlayer />

          <AnimatePresence mode="wait">
            {showWelcome && (
              <Suspense fallback={null}>
                <WelcomeScreen onLoadingComplete={handleWelcomeComplete} />
              </Suspense>
            )}
          </AnimatePresence>

          <BrowserRouter>
            <ScrollToTop />
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                </div>
              }
            >
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/bio" element={<Layout><Bio /></Layout>} />
                <Route path="/projects" element={<Layout><Portofolio /></Layout>} />
                <Route path="/project/:slug" element={<Layout><ProjectDetail /></Layout>} />
                <Route path="/articles" element={<Layout><Articles /></Layout>} />
                <Route path="/hub" element={<Layout><Hub /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />

                {/* Auth & Admin */}
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Layout><Dashboard /></Layout>
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MusicProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
