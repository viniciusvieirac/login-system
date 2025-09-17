const express = require('express');
const app = express();
const routes = require('./routes/login');


app.use(express.json());

app.use('/api', routes);
app.get('/', (request, response) => {
  return response.send('hello world');
});

app.listen(8888);