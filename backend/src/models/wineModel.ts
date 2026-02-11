import mongoose, { Schema, Document } from 'mongoose';
import { IGrape } from '@/models/grapeModel';

export interface IWine extends Document {
  winery: mongoose.Types.ObjectId;
  name: string;
  vintage: number;
  grape: mongoose.Types.ObjectId;
  description: string;
  tastingNotes: string[];
  imageUrl: string;
  type: 'red' | 'white' | 'rose' | 'sparkling' | 'dessert';
  color: 'dry' | 'semi-dry' | 'semi-sweet' | 'sweet';
  averageRating: number;
  price: number;
}

const wineSchema: Schema = new Schema({
  winery: {
    type: Schema.Types.ObjectId,
    ref: 'Winery',
    required: true,
  },
  name: { type: String, required: true },
  vintage: { type: Number, required: true },
  grape: { type: Schema.Types.ObjectId, ref: 'Grape', required: true },
  description: { type: String },
  tastingNotes: [String],
  imageUrl: { type: String },
  type: {
    type: String,
    enum: ['red', 'white', 'rose', 'sparkling', 'dessert'],
    required: true,
  },
  color: {
    type: String,
    enum: ['dry', 'semi-dry', 'semi-sweet', 'sweet'],
    required: true,
  },
  averageRating: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

export default mongoose.model<IWine>('Wine', wineSchema);
