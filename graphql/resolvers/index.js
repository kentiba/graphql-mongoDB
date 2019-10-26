const userResolver = require('./userResolver');
const eventResolver = require('./eventResolver');
const bookingResolver = require('./bookingResolver');
const authResolver = require('./authResolver');

const rootResolver = {
    ...userResolver,
    ...eventResolver,
    ...bookingResolver,
    ...authResolver,
};

module.exports = rootResolver;
