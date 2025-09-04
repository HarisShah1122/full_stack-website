const Cart = require('../models/Cart');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');

const cartController = (app) => {
  
  app.post(
    '/api/cart/add',
    authenticateToken,
    [
      body('productId').notEmpty().withMessage('Product ID is required'),
      body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
      body('color').notEmpty().withMessage('Color is required'),
      body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { productId, quantity, color, price } = req.body;
        const userId = req.user.id;

        // Check if item already exists in cart
        let cartItem = await Cart.findOne({ where: { userId, productId, color } });
        if (cartItem) {
          cartItem.quantity += quantity;
          await cartItem.save();
        } else {
          cartItem = await Cart.create({ userId, productId, quantity, color, price });
        }

        res.status(200).json({ message: 'Item added to cart', cartItem });
      } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  );

  // Get Cart Items
  app.get('/api/cart', authenticateToken, async (req, res) => {
    try {
      const cartItems = await Cart.findAll({ where: { userId: req.user.id } });
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

module.exports = { controller: cartController };