import mongoose, { Schema, Document } from 'mongoose';

export interface IWinery extends Document {
  name: string;
  owner: mongoose.Types.ObjectId;
  history: string;
  country: mongoose.Types.ObjectId;
  region: mongoose.Types.ObjectId;
  address: string;
  isVip: boolean;
  logoUrl: string;
  galleryUrl: string[];
    whereToBuy: { name: string; url: string }[];
    contactEmail: string;
    contactPhone: string;
  }
  
  const winerySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    history: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Location' },
    region: { type: Schema.Types.ObjectId, ref: 'Location' },
    address: { type: String },
    isVip: { type: Boolean, default: false },
    logoUrl: { type: String },
    galleryUrl: [String],
    whereToBuy: [{
      name: String,
      url: String
    }],
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
  });
export default mongoose.model<IWinery>('Winery', winerySchema);
