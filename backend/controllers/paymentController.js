const paypal = require('@paypal/checkout-server-sdk');
const authenticateToken = require('../middleware/authenticateToken');

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

const paymentController = (app) => {
  // Create PayPal Order
  app.post('/api/paypal/create-order', authenticateToken, async (req, res) => {
    const { items } = req.body;

    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD', 
            value: items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
              },
            },
          },
          items: items.map(item => ({
            name: item.productId,
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2),
            },
            quantity: item.quantity,
          })),
        }],
        application_context: {
          return_url: 'http://localhost:5173/success',
          cancel_url: 'http://localhost:5173/cancel',
        },
      });

      const order = await client.execute(request);
      res.status(200).json({ orderId: order.result.id });
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // Capture PayPal Order
  app.post('/api/paypal/capture-order', authenticateToken, async (req, res) => {
    const { orderId } = req.body;

    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      const capture = await client.execute(request);
      res.status(200).json({ status: capture.result.status });
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

module.exports = { controller: paymentController };