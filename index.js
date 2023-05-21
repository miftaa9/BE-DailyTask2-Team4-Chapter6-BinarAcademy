const express = require('express');
const path = require('path');
const { product } = require('./models');
const productRoutes = require('./routes/products');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/', productRoutes)

app.listen(PORT, () => console.log(`app starting on port ${PORT}`));