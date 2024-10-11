const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express application
const app = express();
const PORT = 5007;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/food_order', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define Menu Schema and Model
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});
const Menu = mongoose.model('Menu', menuSchema);

// Define Order Schema and Model
const orderSchema = new mongoose.Schema({
  cart: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }, // Add totalPrice field
  }],
  orderMode: { type: String, required: true },
  totalAmount: { type: Number, required: true }, // Store total amount
  date: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// Seed initial menu items if the collection is empty
const seedMenuItems = async () => {
  const count = await Menu.countDocuments();
  if (count === 0) {
    const items = [
      { name: 'idly', price: 50 },
      { name: 'dosa', price: 60 },
      { name: 'noodles', price: 90 },
      { name: 'spaghetti', price: 80 },
      { name: 'pizza', price: 110 },
      { name: 'pasta', price: 100 },
      { name: 'chicken biriyani', price: 110 },
      { name: 'mushroom biriyani', price: 90 },
      { name: 'shrimp fried rice', price: 130 },
      { name: 'mango juice', price: 50 },
      { name: 'lemon juice', price: 30 },
      { name: 'cake', price: 30 },
      { name: 'ice cream', price: 60 },
      { name: 'gulab jamun', price: 55 },
    ];
    await Menu.insertMany(items);
    console.log('Initial menu items seeded to the database.');
  }
};

seedMenuItems();

// Routes

// GET all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

// POST an order
app.post('/api/order', async (req, res) => {
  const { cart, orderMode } = req.body; // Expect the entire cart object

  // Basic validation
  if (!cart || cart.length === 0 || !orderMode) {
    return res.status(400).json({ message: 'Invalid order details' });
  }

  try {
    // Calculate total amount and add totalPrice to each item
    const totalAmount = cart.reduce((acc, item) => {
      const itemTotalPrice = item.price * item.quantity;
      acc += itemTotalPrice;
      item.totalPrice = itemTotalPrice; // Store totalPrice in cart item
      return acc;
    }, orderMode === 'delivery' ? 50 : 0); // Add delivery fee if applicable

    // Create a new order
    const newOrder = new Order({
      cart, // Store the cart details
      orderMode,
      totalAmount, // Store the total amount
    });

    // Save the order to the database
    await newOrder.save();

    res.json({
      message: 'Order placed successfully!',
      orderDetails: {
        cart,
        orderMode,
        totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
