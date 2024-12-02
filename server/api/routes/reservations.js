import express from 'express';
import mongoose from 'mongoose';
import Reservation from '../models/reservations.js';
import Tools from '../models/product.js';
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
      .select('product quantity dateRange _id tool status pickupLocation contactName contactEmail contactPhone') // Pasirenkame tik tam tikrus laukus
      .exec();

    // Grazina rezultata su rezervaciju sarasu
    res.status(200).json({
      count: reservations.length,
      reservations: reservations.map((reservation) => ({
        _id: reservation._id,
        product: reservation.product,
        tool: reservation.tool,
        quantity: reservation.quantity,
        dateRange: reservation.dateRange,
        pickupLocation: reservation.pickupLocation,
        contactEmail: reservation.contactEmail,
        contactPhone: reservation.contactPhone,
        status: reservation.status,
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
  const { userId } = req.userData;
  const { productId, toolType, tool, quantity, dateRange, pickupLocation, contactName, contactEmail, contactPhone } = req.body;

  // Patikrina ar dateRange teisingai ivestas
  if (!dateRange || !dateRange.from || !dateRange.to) {
    return res.status(400).json({
      message: 'Invalid date range'
    });
  }

  try {
    // Patikrina ar produktas egzistuoja
    const product = await Tools.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Received dateRange:', dateRange);
    console.log('Creating reservation with data:', {
      productId,
      toolType,
      tool,
      quantity,
      userId,
      dateRange,
      pickupLocation,
      contactName,
      contactEmail,
      contactPhone
    });

    // Sukuria nauja rezervacija
    const reservation = new Reservation({
      _id: new mongoose.Types.ObjectId(),
      product: productId,
      toolType,
      tool,
      quantity: quantity || 1, // Jei nera kiekio, naudoja 1 kaip default
      userId: userId, // Autentifikacijos metu issaugotas userId
      pickupLocation,
      contactName,
      contactEmail,
      contactPhone,
      dateRange: {
        from: dateRange.from,
        to: dateRange.to
      }
    });
    console.log('Created reservation object:', reservation);

    // Iraso rezervacija i duomenu baze
    const savedReservation = await reservation.save();

    await Tools.findByIdAndUpdate(
      productId,
      {
        $push: {
          reservations: {
            userId: userId,
            reservationId: savedReservation._id,
            dateRange: {
              startDate: dateRange.from,
              endDate: dateRange.to
            }
          } // Push nauja irankio rezervacija tools sekcijoje
        }
      },
      { new: true } // Grazina atnaujinta user objekta
    );

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
        type: 'POST',
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
    const reservation = await Reservation.findOne({
      _id: req.params.reservationId,
      userId: req.userData.userId
    }).exec();
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Grazina rezervacijos informacija
    res.status(200).json({
      reservation: reservation,
      request: {
        type: 'UPDATE',
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
        type: 'DELETE',
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
