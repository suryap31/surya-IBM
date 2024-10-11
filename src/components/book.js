import React, { useState } from 'react';
import axios from 'axios';
import './book.css';
import { useNavigate } from 'react-router-dom';

function Book() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [person, setPerson] = useState('1');
  const [time, setTime] = useState('10am');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('authToken');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError('');
    setSuccess('');

    // Basic validation
    if (!name || !phone || !person || !time || !date) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5008/api/Booking', {
        name,
        phone,
        person,
        time,
        date,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Booking successful!!');
        // Clear form fields
        setName('');
        setPhone('');
        setPerson('1');
        setTime('10am');
        setDate(new Date().toISOString().split('T')[0]);
      } else {
        setError(response.data.message || 'Error occurred while booking.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while booking.');
    }
  };

  if (!token) {
    return (
      <div className="book">
        <h5>Please log in to book a table.</h5>
        <center><button1 onClick={() => navigate('/login')}>Go to Login</button1></center>{/* Use navigate for redirection */}
      </div>
    );
  }

  return (
    <div className="book">
      <center><h3>Book Table</h3></center>
      <form onSubmit={handleSubmit}>
        <h5>NAME:</h5>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />

        <h5>PHONE NUMBER:</h5>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your Phone Number"
          required
        />

        <h5>SELECT NUMBER OF PERSONS:</h5>
        <select value={person} onChange={(e) => setPerson(e.target.value)} id="person" name="person">
          <option value="1">1 Person</option>
          <option value="2">2 Persons</option>
          <option value="4">4 Persons</option>
          <option value="8">8 Persons</option>
        </select>
        
        <h5>SELECT TIME:</h5>
        <select value={time} onChange={(e) => setTime(e.target.value)} id="time" name="time">
          <option value="10am">10:00 AM</option>
          <option value="12pm">12:00 PM</option>
          <option value="2pm">2:00 PM</option>
          <option value="6pm">6:00 PM</option>
          <option value="8pm">8:00 PM</option>
        </select>

        <h5>SELECT DATE:</h5>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          id="date"
          name="date"
        />

        <center><button type="submit">Book Now</button></center>
      </form>
      
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default Book;
