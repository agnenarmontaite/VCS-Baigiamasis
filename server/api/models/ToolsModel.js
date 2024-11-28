import mongoose from 'mongoose';
const Schema =  mongoose.Schema

const toolSchema = new Schema({
    description: {
        nameRetail: {type: String, required: true},
        basePrice: {type: Number, required: true},
        imageURIs: [String],
        details: {
            productType: {type: String, required: true},
            trademark: {type: String, required: true},
            generator_type: {type: String, required: true},
            engine_type: {type: String, required: true},
            fuel_type: {type: String, required: true},
            max_power: {type: Number, required: true},
            nom_power: {type: Number, required: true},
            noise_level: {type: Number, required: true},
            fuel_container: {type: Number, required: true},
            fuel_consumption: {type: Number, required: true},
            starter_type: {type: String, required: true},
            alternating_current: {type: Number, required: true},
            oil_level_safety: {type: Boolean, required: true},
            over_voltage_safety: {type: Boolean, required: true},
            work_time: {type: Number, required: true},
            single_phase_connection_number: {type: Number, required: true},
            voltmeter: {type: Boolean, required: true},
            voltage_regulator: {type: Boolean, required: true},
            has_wheels: {type: Boolean, required: true},
            length: {type: Number, required: true},
            has_handles: {type: Boolean, required: true},
            width: {type: Number, required: true},
            height: {type: Number, required: true},
            warranty: {type: Number, required: true},
            weight: {type: Number, required: true},
            company_warranty: {type: Number, required: true},
            origin_country: {type: String, required: true}
        }
    },
    isAvailable: {type: Boolean, default: true, required: true},
    isVisible: {type: Boolean, default: true, required: true},
    isDraft: {type: Boolean, default: true, required: true},
    reservation:[{type: String, default: "Placeholder"}],
    reviews:[{type: String, default: "Placeholder"}]
})

export default mongoose.model('Tools', toolSchema)