import mongoose, { Schema, Document } from 'mongoose';

export interface IGrape extends Document {
  name: string;
  description: string;
  type: 'red' | 'white' | 'rose';
  alsoKnownAs: string[];
  characteristics: string[];
  foodPairing: string[];
  imageUrl: string;
  regions: mongoose.Types.ObjectId[];
}

const grapeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  type: { type: String, enum: ['red', 'white', 'rose'] },
  alsoKnownAs: [String],
  characteristics: [String],
  foodPairing: [String],
  imageUrl: { type: String },
  regions: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
});

export default mongoose.model<IGrape>('Grape', grapeSchema);
