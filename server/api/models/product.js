import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  toolType: String,   
  description: {
    nameRetail: String,
    basePrice: Number,
    imageURIs: [String],
    details: Object
  },
  isAvailable: String,
  isVisible: String,
  isDraft: String,
  reservations: [Object],
  reviews: [Object]
});

export default mongoose.model('Tools', productSchema);
