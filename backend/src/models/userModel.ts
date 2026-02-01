import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  name: string;
  email: string;
  role: 'USER' | 'WINERY_OWNER' | 'ADMIN';
  winery?: mongoose.Types.ObjectId;
  favoriteWines: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['USER', 'WINERY_OWNER', 'ADMIN'],
    default: 'USER',
  },
  winery: { 
    type: Schema.Types.ObjectId, 
    ref: 'Winery' 
  },
  favoriteWines: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Wine' 
  }],
});

export default mongoose.model<IUser>('User', userSchema);
