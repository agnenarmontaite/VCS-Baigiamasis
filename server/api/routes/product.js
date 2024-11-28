import express from 'express';
const router = express.Router();
// import mongoose from 'mongoose';
// import Product from '../models/product.js';
import auth from '../middleware/auth.js';
import adminAuth from '../middleware/admin.js';
import * as controller from "../controllers/toolsController.js"

router.get('/', controller.procureTools);

router.get('/:id', controller.procureTool);

router.post('/', auth, adminAuth, controller.produceTool);

router.patch('/:id', controller.reformTool);

//router.patch('/:id', auth, adminAuth, controller.reformTool);

router.delete('/:id', auth, adminAuth, controller.eradicateTool);

export default router;
