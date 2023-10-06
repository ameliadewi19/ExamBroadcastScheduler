import React from 'react';
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

// Contoh fungsi untuk memeriksa JWT (ini hanya contoh, sebaiknya digantikan dengan logika sesuai aplikasi Anda).
function checkAuthorization() {
  // Dapatkan token JWT dari penyimpanan lokal (localStorage, sessionStorage, dll.)
  const token = localStorage.getItem('jwt_token');

  console.log("token lokal:", token);

  // Jika token tidak ada atau telah kedaluwarsa, kembalikan false
  if (!token) {
    return false;
  }

  // Anda juga dapat memeriksa apakah token masih valid dengan mengirimkannya ke server
  // dan memeriksa tanggapan dari server.
  // Misalnya, jika server mengembalikan status 200, Anda dapat menganggap token valid.

  // Jika token valid, kembalikan true; jika tidak, kembalikan false.
  // Misalnya:
  // if (response.status === 200) {
  //   return true;
  // } else {
  //   return false;
  // }
  
  // Contoh sederhana: Selalu mengembalikan true untuk simulasi pengujian.
  return true;
}

function ProtectedRoute({ children }) {
  const location = useLocation();

  // Ganti ini dengan logika pemeriksaan JWT yang sesuai dengan aplikasi Anda.
  const userHasAuthorization = checkAuthorization(); // Misalnya, fungsi ini memeriksa JWT.

  if (!userHasAuthorization) {
    return <Navigate to={`/`} />;
  }

  return children;
}

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
          <ProtectedRoute>
            <div className="wrapper">
              <Sidebar />
              <div className="main">
                <Navbar />
                <Dashboard />
                <Footer />
              </div>
            </div>
          </ProtectedRoute>
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

