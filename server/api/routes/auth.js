import express from 'express';
import * as controller from '../controllers/authController.js'
const router = express.Router();

router.post('/signup', controller.userSignup);

router.post('/login', controller.userLogin);

export default router;

