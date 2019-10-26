//models
const User = require('../../models/User');
const Booking = require('../../models/Booking');

//helpers
const {dateToString} = require('../../helpers/date');

module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const bookings = await Booking.find()
                .populate('user')
                .populate('event');
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    event: {
                        ...booking.event._doc,
                        creator: User.findById(booking.event.creator),
                    },
                    createdAt: dateToString(booking.createdAt),
                    updatedAt: dateToString(booking.updatedAt),
                };
            });
        } catch (err) {
            throw err;
        }
    },

    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const user = req.user._id;
            const event = args.eventId;
            const newBooking = await new Booking({
                event,
                user,
            });
            return await newBooking.save();
        } catch (err) {
            throw err;
        }
    },

    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        //TODO: CEHCK IF USER IS THE OWNER OF THE BOOKING
        try {
            await Booking.findByIdAndDelete(args.bookingId);
            return 'You have canceled your booking';
        } catch (err) {
            throw err;
        }
    },
};
