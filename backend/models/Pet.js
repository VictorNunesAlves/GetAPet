const mongoose = require('mongoose');
const { STRING } = require('sequelize');
const { Schema } = mongoose;

const Pet = mongoose.model(
    'Pet',
    new Schema({
            name: {
                type: String, required: true
            },
            age: {
                type: Number, required: true
            },
            weigth: {
                type: Number, required: true
            },
            color: {
                type: String, required: true
            },
            images: {
                type: Array, required: true
            },
            avaliable: {
                type: Boolean
            },
            user: Object,
            adopter: Object
        },
        {timestamp: true},
    )
)

module.exports = Pet