import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
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
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div className="grain-overlay" />
      <SmoothScroll>
        <div className="app-shell relative z-10 flex min-h-screen flex-col bg-luxury-bg">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/"        element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/rooms"   element={<PageTransition><Rooms /></PageTransition>} />
                  <Route path="/rooms/:id" element={<PageTransition><RoomDetails /></PageTransition>} />
                  <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                  <Route path="/login"   element={<PageTransition><Login /></PageTransition>} />
                  <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
                  <Route
                    path="/admin"
                    element={
                      <PageTransition>
                        <AdminRoute><AdminDashboard /></AdminRoute>
                      </PageTransition>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <FloatingWhatsApp />
          <Footer />
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
