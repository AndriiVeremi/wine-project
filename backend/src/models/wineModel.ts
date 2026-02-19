import mongoose, { Schema, Document } from 'mongoose';

export interface IWine extends Document {
  winery: mongoose.Types.ObjectId;
  name: string;
  vintage: number;
  grape: mongoose.Types.ObjectId;
  description: string;
  tastingNotes: string[];
  imageUrl: string;
  color: 'red' | 'white' | 'rose' | 'orange';
  sweetness: 'dry' | 'semi-dry' | 'semi-sweet' | 'sweet';
  averageRating: number;
  price: number;
  volume?: number;
  boxQuantity?: number;
  hasPackaging?: boolean;
  alcohol?: string;
  decanting?: boolean;
  bottleDiameter?: string;
  servingTemperature?: string;
  foodPairing?: string[];
  supplier?: string;
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
  color: {
    type: String,
    enum: ['red', 'white', 'rose', 'orange'],
    required: true,
  },
  sweetness: {
    type: String,
    enum: ['dry', 'semi-dry', 'semi-sweet', 'sweet'],
    required: true,
  },
  averageRating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  volume: { type: Number },
  boxQuantity: { type: Number },
  hasPackaging: { type: Boolean },
  alcohol: { type: String },
  decanting: { type: Boolean },
  bottleDiameter: { type: String },
  servingTemperature: { type: String },
  foodPairing: [String],
  supplier: { type: String },
});

export default mongoose.model<IWine>('Wine', wineSchema);
