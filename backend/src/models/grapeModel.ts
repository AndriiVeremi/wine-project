import mongoose, { Schema, Document } from 'mongoose';

export interface IGrape extends Document {
  name: string;
  description: string;
  regions: string[];
}

const grapeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  regions: [String],
});

export default mongoose.model<IGrape>('Grape', grapeSchema);
