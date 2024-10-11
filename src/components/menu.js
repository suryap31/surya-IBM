import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFood from './AddFood.js'; // Import the AddFood component
import './menu.css';

function Menu() {
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [orderMode, setOrderMode] = useState('delivery');
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5011/api/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const foodTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const deliveryFee = orderMode === 'delivery' ? 50 : 0;
      setTotalAmount(foodTotal + deliveryFee);
    };
    calculateTotal();
  }, [cart, orderMode]);

  const handleAddToCart = () => {
    const selectedItem = menuItems.find(item => item.name === food);
    if (!selectedItem) return;

    const itemInCart = cart.find(item => item.name === food);
    if (itemInCart) {
      setCart(cart.map(item =>
        item.name === food ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { name: selectedItem.name, price: selectedItem.price, quantity, image: selectedItem.image }]);
    }

    setFood('');
    setQuantity(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:5007/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cart, orderMode }),
      });

      if (!response.ok) throw new Error('Failed to place order');
      const data = await response.json();
      alert(data.message || 'Order placed successfully!');
      setCart([]);
      setTotalAmount(0);
      setOrderMode('delivery');
    } catch (error) {
      console.error('Order error:', error);
      alert(error.message || 'Error occurred while placing the order.');
    }
  };

  const addFoodItem = (newItem) => {
    setMenuItems(prevItems => [...prevItems, newItem]);
  };

  // Check if user is logged in
  if (!token) {
    return (
      <div className="menu">
        <h5>Please log in to place an order.</h5>
        <center><button onClick={() => navigate('/login')}>Go to Login</button></center>
      </div>
    );
  }

  return (
    <div className="menu">
      <form onSubmit={handleSubmit}>
        <h2>Select Food:</h2>
        <select id="food" name="food" value={food} onChange={(e) => setFood(e.target.value)}>
          <option value="">Select an item</option>
          {menuItems.map(item => (
            <option key={item._id} value={item.name}>
              {item.name} ({item.price.toFixed(2)})
            </option>
          ))}
        </select>

        <h2>Select Quantity:</h2>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="10"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <h2>Select Mode of Order:</h2>
        <select id="order" name="order" value={orderMode} onChange={(e) => setOrderMode(e.target.value)}>
          <option value="delivery">Delivery (50)</option>
          <option value="pickup">Pickup (Free)</option>
        </select>

        <button type="button" onClick={handleAddToCart}>Add to Cart</button>

        <h2>Your Order:</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
              {item.name} x {item.quantity} - {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>

        <h2>Total Amount: {totalAmount.toFixed(2)}</h2>

        <div className="button-container">
          <center><button1 type="submit">Place Order</button1></center>
        </div>
      </form>

      {/* Display all food items with images below the menu */}
      <div style={{ marginTop: '20px' }}>
        <h2>Menu Items:</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {menuItems.map(item => (
            <div key={item._id} style={{ margin: '10px', textAlign: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <div>{item.name}</div>
              <div>{item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
