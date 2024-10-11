import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Menu from './components/menu';
import Book from './components/book';
import SignUp from './components/signup';
import LogIn from './components/login';
import Admin from './components/admin';
import AddFood from './components/AddFood.js'; // Import AddFood component
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState([
  ]);

  const addFoodItem = (newItem) => {
    setMenuItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            <div className="logo">THE DAILY BYTES</div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/menu" state={{ menuItems }}>Menu</Link></li>
              <li><Link to="/book">Book Reservation</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu menuItems={menuItems} />} />
            <Route path="/book" element={<Book />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-food" element={<AddFood addFoodItem={addFoodItem} />} /> {/* Pass function here */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  ); 
}

export default App;
