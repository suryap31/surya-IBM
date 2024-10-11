import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (formData.password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5010/api';
        const response = await axios.post(`${apiUrl}/login`, formData);

        localStorage.setItem('authToken', response.data.token); // Store JWT token
        alert('Login successful!');

        // Redirect after successful login to the booking page
        navigate('/book'); // Redirect to the booking page
      } catch (err) {
        console.error('Login error:', err.response ? err.response.data : err.message);
        alert('Login failed: ' + (err.response && err.response.data ? err.response.data.message : err.message));
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label><br />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            minLength="5"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Login;
