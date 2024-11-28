import express from 'express';
import mongoose from 'mongoose';

import Reservation from '../models/reservations.js';
import Product from '../models/product.js';
import User from '../models/User.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// GET visi userio rezervacijos (naudojant auth middleware)
router.get('/', auth, async (req, res) => {
  // Is userData paimamas userId (id is JWT tokeno)
  const { userId } = req.userData;

  try {
    // Suranda visas rezervacijas pagal userId
    const reservations = await Reservation.find({ userId })
      .select('product quantity dateRange _id') // Pasirenkame tik tam tikrus laukus
      .exec();

    // Grazina rezultata su rezervaciju sarasu
    res.status(200).json({
      count: reservations.length,
      reservations: reservations.map((reservation) => ({
        _id: reservation._id,
        product: reservation.product,
        quantity: reservation.quantity,
        dateRange: reservation.dateRange,
        request: {
          type: 'GET',
          url: `http://localhost:3000/reservations/${reservation._id}`
        }
      }))
    });
  } catch (err) {
    // Klaida grazina 500 statusa
    res.status(500).json({ error: err.message });
  }
});

// POST sukuria nauja rezervacija (naudojant auth middleware)
router.post('/', auth, async (req, res) => {
  // Is request paimamas productId, quantity ir dateRange
  const { productId, quantity, dateRange } = req.body;
  const { userId } = req.body;

  // Patikrina ar dateRange teisingai ivestas
  if (!dateRange || !dateRange.from || !dateRange.to) {
    return res.status(400).json({
      message: 'Invalid date range'
    });
  }

  // Patikrina ar productId ir userId yra valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
  //     return res.status(400).json({
  //         message: 'Invalid productId or userId format'
  //     });
  // }

  try {
    // Patikrina ar produktas egzistuoja
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Sukuria nauja rezervacija
    const reservation = new Reservation({
      _id: new mongoose.Types.ObjectId(),
      product: productId,
      quantity: quantity || 1, // Jei nera kiekio, naudoja 1 kaip default
      userId: userId,
      dateRange: {
        from: new Date(),
        to: new Date()
      }
    });
    console.log(reservation);

    // Iraso rezervacija i duomenu baze
    const savedReservation = await reservation.save();

    // Prideda rezervacijos id i userio rezervaciju sarasa
    await User.findByIdAndUpdate(
      userId,
      { $push: { reservations: savedReservation._id } }, // Push nauja rezervacija
      { new: true } // Grazina atnaujinta user objekta
    );

    // Grazina atsaka su sukurta rezervacija
    res.status(201).json({
      message: 'Reservation created successfully',
      reservation: savedReservation,
      request: {
        type: 'GET',
        url: `http://localhost:3000/reservations/${savedReservation._id}`
      }
    });
  } catch (err) {
    // Grazina klaidos pranesima
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET vienos rezervacijos informacija pagal id
router.get('/:reservationId', auth, async (req, res) => {
  try {
    // Suranda rezervacija pagal id
    const reservation = await Reservation.findById(req.params.reservationId).exec();
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Grazina rezervacijos informacija
    res.status(200).json({
      reservation: reservation,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/reservations'
      }
    });
  } catch (err) {
    // Grazina klaidos pranesima
    res.status(500).json({ error: err.message });
  }
});

// DELETE rezervacija pagal id
router.delete('/:reservationId', auth, async (req, res) => {
  try {
    // Pasalina rezervacija pagal id
    const result = await Reservation.deleteOne({ _id: req.params.reservationId }).exec();

    // Grazina atsaka su informacija apie pasalinima
    res.status(200).json({
      message: 'Reservation deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/reservations',
        body: { productId: 'ID', quantity: 'Number' }
      }
    });
  } catch (err) {
    // Grazina klaidos pranesima
    res.status(500).json({ error: err.message });
  }
});

export default router;
