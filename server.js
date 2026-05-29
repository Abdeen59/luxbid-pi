const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// موافقة على الدفع
app.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  console.log('Approving payment:', paymentId);
  
  // الموافقة عبر Pi API
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
        'Authorization': 'Keye ju2vos7w4tyj5wabglmwp5sxrjc0ltetksp7zjaa2mt4bsgvqlwa7z9d1i05gcb ',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    }
  );
  
  const data = await response.json();
  res.json(data);
});
// إلغاء الدفعات المعلقة
app.post('/cancel', async (req, res) => {
  const { paymentId } = req.body;
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
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
