import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import dotenv from 'dotenv';
import 'multer';

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT_CREDS_JSON && process.env.NODE_ENV !== 'test') {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_CREDS_JSON must be set');
}

if (process.env.NODE_ENV !== 'test' && getApps().length === 0) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_CREDS_JSON!);
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `${serviceAccount.project_id}.firebasestorage.app`,
  });
}

export const firebaseAdmin = {
  auth: getAuth,
  storage: getStorage,
};

export const uploadFile = async (file: Express.Multer.File, folder: string): Promise<string> => {
  const bucket = getStorage().bucket();
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;
  const fileRef = bucket.file(fileName);

  await fileRef.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  await fileRef.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

export const deleteFile = async (url: string): Promise<void> => {
  if (!url) return;

  const bucket = getStorage().bucket();
  const bucketName = bucket.name;
  const baseUrl = `https://storage.googleapis.com/${bucketName}/`;

  if (!url.startsWith(baseUrl)) {
    return;
  }

  const fileName = url.replace(baseUrl, '');
  const fileRef = bucket.file(fileName);

  try {
    const [exists] = await fileRef.exists();
    if (exists) {
      await fileRef.delete();
    }
  } catch (error) {
    console.error(`Failed to delete file from Firebase Storage: ${url}`, error);
  }
};
