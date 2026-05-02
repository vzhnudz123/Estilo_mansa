import React, { Suspense, lazy, useCallback, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthContext } from './context/AuthContext';
import { ROUTES } from './utils/routes';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import LoadingScreen from './components/LoadingScreen';
import { PageTransition } from './components/ui';

const Home          = lazy(() => import('./pages/Home'));
const Rooms         = lazy(() => import('./pages/Rooms'));
const RoomDetails   = lazy(() => import('./pages/RoomDetails'));
const Login         = lazy(() => import('./pages/Login'));
const Register      = lazy(() => import('./pages/Register'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Gallery       = lazy(() => import('./pages/Gallery'));
const Contact       = lazy(() => import('./pages/Contact'));

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user?.role === 'admin' ? children : <Navigate to={ROUTES.home} replace />;
};

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingRoute, setPendingRoute] = useState(null);

  const navigateWithLoader = useCallback((path, options = {}) => {
    const destination = typeof path === 'string' ? path : '';
    const currentLocation = `${location.pathname}${location.hash}`;

    if (!destination || destination === currentLocation) {
      return;
    }

    setPendingRoute({
      path: destination,
      replace: options.replace ?? false,
      state: options.state,
    });
  }, [location.hash, location.pathname]);

  const handleLoaderComplete = useCallback(() => {
    if (!pendingRoute) {
      return;
    }

    const { path, replace, state } = pendingRoute;
    setPendingRoute(null);
    navigate(path, { replace, state });
  }, [navigate, pendingRoute]);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence>
        {pendingRoute && (
          <LoadingScreen
            key={pendingRoute.path}
            onComplete={handleLoaderComplete}
          />
        )}
      </AnimatePresence>
      
      {/* Premium Nature/Sky Background Mockup Effect */}
      <div className="fixed inset-0 z-0 bg-[#050706]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1128] via-[#050706] to-[#1a2a1f] opacity-40" />
        <div className="absolute top-[-10%] right-[-5%] h-[60%] w-[50%] rounded-full bg-[#1e3a8a]/10 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[70%] w-[60%] rounded-full bg-[#2d4a35]/10 blur-[140px]" />
        <div className="grain-overlay" />
      </div>

      <SmoothScroll>
        <div className="app-shell relative z-10 flex min-h-screen flex-col bg-transparent">
          <Navbar onNavigateWithLoader={navigateWithLoader} />
          <main className="flex-grow">
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path={ROUTES.legacyHome} element={<PageTransition><Home onNavigateWithLoader={navigateWithLoader} /></PageTransition>} />
                  <Route path={ROUTES.home} element={<PageTransition><Home onNavigateWithLoader={navigateWithLoader} /></PageTransition>} />
                  <Route path={ROUTES.legacyRooms} element={<PageTransition><Rooms /></PageTransition>} />
                  <Route path={ROUTES.rooms} element={<PageTransition><Rooms /></PageTransition>} />
                  <Route path={ROUTES.legacyRoomDetails()} element={<PageTransition><RoomDetails /></PageTransition>} />
                  <Route path={ROUTES.roomDetails()} element={<PageTransition><RoomDetails /></PageTransition>} />
                  <Route path={ROUTES.gallery} element={<PageTransition><Gallery /></PageTransition>} />
                  <Route path={ROUTES.contact} element={<PageTransition><Contact /></PageTransition>} />
                  <Route path={ROUTES.login} element={<PageTransition><Login /></PageTransition>} />
                  <Route path={ROUTES.register} element={<PageTransition><Register /></PageTransition>} />
                  <Route
                    path={ROUTES.admin}
                    element={
                      <PageTransition>
                        <AdminRoute><AdminDashboard /></AdminRoute>
                      </PageTransition>
                    }
                  />
                  <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <FloatingWhatsApp />
          <Footer onNavigateWithLoader={navigateWithLoader} />
        </div>
      </SmoothScroll>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
