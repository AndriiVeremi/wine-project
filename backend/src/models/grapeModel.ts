import mongoose, { Schema, Document } from 'mongoose';

export interface IGrape extends Document {
  name: string;
  description: string;
  type: 'red' | 'white' | 'rose';
  alsoKnownAs: string[];
  characteristics: string[];
  foodPairing: string[];
  imageUrls: string[];
  regions: mongoose.Types.ObjectId[];
  acidity: string;
  body: string;
  tannins?: string;
  aromas: string[];
  agingPotential: string;
}

const grapeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, enum: ['red', 'white', 'rose'] },
  alsoKnownAs: [String],
  characteristics: [String],
  foodPairing: [String],
  imageUrls: [String],
  regions: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  acidity: { type: String },
  body: { type: String },
  tannins: { type: String },
  aromas: [String],
  agingPotential: { type: String },
});

export default mongoose.model<IGrape>('Grape', grapeSchema);
