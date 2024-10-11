import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

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
        const response = await axios.post('http://localhost:5009/api/signup_users', formData);
        alert(response.data.message);
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      } catch (err) {
        console.error('Signup error:', err);
        const errorMessage = err.response ? err.response.data.message : 'Network error';
        alert('Signup failed: ' + errorMessage);
      }
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>
        <label htmlFor="name">Name</label><br />
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
          minLength="3"
          required
        />
        <p style={{ color: 'red' }}>{errors.name}</p>

        <label htmlFor="email">Email</label><br />
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
          required
        />
        <p style={{ color: 'red' }}>{errors.email}</p>

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
        <p style={{ color: 'red' }}>{errors.password}</p>

        <center><button type="submit">SUBMIT</button></center>
      </form>
    </div>
  );
}

export default Signup;
