import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState(''); // Add feedback state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/forgotpassword', { email });
      setFeedback(res.data.message);
    } catch (error) {
      setFeedback(error.response?.data.message || 'Something went wrong');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '25rem' }}>
        <h3 className="card-title text-center mb-4">Forgot Password</h3>
        <form onSubmit={handleSubmit}>
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
          {feedback && <div className="alert alert-info">{feedback}</div>} {/* Display feedback */}
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
