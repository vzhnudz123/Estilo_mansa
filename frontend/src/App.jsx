import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';

const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetails = lazy(() => import('./pages/RoomDetails'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="grain-overlay" />
      <SmoothScroll>
        <div className="flex flex-col min-h-screen bg-obsidian relative z-10">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/rooms"    element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route path="/gallery"  element={<Gallery />} />
                <Route path="/contact"  element={<Contact />} />
                <Route path="/login"    element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/my-bookings" element={
                  <ProtectedRoute><MyBookings /></ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <AdminRoute><AdminDashboard /></AdminRoute>
                } />
              </Routes>
            </Suspense>
          </main>
          <FloatingWhatsApp />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
