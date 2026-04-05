import { firebaseAdmin } from './src/services/firebase';
import mongoose from 'mongoose';
import User from './src/models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const setAdmin = async (identifier: string) => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error('MONGO_URI is missing');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    let uid = identifier;

    if (identifier.includes('@')) {
      console.log(`Searching for Firebase user with email: ${identifier}...`);
      const userRecord = await firebaseAdmin.auth().getUserByEmail(identifier);
      uid = userRecord.uid;
      console.log(`Found user! UID is: ${uid}`);
    }

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
      console.log('Warning: User not found in MongoDB, but Firebase claims were set.');
    }

    process.exit(0);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      console.error(`❌ Error: User with identifier "${identifier}" not found in Firebase project.`);
      console.error('Please check if your .env points to the correct Firebase project.');
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
};

const input = process.argv[2];
if (!input) {
  console.log('Usage:');
  console.log('  By UID:   docker exec -it backend node -r ts-node/register set-admin.ts <UID>');
  console.log('  By Email: docker exec -it backend node -r ts-node/register set-admin.ts <EMAIL>');
  process.exit(1);
}

setAdmin(input);
