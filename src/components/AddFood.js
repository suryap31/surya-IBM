import React, { useState } from 'react';

const AddFood = ({ addFoodItem }) => {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); // Add state for image

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!foodName || !price || !image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:5011/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: foodName, price: parseFloat(price), image }), // Include image in body
      });

      if (!response.ok) {
        throw new Error('Failed to add food item');
      }

      const data = await response.json();
      alert(data.message);
      addFoodItem(data.newItem);
      setFoodName('');
      setPrice('');
      setImage(''); // Reset image state
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Add Food Item</h2>
      <form onSubmit={handleAddFood}>
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /> {/* Input for image URL */}
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
