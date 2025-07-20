const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();// Read .env
const app = express();
app.use(express.json());// Enable automatic parsing of JSON data in requests.

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Check DB connection
sequelize.authenticate()
  .then(() => console.log('MariaDB connection success'))
  .catch((error) => console.log('MariaDB connection failure: ', error));


// Run server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running'));