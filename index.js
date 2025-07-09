const express = require('express');
const query = require('samp-query');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/sampstatus', (req, res) => {
  const { ip, port = 7777 } = req.query;

  if (!ip) return res.status(400).json({ error: 'Missing IP' });

  const options = {
    host: ip,
    port: parseInt(port),
    timeout: 2000
  };

  query(options, (error, response) => {
    if (error) {
      return res.status(500).json({ error: 'Query failed', details: error.message });
    }
    res.json(response);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SAMP Query API running on port ${PORT}`);
});