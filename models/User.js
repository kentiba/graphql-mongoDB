const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'An email is required for a user'],
    },
    password: {
        type: String,
        required: [true, 'A password is required for a user'],
        select: false,
    },
    // a user can create many events
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
