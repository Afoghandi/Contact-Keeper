import express from 'express';
import { check } from 'express-validator';
import { authUser } from '../controllers/users.js';

const router = express.Router();

// @route   POST /auth
router.post(
    '/', [
        check('name', 'Name is required ').not().isEmpty(),
        check('email', 'Please incluse a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    authUser
);

export default router;