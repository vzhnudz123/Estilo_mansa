import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import SmoothScroll from './components/SmoothScroll';

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
      <SmoothScroll>
        <div className="flex flex-col min-h-screen bg-luxury-bg">
          <Navbar />
          <main className="flex-grow">
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
          </main>
          <FloatingWhatsApp />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
