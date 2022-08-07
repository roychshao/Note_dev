import express from 'express';
import auth from './../middleware/auth.js';
import { signup } from './../controller/user.js';

const router = express.Router();

router.post('/signup',auth, signup);

export default router;
