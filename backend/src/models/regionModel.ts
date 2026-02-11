import { Schema, model } from 'mongoose';

const regionSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  imageUrl: { type: String },
  country: { type: Schema.Types.ObjectId, ref: 'Location' },
  climate: {
    title: { type: String },
    description: { type: String },
    features: [{ type: String }],
  },
  soils: {
    title: { type: String },
    description: { type: String },
    mainTypes: [{ type: String }],
    properties: [{ type: String }],
  },
  traditions: {
    title: { type: String },
    description: { type: String },
    rituals: [{ type: String }],
  },
  grapeVarieties: {
    title: { type: String },
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
    title: { type: String },
    description: { type: String },
    styles: [{ type: String }],
  },
  pdos: {
    title: { type: String },
    description: { type: String },
    list: [{ type: String }],
  },
  importance: {
    title: { type: String },
    description: { type: String },
    points: [{ type: String }],
  },
});

const Region = model('Region', regionSchema);

export default Region;
