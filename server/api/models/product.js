import mongoose from 'mongoose';


const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    price: {type:Number, required:true},
    description: {type:String, required: true},
    image: {type:String, required: true}
})

export default mongoose.model('Tools', productSchema); 