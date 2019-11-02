//models
const Event = require('../../models/Event');
const User = require('../../models/User');

//helpers
const {dateToString} = require('../../helpers/date');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator');
            return events.map(event => {
                return {
                    ...event._doc,
                    date: dateToString(event._doc.date),
                    creator: User.findById(event._doc.creator).populate(
                        'createdEvents',
                    ),
                };
            });
        } catch (err) {
            throw err;
        }
    },

    singleEvent: async args => {
        try {
            const event = await Event.findById(args.eventId).populate(
                'creator',
            );
            return {
                ...event._doc,
                date: dateToString(event._doc.date),
                creator: User.findById(event._doc.creator).populate(
                    'createdEvents',
                ),
            };
        } catch (err) {
            throw err;
        }
    },

    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }

        existedTitle = await Event.find({title: args.eventInput.title});
        if (existedTitle.length >= 1) {
            throw new Error('This name has already been used');
        }
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date,
                creator: req.user._id,
            });
            await event.save();
            const user = await User.findById(req.user._id);
            user.createdEvents.push(event);
            await user.save();
            return event;
        } catch (err) {
            throw err;
        }
    },
};
