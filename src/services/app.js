const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('../routes/authroutes'); // Import routes
const masterRoutes = require('../routes/masterdataroutes');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/WebApi', masterRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
