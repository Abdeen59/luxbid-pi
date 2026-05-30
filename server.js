const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

// موافقة على الدفع
app.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  console.log('Approving payment:', paymentId);
  const response = await fetch(
    `https://api.minepi.com/v2/payments/${paymentId}/approve`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
  res.json(data);
});

// إتمام الدفع
app.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  console.log('Completing payment:', paymentId);
  const response = await fetch(
    `https://api.minepi.com/v2/payments/${paymentId}/complete`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    }
  );
  const data = await response.json();
  res.json(data);
});

// إلغاء الدفع
app.post('/cancel', async (req, res) => {
  const { paymentId } = req.body;
  console.log('Cancelling payment:', paymentId);
  const response = await fetch(
    `https://api.minepi.com/v2/payments/${paymentId}/cancel`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await response.json();
  res.json(data);
});

// جلب الدفعات المعلقة
app.get('/pending', async (req, res) => {
  const response = await fetch(
    'https://api.minepi.com/v2/payments?payment_type=incomplete',
    {
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`
      }
    }
  );
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
