'use strict';

require('dotenv').config();
const getBookByUser = require('./modal/User');
const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;


app.get('/book', getBookByUser);

app.listen(PORT, () => console.log(`listening on ${PORT}`));