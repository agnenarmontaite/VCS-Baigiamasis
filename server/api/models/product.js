import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const toolsSchema = new Schema({
  toolType: { type: String, required: true },
  description: {
    nameRetail: { type: String, required: true },
    basePrice: { type: String, required: true },
    imageURIs: [String],
    details: {}
  },
  isAvailable: { type: Boolean, required: true },
  isVisible: { type: Boolean, default: true },
  isDraft: { type: Boolean, required: true },
  reservation: [{ type: String, default: '' }],
  reviews: [{ type: String, default: '' }]
});

const generatorDetails = new Schema({
  productType: { type: String, required: true },
  trademark: { type: String, required: true },
  generator_type: { type: String, required: true },
  engine_type: { type: String, required: true },
  fuel_type: { type: String, required: true },
  max_power: { type: Number, required: true },
  nom_power: { type: Number, required: true },
  noise_level: { type: Number, required: true },
  fuel_container: { type: Number, required: true },
  fuel_consumption: { type: Number, required: true },
  starter_type: { type: String, required: true },
  alternating_current: { type: Number, required: true },
  oil_level_safety: { type: Boolean, required: true },
  over_voltage_safety: { type: Boolean, required: true },
  work_time: { type: Number, required: true },
  single_phase_connection_number: { type: Number, required: true },
  voltmeter: { type: Boolean, required: true },
  voltage_regulator: { type: Boolean, required: true },
  has_wheels: { type: Boolean, required: true },
  length: { type: Number, required: true },
  has_handles: { type: Boolean, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  warranty: { type: Number, required: true },
  weight: { type: Number, required: true },
  company_warranty: { type: Number, required: true },
  origin_country: { type: String, required: true }
});
const Tools = mongoose.model('Tools', toolsSchema);
const Gen = mongoose.model('Gen', generatorDetails);

export default { Tools, Gen };

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
