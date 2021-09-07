const express = require('express');
const app = express();
const bodyParse = require('body-parser');
var cors = require('cors');
const routes = require('./routes/index');
// require('dotenv').config();
app.use(cors());
app.use(bodyParse.json());
app.use(routes);
app.use((req, res, next) => {
    res.status(404).send("<h1>Page Not Found</h1>");
})
app.listen(9000);
