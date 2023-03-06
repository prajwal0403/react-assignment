const mongoose = require('mongoose')

const formDataSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    phone:Number,
})

const FormDataModel = mongoose.model('formData',formDataSchema);

module.exports={FormDataModel};