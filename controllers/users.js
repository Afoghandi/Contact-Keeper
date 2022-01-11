import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import config from 'config';
import jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';

const jwtToken = config.get('jwtSecret');
//@desc  Auth user and get token

//@access Public
export const authUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
        });
        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, jwtToken, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};