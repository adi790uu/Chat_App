const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const url = process.env.URL;
const dbStart = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.json({ msg: 'Api working...' });
});

dbStart(url);

app.use(errorHandler);

app.listen(port, () => {
  console.log('Server running');
});
