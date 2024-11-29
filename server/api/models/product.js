import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const toolsSchema = new Schema({
  toolType: { type: String, required: true },
  description: {
    nameRetail: { type: String, required: true },
    basePrice: { type: String, required: true },
    imageURIs: [String],
    details: {
      productType:{type: String, required: true},
      trademark:{type: String, required: true},
      model: String,
      generator_type: String,
      engine_type: String,
      fuel_type: String,
      power: Number,
      max_power: Number,
      nom_power: Number,
      noise_level: Number,
      fuel_container: Number,
      fuel_consumption: Number,
      starter_type: String,
      alternating_current: Number,
      oil_level_safety: Boolean,
      over_voltage_safety: Boolean,
      work_time: Number,
      single_phase_connection_number: Number,
      voltmeter: Boolean,
      voltage_regulator: Boolean,
      has_wheels: Boolean,
      length: Number,
      has_handles: Boolean,
      width: Number,
      height: Number,
      weight: Number,
      rotatios_per_minute: Number,
      impacts_per_minute: String,
      impact_energy: Number,
      type_of_cartrige: String,
      max_drill_diameter_cement: String,
      max_drill_diameter_wood: String,
      max_drill_diameter_metal: String,
      cable_length: Number,
      depth_protection: Boolean,
      drilling_with_impact: Boolean,
      drilling_without_impact: Boolean,
      warranty: {type: Number, required: true},
      company_warranty: {type: Number, required: true},
      origin_country: {type: String, required: true}
    }
  },
  isAvailable: { type: Boolean, required: true },
  isVisible: { type: Boolean, default: true },
  isDraft: { type: Boolean, required: true },
  reservation: [{ type: String, default: '' }],
  reviews: [{ type: String, default: '' }]
}, {timestamps: {createdAt: "createdAt"}});

export default mongoose.model('Tools', toolsSchema);

/*
const perforatorDetails = new Schema({
    productType: {type: String, required: true},
    trademark: {type: String, required: true},
    model:{type: String, required: true},
    weight: {type: String, required: true},
    power: {type: String, required: true},
    rotatios_per_minute: {type: Number, required: true},
    impacts_per_minute: {type: String, required: true},
    impact_energy: {type: Number, required: true},
    type_of_cartrige: {type: String, required: true},
    max_drill_diameter_cement: {type: String, required: true},
    max_drill_diameter_wood: {type: String, required: true},
    max_drill_diameter_metal: {type: String, required: true},
    cable_length: {type: Number, required:true},
    depth_protection: {type: Boolean, required: true},
    drilling_with_impact: {type: String, required: true},
    drilling_without_impact: {type: String, required: true},
    company_warranty: {type: Number, required: true},
    warranty: {type: Number, required: true},
    origin_country: {type: String, required: true}
})

const millDetails = new Schema({
    productType: {type:String, required: true},
    trademark: {type:String, required: true},
    weight: {typr:Number, required: true},
    power: {type:Number, required: true},
    rotations_per_minuite: {type:Number, required: true},
    max_mill_depth: {type:Number, required: true},
    noise_level: {type:Number, required: true},
    cable_length: {type:Number, required: true},
    company_warranty: {type:Number, required: true},
    warranty: {type:Number, required: true},
    origin_country: {type: String, required: true}
})

const vacuumDetails = new Schema ({
    productType: {type:String, required: true},
    trademark: {type:String, required: true},
    container_size: {type:Number, required: true},
    height: {type: Number, required: true},
    weight: {type: Number, required: true},
    power: {type: Number, required: true},
    dry_vacuum: {type: Boolean, required: true},
    liquid_vacuum: {type: Boolean, required: true},
    vacuum_type: {type: String, required: true},
    cable_length: {type: String, required: true},
    warranty: {type: String, required: true},
    company_warranty: {type:String, required: true},
    origin_country: {type:String, required: true}
})
    */
