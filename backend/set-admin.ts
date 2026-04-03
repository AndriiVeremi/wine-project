import { firebaseAdmin } from './src/services/firebase';
import mongoose from 'mongoose';
import User from './src/models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const setAdmin = async (uid: string) => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI is missing');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    await firebaseAdmin.auth().setCustomUserClaims(uid, { role: 'ADMIN' });
    console.log(`Successfully set ADMIN claim for user: ${uid}`);

    const user = await User.findOneAndUpdate(
      { firebaseUid: uid },
      { role: 'ADMIN' },
      { new: true }
    );

    if (user) {
      console.log(`Successfully updated MongoDB profile for: ${user.email}`);
    } else {
      console.log('User not found in MongoDB, but Firebase claims were set.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};


const uid = process.argv[2];
if (!uid) {
  console.log('Please provide Firebase UID: npx ts-node set-admin.ts <uid>');
  process.exit(1);
}

setAdmin(uid);
