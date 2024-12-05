import express from 'express';
import auth from '../middleware/auth.js';
import * as controller from "../controllers/reservationsController.js"
import adminAuth from '../middleware/admin.js';

const router = express.Router();

// GET visi userio rezervacijos (naudojant auth middleware)
router.get('/', auth, adminAuth, controller.procureReservations);

// POST sukuria nauja rezervacija (naudojant auth middleware)
router.post('/', auth, controller.produceReservation);

// Traukiam rezervacijas pagal user ID
router.get('/user/:userId', auth, controller.procureUserReservations);

// Gaunam rezervacijas pagal specifini productId
router.get('/product/:productId', auth, controller.procureByProductId);

// GET vienos rezervacijos informacija pagal id
router.get('/:reservationId', auth, controller.procureReservation);

// DELETE rezervacija pagal id
router.delete('/:reservationId', auth, adminAuth, controller.eradicateReservation);

// PUT rezervaciju tvirtinimas
router.put('/:reservationId', auth, adminAuth, controller.reformReservation);

export default router;
