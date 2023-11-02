import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/login', {
        username,
        password,
      });
      
      const token = response.data.accessToken;
      
      localStorage.setItem('jwt_token', token);
      //axios.defaults.headers.common['Authorization'] = Bearer ${token};
      console.log('Login berhasil', response.data);
      navigate('/dashboard'); // Use navigate to redirect to the dashboard route
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: 'Username atau password salah.',
      });      
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">EXAM BROADCAST SCHEDULE</h1>
                <p className="lead">
                  Sign in to your account to continue
                </p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    {/* {error && <div className="error text-danger">{error}</div>} */}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control form-control-lg" 
                            type="text"
                            placeholder="Masukkan username Anda"
                            value={username}
                            onChange={handleUsernameChange} required/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control form-control-lg"
                          type="password"
                          placeholder="Masukkan password Anda"
                          value={password}
                          onChange={handlePasswordChange} required/>
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-lg btn-primary">Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;