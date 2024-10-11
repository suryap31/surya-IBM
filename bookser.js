const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Use environment variable for MongoDB connection string or default
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/menu';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5011;

app.use(cors());
app.use(bodyParser.json());

// Define a Mongoose schema and model for MenuItem
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true } // Added image field
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Route to get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

// Route to add a new food item
app.post('/api/menu', async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || price == null || !image) {
    return res.status(400).json({ message: 'Name, price, and image are required' });
  }

  const newItem = new MenuItem({ name, price: parseFloat(price), image }); // Include image

  try {
    await newItem.save();
    res.status(201).json({ message: 'Food item added successfully', newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding food item', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
