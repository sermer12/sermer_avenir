const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const articleSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        content: {
            type: String,
            required: true,
            maxlength: 1500,
        },
        image: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('article', articleSchema);
