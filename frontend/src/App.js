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
          }
        />
        <Route
          path="/dosen"
          element={
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
          }
        />
        <Route
          path="/jadwal-ujian"
          element={
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
          }
        />
        <Route
          path="/confirmation"
          element={
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
          }
        />
        <Route
          path="/reminder"
          element={
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
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

