const jwt = require('jsonwebtoken');


module.exports.isAuth = (req, res, next) => {

    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const e = new Error("Not Authenticated/Token is wrong");
        e.statusCode = 500;
        throw e;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secret_key');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error("Not Authenticated/Token is wrong");
        error.statusCode = 401;
        throw err;
    }
    console.log(decodedToken.email_id);
    req.userId = decodedToken.email_id;
    next();
}