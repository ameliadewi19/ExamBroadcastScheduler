import React, { useState } from 'react';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Jika login berhasil, Anda dapat menavigasi pengguna ke halaman lain atau melakukan tindakan lain yang sesuai.
      console.log('Login berhasil', response.data);
    } catch (err) {
      setError('Login gagal. Username atau password salah.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center" style={{ marginTop: '150px' }}>
        <div className="col-4">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-center align-items-center"> 
              <h5 className="mb-0">Login</h5>
            </div>
            <div className="card-body">
            {error && <div className="error">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="basic-icon-default-email">Username</label>
                  <div className="input-group input-group-merge">
                    <span id="basic-icon-default-fullname2" className="input-group-text">
                      <i className="bx bx-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan username anda"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="basic-icon-default-password">Password</label>
                  <div className="input-group input-group-merge">
                    <span className="input-group-text"><i className="bx bx-lock"></i></span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Masukkan Passowrd anda"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary ">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
