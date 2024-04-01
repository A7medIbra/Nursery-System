const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: Number,
        required: true,
        ref: 'teacher'
    },
    children: [{
        type: Number,
        ref: 'child'
    }]
})  
classSchema.plugin(autoIncrement, { inc_field: 'class_id' });
module.exports = mongoose.model('class', classSchema);