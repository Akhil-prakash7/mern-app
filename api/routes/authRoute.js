import express from 'express';
const router = express.Router();
import {google, signOut, signin, signup} from '../controllers/authController.js'
import { verifyToken } from '../utils/verifyUser.js';

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',verifyToken,signOut)


export default router;