const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    building : {
        type: String,
        required: true
    }
}, { _id: false })

const childSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ['PreKG', 'KG1', 'KG2']
    },
    role: {
        type: String,
        default: 'child',
        immutable: true
    },
    address: addressSchema
}, { _id: false })

childSchema.plugin(autoIncrement, { inc_field: '_id' });
module.exports = mongoose.model('child', childSchema);