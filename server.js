import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import user from './routes/users.js';
import contact from './routes/contacts.js';

import auth from './routes/auth.js';

const app = express();

//connect Database
connectDB();

//init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send({ msg: 'Welcome to the contact api' }));

app.use('/users', user);
app.use('/auth', auth);
app.use('/contact', contact);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));