const express = require('express');
const app = express();
const routes = require('./routes/login');
require('./database');
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use('/api', routes);
app.get('/', (request, response) => {
  return response.send('vasco da gama');
});

app.listen(8888, () => {
  console.log('Server is running on port 8888');
});