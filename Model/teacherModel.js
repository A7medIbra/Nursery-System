const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-sequence')(mongoose);
var formidable = require('formidable');

const teacherSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: (value) => {
            return bcrypt.hashSync(value, 10);
        }
    },
    image: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        default: 'teacher',
        immutable: true
    }
});
module.exports = mongoose.model('teacher', teacherSchema);