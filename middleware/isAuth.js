const User = require('../models/User');
const jwt = require('jsonwebtoken');

/////////protect routes//////////
exports.isAuth = async (req, res, next) => {
    //get the token and check if it is there
    let token;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        req.isAuth = false;
        return next();
    }
    //Verfication token
    let decode;
    try {
        decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    //check if user still exits
    const currentUser = await User.findById(decode.userId);
    if (!currentUser) {
        req.isAuth = false;
        return next();
    }

    // //GRANT ACCESS TO PROTECTED ROUTE
    req.isAuth = true;
    req.user = currentUser;
    next();
};
