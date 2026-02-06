import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_CREDS_JSON) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_CREDS_JSON must be set');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CREDS_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firebaseAdmin = admin;
