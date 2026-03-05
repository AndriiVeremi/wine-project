import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_CREDS_JSON) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_CREDS_JSON must be set');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CREDS_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.firebasestorage.app`,
});

export const firebaseAdmin = admin;

export const uploadFile = async (file: Express.Multer.File, folder: string): Promise<string> => {
  const bucket = admin.storage().bucket();
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;
  const fileRef = bucket.file(fileName);

  await fileRef.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  // Make the file publicly accessible
  await fileRef.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};
