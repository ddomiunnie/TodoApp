const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/index');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', todoRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${PORT}`);
});
