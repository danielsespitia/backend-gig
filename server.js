const express = require('express');
const { connect } = require('./src/db');

const port = process.env.PORT || 8000;

const app = express();
connect();

app.use(express.json());

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});