const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const e = new Error("Not Authenticated/Token is wrong");
        e.statusCode = 500;
        throw e;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error("Not Authenticated/Token is wrong");
        error.statusCode = 401;
        throw err;
    }

    req.userId = decodedToken.userId;
    next();
}