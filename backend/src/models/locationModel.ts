import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  type: 'country' | 'region';
  parentLocation?: mongoose.Types.ObjectId;
}

const LocationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['country', 'region'], required: true },
  parentLocation: { type: Schema.Types.ObjectId, ref: 'Location', default: null },
});

export default mongoose.model<ILocation>('Location', LocationSchema);
