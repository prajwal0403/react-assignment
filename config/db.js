const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://prajwal:prajwal0403@banking.3hga9.mongodb.net/assignment?retryWrites=true&w=majority'
const connection = mongoose.connect(dbURL);

module.exports = { connection };
