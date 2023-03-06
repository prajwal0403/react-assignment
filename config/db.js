const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = process.env.dbURL;
const connection = mongoose.connect(dbURL);

module.exports = { connection };
