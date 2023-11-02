import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import QRModal from './QRModal';  
// import { browserHistory } from './react-router';



// Using Arrow Function
const Dashboard = () => {
  const navigate = useNavigate();
  const [qrPath, setQRPath] = useState('');

  const fetchQRCode = async () => {
    try {
      const response = await axios.get('http://localhost:5005/generate-qr');
      const data = response.data;
      setQRPath(data.qrPath);
      console.log("Path");

      navigate('/auth-wbm'); // Use navigate to redirect to the dashboard route
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  const handleAuthButtonClick = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log('handleAuthButtonClick called'); 
    try {
      navigate('/auth-wbm'); 
      console.log("Path");
    } catch (error) {
      console.error('Error fetching QR code:', error);
    }
  };

  return (
          <main class="content">
            <div class="container-fluid p-0">

              <h1 class="h3 mb-3"><strong>Exam</strong> Broadcast Message</h1>
              <div class="row">
                <div class="col-xl-12 col-xxl-5 d-flex">
                  <div class="w-100">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="card">
                          <div class="card-body">
                            <div class="row">
                              <div class="col mt-0">
                                <h5 class="card-title">Autentikasi ke WhatsApp</h5>
                                <h6>Selamat datang di Web Exam Broadcast Message. Silahkan klik tombol dibawah untuk melakukan autentikasi whatsapp saat pertama kali menggunakan/session login habis.</h6>
                              </div>
                            </div>
                             <button type="button" className="btn btn-primary mt-2 mr-2" onClick={handleAuthButtonClick}>
                               Show QR Code
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>

          
        );
  };

export default Dashboard;