const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
        },
    },
    {
        // this will add createdAt & updatedAt automatically
        timestamps: true,
    },
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
