const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/authroutes'); // Import routes
const masterRoutes = require('./src/routes/masterdataroutes');
const userRoutes = require('./src/routes/userroutes');
const courseRoutes = require('./src/routes/courseDetailesroutes');
//const mobileapproutes = require('./src/routes/masterdataroutes');
const app = express();
//const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/webapi', masterRoutes);
app.use('/webapi', userRoutes);
app.use('/webapi', courseRoutes);
//app.use('/mobileapp/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
