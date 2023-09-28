import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { username, password });

      if (response.data.success) {
        setMessage('Login successful');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div class="container-fluid">
      <div className="row justify-content-center" style={{ marginTop: '150px' }}>
        <div class="col-4">
          <div class="card mb-4">
            <div class="card-header d-flex justify-content-center align-items-center"> 
              <h5 class="mb-0">Login</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label class="form-label" for="basic-icon-default-email">Email</label>
                  <div class="input-group input-group-merge">
                    <span id="basic-icon-default-fullname2" class="input-group-text">
                      <i class="bx bx-user"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="basic-icon-default-fullname"
                      placeholder="admin@gmail.com"
                      aria-label="John Doe"
                      aria-describedby="basic-icon-default-fullname2"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label" for="basic-icon-default-password">Password</label>
                  <div class="input-group input-group-merge">
                    <span class="input-group-text"><i class="bx bx-envelope"></i></span>
                    <input
                      type="text"
                      id="basic-icon-default-email"
                      class="form-control"
                      placeholder="password"
                      aria-label="john.doe"
                      aria-describedby="basic-icon-default-email2"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                  <button type="submit" class="btn btn-primary ">Send</button>
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
