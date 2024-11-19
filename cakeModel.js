const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const CakeModel = new mongoose.model('cake', CakeSchema);

module.exports = CakeModel; 