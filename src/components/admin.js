import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const ADMIN_USERNAME = 'admin'; // Set your admin username
  const ADMIN_PASSWORD = 'password'; // Set your admin password

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true'); // Set admin flag
      navigate('/admin/add-food'); // Navigate to add food page
    } else {
      setMessage('Invalid credentials');
    }
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!foodName || !foodPrice) {
      alert('Please fill in both fields');
      return;
    }

    // Here you can send the food item to the server or update your state in Menu component
    // For example:
    // fetch('/api/add-food', { ... })

    alert(`Food item added: ${foodName} - ${foodPrice}`);
    setFoodName('');
    setFoodPrice('');
  };

  return (
    <div className="admin">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;
