//models
const User = require('../../models/User');

//helpers
const {dateToString} = require('../../helpers/date');

module.exports = {
    users: async () => {
        try {
            const users = await User.find().populate('createdEvents');
            return users.map(user => {
                return {
                    ...user._doc,
                    createdEvents: user._doc.createdEvents.map(event => {
                        return {
                            ...event._doc,
                            date: dateToString(event.date),
                            creator: User.findById(event.creator),
                        };
                    }),
                };
            });
        } catch (err) {
            throw err;
        }
    },
};
