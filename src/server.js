require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT;
const connectionString = process.env.CONNECTIONSTRING;

const app = express();

mongoose.connect(connectionString, {
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

module.exports = server;