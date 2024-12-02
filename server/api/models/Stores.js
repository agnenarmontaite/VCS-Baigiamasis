import mongoose from "mongoose";

const Schema = mongoose.Schema

const singularStoreSchema = new Schema({
    store_name: {type: String, required: true},
    address: {type: String, required: true},
    geo_location: [{type: String, required: true}],
    inventory: {}
})

const storesSchema = new Schema({
    location_city: {type: String, required: true},
    geo_location: [{type:Number, required: true}],
    stores: [singularStoreSchema]
})

export default mongoose.model('Stores', storesSchema)