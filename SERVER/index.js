// server.js (Node.js API)
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3003;

// Enable CORS for all origins
app.use(cors()); //This is for connect backend to frontend code

// Define your API routes
app.get('/api/ISLSHIELD', (req, res) => {
  res.json({ message: 'Joy Mohunbagan' });
});
app.get('/api/NEWAPI', (req, res) => {
  res.json({ message: 'Ecoommerce' });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
