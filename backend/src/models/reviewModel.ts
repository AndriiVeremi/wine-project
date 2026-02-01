import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  wineId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema: Schema = new Schema({
  wineId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Wine', 
    required: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { type: String },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model<IReview>('Review', reviewSchema);
