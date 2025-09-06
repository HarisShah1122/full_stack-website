const authenticateToken = require('../middleware/authenticateToken');
const axios = require('axios');
const Order = require('../models/Order');

const paymentController = (app) => {
  app.post('/api/payment/create-order', authenticateToken, async (req, res) => {
    const { items, paymentMethod } = req.body;
    const userId = req.user.id;

    try {
      const totalAmount = items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

      if (paymentMethod === 'COD') {
        const order = await Order.create({
          userId,
          orderId: `COD-${Date.now()}`,
          paymentMethod,
          amount: totalAmount,
          status: 'PENDING',
        });
        return res.status(200).json({
          orderId: order.orderId,
          message: 'Cash on Delivery order created successfully',
        });
      }

      const orderData = {
        amount: totalAmount,
        currency: 'PKR',
        items: items.map((item) => ({
          name: item.productId,
          quantity: item.quantity,
          unit_amount: item.price.toFixed(2),
        })),
        return_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      };

      let orderResponse;

      if (paymentMethod === 'HBL') {
        try {
          const hblResponse = await axios.post(
            'https://api.hbl.com/payments/create',
            {
              merchant_id: process.env.HBL_MERCHANT_ID,
              amount: totalAmount,
              currency: 'PKR',
              order_id: `HBL-${Date.now()}`,
              return_url: orderData.return_url,
              cancel_url: orderData.cancel_url,
              items: orderData.items,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.HBL_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
          orderResponse = {
            orderId: hblResponse.data.order_id,
            paymentUrl: hblResponse.data.payment_url,
          };
        } catch (error) {
          console.error('Error creating HBL order:', error);
          return res.status(500).json({ error: 'Failed to create HBL order' });
        }
      } else if (paymentMethod === 'JazzCash') {
        try {
          const jazzCashResponse = await axios.post(
            'https://api.jazzcash.com.pk/payments/initiate',
            {
              pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID,
              pp_Amount: totalAmount * 100,
              pp_TxnCurrency: 'PKR',
              pp_TxnRefNo: `JC-${Date.now()}`,
              pp_ReturnURL: orderData.return_url,
              pp_CancelURL: orderData.cancel_url,
              pp_BillReference: `BILL-${Date.now()}`,
              items: orderData.items,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.JAZZCASH_API_KEY}`,
              },
            }
          );
          orderResponse = {
            orderId: jazzCashResponse.data.pp_TxnRefNo,
            paymentUrl: jazzCashResponse.data.payment_url,
          };
        } catch (error) {
          console.error('Error creating JazzCash order:', error);
          return res.status(500).json({ error: 'Failed to create JazzCash order' });
        }
      } else if (paymentMethod === 'UBL') {
        try {
          const ublResponse = await axios.post(
            'https://api.ubl.com.pk/payments/initiate',
            {
              merchant_id: process.env.UBL_MERCHANT_ID,
              amount: totalAmount,
              currency: 'PKR',
              order_id: `UBL-${Date.now()}`,
              return_url: orderData.return_url,
              cancel_url: orderData.cancel_url,
              items: orderData.items,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.UBL_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
          orderResponse = {
            orderId: ublResponse.data.order_id,
            paymentUrl: ublResponse.data.payment_url,
          };
        } catch (error) {
          console.error('Error creating UBL order:', error);
          return res.status(500).json({ error: 'Failed to create UBL order' });
        }
      } else if (paymentMethod === 'EasyPay') {
        try {
          const easyPayResponse = await axios.post(
            'https://api.easypay.com.pk/payments/initiate',
            {
              merchant_id: process.env.EASYPAY_MERCHANT_ID,
              amount: totalAmount,
              currency: 'PKR',
              order_id: `EP-${Date.now()}`,
              return_url: orderData.return_url,
              cancel_url: orderData.cancel_url,
              items: orderData.items,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.EASYPAY_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
          orderResponse = {
            orderId: easyPayResponse.data.order_id,
            paymentUrl: easyPayResponse.data.payment_url,
          };
        } catch (error) {
          console.error('Error creating EasyPay order:', error);
          return res.status(500).json({ error: 'Failed to create EasyPay order' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      res.status(200).json({
        orderId: orderResponse.orderId,
        paymentUrl: orderResponse.paymentUrl,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/payment/capture-order', authenticateToken, async (req, res) => {
    const { orderId, paymentMethod } = req.body;

    try {
      if (paymentMethod === 'COD') {
        return res.status(200).json({ status: 'CONFIRMED', message: 'COD order confirmed' });
      }

      let captureResponse;

      if (paymentMethod === 'HBL') {
        captureResponse = await axios.post(
          'https://api.hbl.com/payments/capture',
          {
            merchant_id: process.env.HBL_MERCHANT_ID,
            order_id: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HBL_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else if (paymentMethod === 'JazzCash') {
        captureResponse = await axios.post(
          'https://api.jazzcash.com.pk/payments/capture',
          {
            pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID,
            pp_TxnRefNo: orderId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.JAZZCASH_API_KEY}`,
            },
          }
        );
      } else if (paymentMethod === 'UBL') {
        captureResponse = await axios.post(
          'https://api.ubl.com.pk/payments/capture',
          {
            merchant_id: process.env.UBL_MERCHANT_ID,
            order_id: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.UBL_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else if (paymentMethod === 'EasyPay') {
        captureResponse = await axios.post(
          'https://api.easypay.com.pk/payments/capture',
          {
            merchant_id: process.env.EASYPAY_MERCHANT_ID,
            order_id: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.EASYPAY_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        return res.status(400).json({ error: 'Invalid payment method' });
      }

      res.status(200).json({
        status: captureResponse.data.status || 'COMPLETED',
        message: 'Payment captured successfully',
      });
    } catch (error) {
      console.error('Error capturing order:', error);
      res.status(500).json({ error: 'Failed to capture payment' });
    }
  });
};

module.exports = { controller: paymentController };