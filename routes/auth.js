import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import { loggedInUser, loginUser } from '../controllers/auth.js';

const router = express.Router();

//@route   GET localhost:5000/auth
router.get('/', auth, loggedInUser);

//@route    POST localhost:5000/auth
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	loginUser
);

export default router;
