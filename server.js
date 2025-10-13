const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// In-memory database (replace with real database in production)
let users = [];
let wishlists = {};
let subscriptions = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      createdAt: new Date().toISOString(),
      isSubscribed: false
    };

    users.push(user);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(user => user.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.put('/api/auth/profile', authenticateToken, (req, res) => {
  try {
    const userIndex = users.findIndex(user => user.id === req.user.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      id: users[userIndex].id, // Preserve ID
      email: users[userIndex].email, // Preserve email
      createdAt: users[userIndex].createdAt // Preserve creation date
    };

    // Remove password from response
    const { password: _, ...userWithoutPassword } = users[userIndex];

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Wishlist Routes
app.get('/api/wishlist', authenticateToken, (req, res) => {
  const userWishlist = wishlists[req.user.userId] || [];
  res.json(userWishlist);
});

app.post('/api/wishlist', authenticateToken, (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Initialize wishlist if it doesn't exist
    if (!wishlists[req.user.userId]) {
      wishlists[req.user.userId] = [];
    }

    // Check if product is already in wishlist
    const existingItem = wishlists[req.user.userId].find(item => item.id === productId);
    if (existingItem) {
      return res.status(400).json({ error: 'Product already in wishlist' });
    }

    // Mock product data (in production, fetch from database)
    const mockProduct = {
      id: productId,
      name: `Product ${productId}`,
      price: Math.floor(Math.random() * 1000) + 500,
      image: '/api/placeholder/300/300',
      brand: Math.random() > 0.5 ? 'anil' : 'amai',
      category: 'apparels',
      description: 'Premium quality product'
    };

    wishlists[req.user.userId].push(mockProduct);
    res.json(mockProduct);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/wishlist/:productId', authenticateToken, (req, res) => {
  try {
    const { productId } = req.params;
    
    if (!wishlists[req.user.userId]) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    const itemIndex = wishlists[req.user.userId].findIndex(item => item.id === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in wishlist' });
    }

    wishlists[req.user.userId].splice(itemIndex, 1);
    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/wishlist/move-to-cart', authenticateToken, (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!wishlists[req.user.userId]) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    const itemIndex = wishlists[req.user.userId].findIndex(item => item.id === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in wishlist' });
    }

    const product = wishlists[req.user.userId][itemIndex];
    
    // Remove from wishlist
    wishlists[req.user.userId].splice(itemIndex, 1);
    
    // In a real app, you would add to cart here
    res.json({ message: 'Product moved to cart', product });
  } catch (error) {
    console.error('Move to cart error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Subscription Routes
app.post('/api/subscribe', authenticateToken, (req, res) => {
  try {
    const { email, preferences } = req.body;
    
    // Update user subscription status
    const userIndex = users.findIndex(user => user.id === req.user.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].isSubscribed = true;

    // Add to subscriptions
    const subscription = {
      id: uuidv4(),
      userId: req.user.userId,
      email: email || users[userIndex].email,
      preferences: preferences || {},
      subscribedAt: new Date().toISOString(),
      isActive: true
    };

    subscriptions.push(subscription);

    res.json({ message: 'Successfully subscribed', subscription });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/subscribe', authenticateToken, (req, res) => {
  try {
    // Update user subscription status
    const userIndex = users.findIndex(user => user.id === req.user.userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].isSubscribed = false;

    // Deactivate subscription
    const subscriptionIndex = subscriptions.findIndex(sub => sub.userId === req.user.userId);
    if (subscriptionIndex !== -1) {
      subscriptions[subscriptionIndex].isActive = false;
    }

    res.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Routes (for user management)
app.get('/api/admin/users', authenticateToken, (req, res) => {
  // In production, add admin role check
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json(usersWithoutPasswords);
});

app.get('/api/admin/subscriptions', authenticateToken, (req, res) => {
  // In production, add admin role check
  res.json(subscriptions);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
