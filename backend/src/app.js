const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  return response.send('hello world');
});

app.listen(8888);