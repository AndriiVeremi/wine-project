import mongoose, { Schema, Document } from 'mongoose';

export interface IWinery extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  history: string;
  country: string;
  region: string;
  address: string;
  isVip: boolean;
  logoUrl: string;
  galleryUrl: string[];
  whereToBuy: { name: string; url: string }[];
}

const winerySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  history: { type: String },
  country: { type: String },
  region: { type: String },
  address: { type: String },
  isVip: { type: Boolean, default: false },
  logoUrl: { type: String },
  galleryUrl: [String],
  whereToBuy: [{ 
    name: String, 
    url: String 
  }],
});

export default mongoose.model<IWinery>('Winery', winerySchema);
