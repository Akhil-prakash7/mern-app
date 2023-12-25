import express from 'express';
const router = express.Router();
import {google, signin, signup} from '../controllers/authController.js'

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);


export default router;