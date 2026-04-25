require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const Algorithm = require('./models/Algorithm');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// GET all algorithms (with optional ?category=Sorting filter)
app.get('/api/algorithms', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const algorithms = await Algorithm.find(filter).sort({ category: 1, name: 1 });
    res.json(algorithms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single algorithm by ID
app.get('/api/algorithms/:id', async (req, res) => {
  try {
    const algo = await Algorithm.findById(req.params.id);
    if (!algo) return res.status(404).json({ message: 'Not found' });
    res.json(algo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all unique categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Algorithm.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
