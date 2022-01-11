import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
const jwtToken = config.get('jwtSecret');

// @access    Private
// @desc       Get logged in user
export const loggedInUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// @access    Public
// @desc      Auth user and get token
export const loginUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ msg: 'Invalid Credentials' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Credentials' });
		}
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
