import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import {
    getAllContacts,
    deleteContact,
    updateContact,
    addNewContact,
} from '../controllers/contacts.js';

const router = express.Router();

// @route  GET /contacts
router.get('/', auth, getAllContacts);

// @route  POST /contacts
router.post(
    '/',
    auth, [check('name', 'Name is required').not().isEmpty()],
    addNewContact
);

// @route  PUT /contacts/:id
router.put('/:id', auth, updateContact);

// @route  DELETE /contacts/:id
router.delete('/:id', auth, deleteContact);

export default router;