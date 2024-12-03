import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Reservation from '../models/reservations.js';
import reservationsRouter from '../routes/reservations.js';
import Tools from '../models/product.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';


vi.mock('../models/reservations.js', () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    deleteOne: vi.fn(),
  },
}));

vi.mock('../models/product.js', () => ({
  default: {
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}));

vi.mock('../models/User.js', () => ({
  default: {
    findByIdAndUpdate: vi.fn(),
  },
}));


vi.mock('../middleware/auth.js', () => ({
  default: vi.fn((req, res, next) => {
    req.userData = { userId: 'mockUserId' };  
    next();
  }),
}));


const app = express();
app.use(express.json());
app.use('/reservations', reservationsRouter);

describe('Reservations API Tests', () => {
  

  it('GET / should return reservations for the authenticated user', async () => {
    const mockReservations = [
      {
        _id: 'mockReservationId',
        product: 'mockProductId',
        quantity: 2,
        dateRange: { from: '2024-01-01', to: '2024-01-10' },
      },
    ];

    Reservation.find.mockResolvedValue(mockReservations);


    const res = await request(app).get('/reservations').set('Authorization', 'Bearer mockToken');


    expect(res.status).toBe(200);
    expect(res.body.reservations).toHaveLength(1);
    expect(res.body.reservations[0].product).toBe('mockProductId');
  });

  it('POST / should create a new reservation', async () => {
    const mockProduct = { _id: 'mockProductId', name: 'Mock Tool' };
    const mockSavedReservation = {
      _id: 'mockReservationId',
      product: mockProduct._id,
      quantity: 1,
      userId: 'mockUserId',
      dateRange: { from: '2024-01-01', to: '2024-01-10' },
    };


    Tools.findById.mockResolvedValue(mockProduct);
    Reservation.prototype.save = vi.fn().mockResolvedValue(mockSavedReservation);
    Tools.findByIdAndUpdate.mockResolvedValue(mockProduct);
    User.findByIdAndUpdate.mockResolvedValue({});


    const res = await request(app)
      .post('/reservations')
      .send({
        productId: mockProduct._id,
        quantity: 1,
        dateRange: { from: '2024-01-01', to: '2024-01-10' },
      })
      .set('Authorization', 'Bearer mockToken');


    expect(res.status).toBe(201);
    expect(res.body.reservation.product).toBe(mockProduct._id);
  });
});