import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  winery: mongoose.Types.ObjectId;
  name: string;
  description: string;
  duration: number;
  price: number;
  images: string[];
  groupSize: {
    min: number;
    max: number;
  };
}

const tourSchema: Schema = new Schema({
  winery: { 
    type: Schema.Types.ObjectId, 
    ref: 'Winery', 
    required: true 
  },
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },
  price: { type: Number },
  images: [String],
  groupSize: {
    min: { type: Number },
    max: { type: Number },
  },
});

export default mongoose.model<ITour>('Tour', tourSchema);
