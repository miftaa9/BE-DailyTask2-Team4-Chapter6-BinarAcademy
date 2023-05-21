const express = require("express");
const { product } = require('./models');
const app = express();
const PORT = 3000;

app.use(express.json());
const bodyParser = require('body-parser');




app.listen(1000, () => {
    console.log("app starting on port 1000")
})