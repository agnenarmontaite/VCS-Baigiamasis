import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Tools', required: true },
  toolType: { type: String, required: false },
  tool: { type: String, required: false },
  quantity: { type: Number, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupLocation: String,
  contactName: String,
  contactEmail: String,
  contactPhone: String,
  status: { type: String, default: 'Pending' },

  dateRange: {
    from: { type: Date, required: true, default: Date.now },
    to: { type: Date, required: true, default: Date.now }
  }
});

export default mongoose.model('Reservations', reservationSchema);
