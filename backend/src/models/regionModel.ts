import { Schema, model } from 'mongoose';

const regionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String },
  country: { type: Schema.Types.ObjectId, ref: 'Location' },
  locationAndClimate: {
    title: { type: String, default: 'Geographic Location and Climate' },
    description: { type: String },
    features: [{ type: String }],
  },
  soils: {
    title: { type: String, default: 'Soils of Region' },
    description: { type: String },
    mainTypes: [{ type: String }],
    properties: [{ type: String }],
  },
  cultureAndTraditions: {
    title: { type: String, default: 'Winemaking Culture and Traditions' },
    description: { type: String },
    rituals: [{ type: String }],
  },
  grape: {
    title: { type: String, default: 'Main Grape Varieties of Region' },
    white: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
    red: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
  },
  typicalWines: {
    title: { type: String, default: 'Typical Wines of the Region' },
    description: { type: String },
    styles: [{ type: String }],
  },
  pdo: {
    title: { type: String, default: 'Protected Designations of Origin (PDO)' },
    description: { type: String },
    list: [{ type: String }],
  },
  regionImportance: {
    title: { type: String, default: 'Importance of Region for Georgian Winemaking' },
    description: { type: String },
    points: [{ type: String }],
  },
});

const Region = model('Region', regionSchema);

export default Region;
