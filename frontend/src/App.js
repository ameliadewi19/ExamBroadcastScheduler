import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

import Login from './components/Login.js';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard.js';
import Dosen from './components/Dosen.js';
import JadwalUjian from './components/JadwalUjian.js';
import Reminder from './components/Reminder.js';
import AuthWBM from './components/AuthWBM.js';

function checkAuthorization() {
  const token = localStorage.getItem('jwt_token');

  console.log("token lokal:", token);
  
  if (!token) {
    return false;
  }
  return true;
}

function ProtectedRoute({ children }) {
  const location = useLocation();

  const userHasAuthorization = checkAuthorization(); 

  if (!userHasAuthorization) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                  <Sidebar />
                </nav>
                <div className="main">
                    <Navbar toggleSidebar={toggleSidebar} />
                    <Dashboard />
                    <Footer />
                </div>
                
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth-wbm"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                  <Sidebar />
                </nav>
                <div className="main">
                    <Navbar toggleSidebar={toggleSidebar} />
                    <AuthWBM />
                    <Footer />
                </div>
                
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dosen"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                  <Sidebar />
                </nav>
                <div className="main">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <Dosen />
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/jadwal-ujian"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                  <Sidebar />
                </nav>
                <div className="main">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <JadwalUjian />
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar  collapsed'}`}>
                  <Sidebar />
                </nav>
                <div className="main">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <Confirmation />
                  <Footer />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminder"
          element={
            <ProtectedRoute>
              <div className="wrapper">
                <nav id="sidebar" className={`${sidebarOpen ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed'}`}>
                  <Sidebar />
                </nav>
                <div className="main">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <Reminder />
                  <Footer />
                </div>
              </div>
              </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;