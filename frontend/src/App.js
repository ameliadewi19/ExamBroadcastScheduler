import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Login />
          </>
        }/>
        <Route path="/dashboard" element={
          <div className="wrapper">
            <Sidebar />
            <div className="main">
              <Navbar />
              <Dashboard />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/dosen" element={
          <div className="wrapper">
            <Sidebar />
            <div className="main">
              <Navbar />
              <Dosen />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/jadwal-ujian" element={
          <div className="wrapper">
            <Sidebar />
            <div className="main">
              <Navbar />
              <JadwalUjian />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/confirmation" element={
          <div className="wrapper">
            <Sidebar />
            <div className="main">
              <Navbar />
              <Confirmation />
              <Footer />
            </div>
          </div>
        }/>
        <Route path="/reminder" element={
          <div className="wrapper">
            <Sidebar />
            <div className="main">
              <Navbar />
              <Reminder />
              <Footer />
            </div>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 

