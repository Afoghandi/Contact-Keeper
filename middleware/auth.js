import jwt from 'jsonwebtoken';

import config from 'config';

const jwtToken = config.get('jwtSecret');

const auth = async(req, res, next) => {
    //Get Token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        res.status(401).json({ msg: 'no token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtToken);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default auth;