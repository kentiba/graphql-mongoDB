const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//models
const User = require('../../models/User');

module.exports = {
    createUser: async args => {
        try {
            const password = await bcrypt.hash(args.userInput.password, 12);

            if (!password) {
                throw new Error('password wasnt hashed');
            }
            const user = new User({
                email: args.userInput.email,
                password,
            });
            const savedUser = await user.save();
            return savedUser;
        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        try {
            const user = await User.findOne({email}).select('password');
            if (!user) {
                throw new Error('invalid Email or Password');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('invalid Email or Password');
            }
            const token = await jwt.sign(
                {userId: user._id},
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: process.env.JWT_EXPIRESIN,
                },
            );

            return {
                token,
                userId: user._id,
            };
        } catch (err) {
            throw err;
        }
    },
};
