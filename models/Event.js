const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'A title is required for an event'],
    },
    description: {
        type: String,
        trim: true,

        required: [true, 'A description is required for an event'],
    },
    price: {type: Number, required: [true, 'A price is required for an event']},
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // an event will have one creator
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
