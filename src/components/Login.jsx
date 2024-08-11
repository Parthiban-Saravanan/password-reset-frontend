import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState(''); // Add feedback state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://password-reset-backend-n4xb.onrender.com/api/auth/login', { email, password });
      setFeedback(res.data.message);
      // If login is successful, navigate to the homepage or dashboard
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      setFeedback(error.response?.data.message || 'Something went wrong');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '25rem' }}>
        <h3 className="card-title text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {feedback && <div className="alert alert-info">{feedback}</div>} {/* Display feedback */}
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
        </form>
        <div className="text-center">
          <button className="btn btn-link" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
