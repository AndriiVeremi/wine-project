import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '@/models/userModel';
import Winery from '@/models/wineryModel';
import Wine from '@/models/wineModel';
import Review from '@/models/reviewModel';
import Location from '@/models/locationModel';
import Grape from '@/models/grapeModel';
import Region from '@/models/regionModel';
import Tour from '@/models/tourModel';
import { firebaseAdmin } from '@/services/firebase';
import path from 'path';
import fs from 'fs';

dotenv.config();

const isProd = process.argv.includes('--prod');
const seedFilePath = isProd ? './seedData.prod' : './seedData';

const loadSeedData = async () => {
  try {
    console.log(`Attempting to load seed data from: ${seedFilePath}`);
    return await import(seedFilePath);
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error(`Failed to load ${seedFilePath}: ${err.message}`);
    throw error;
  }
};

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in environment variables');
      process.exit(1);
    }
    await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected for Seeding (${isProd ? 'PROD' : 'DEV'} mode)...`);
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

const uploadAndGetPublicUrl = async (localPath: string, destination: string): Promise<string> => {
  const bucket = firebaseAdmin.storage().bucket();

  await bucket.upload(localPath, {
    destination,
    public: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  await bucket.file(destination).makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${destination}`;
};

const importData = async () => {
  try {
    const { users, wineries, wines, reviews, locations, grapes, regions, tours } =
      await loadSeedData();

    console.log('Clearing existing data...');
    await User.deleteMany();
    await Winery.deleteMany();
    await Wine.deleteMany();
    await Review.deleteMany();
    await Location.deleteMany();
    await Grape.deleteMany();
    await Region.deleteMany();
    await Tour.deleteMany();
    console.log('Existing data cleared.');

    console.log('Importing locations...');
    for (const item of locations) {
      await Location.create(item);
    }

    console.log('Importing regions with automatic image upload...');
    const regionsDir = path.join(__dirname, '../../public/seeds/regions');
    const extensions = ['.png', '.jpg', '.jpeg', '.webp'];

    for (const item of regions) {
      const baseFileName = item.name.toLowerCase().replace(/\s+/g, '-');
      let foundPath = '';
      let foundExt = '';

      for (const ext of extensions) {
        const testPath = path.join(regionsDir, baseFileName + ext);
        if (fs.existsSync(testPath)) {
          foundPath = testPath;
          foundExt = ext;
          break;
        }
      }

      if (foundPath) {
        console.log(`Uploading image for region: ${item.name}...`);
        try {
          const destination = `regions/${baseFileName}${foundExt}`;
          item.imageUrl = await uploadAndGetPublicUrl(foundPath, destination);
        } catch (uploadErr) {
          console.error(`Failed to upload image for ${item.name}:`, uploadErr);
        }
      }
      await Region.create(item);
    }

    console.log('Importing grapes with automatic image upload...');
    const grapesDir = path.join(__dirname, '../../public/seeds/grapes');

    for (const item of grapes) {
      const baseFileName = item.name.toLowerCase().replace(/\s+/g, '-');
      let foundPath = '';
      let foundExt = '';

      for (const ext of extensions) {
        const testPath = path.join(grapesDir, baseFileName + ext);
        if (fs.existsSync(testPath)) {
          foundPath = testPath;
          foundExt = ext;
          break;
        }
      }

      if (foundPath) {
        console.log(`Uploading image for grape: ${item.name}...`);
        try {
          const destination = `grapes/${baseFileName}${foundExt}`;
          const publicUrl = await uploadAndGetPublicUrl(foundPath, destination);
          item.imageUrls = [publicUrl];
        } catch (uploadErr) {
          console.error(`Failed to upload image for ${item.name}:`, uploadErr);
        }
      }
      await Grape.create(item);
    }

    if (users && users.length) {
      console.log('Importing users...');
      for (const item of users) await User.create(item);
    }

    if (wineries && wineries.length) {
      console.log('Importing wineries...');
      for (const item of wineries) await Winery.create(item);
    }

    if (wines && wines.length) {
      console.log('Importing wines...');
      for (const item of wines) await Wine.create(item);
    }

    if (tours && tours.length) {
      console.log('Importing tours...');
      for (const item of tours) await Tour.create(item);
    }

    if (reviews && reviews.length) {
      console.log('Importing reviews...');
      for (const item of reviews) await Review.create(item);
    }

    console.log('Data Imported successfully!');
    process.exit();
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error(`Critical error during data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Winery.deleteMany();
    await Wine.deleteMany();
    await Review.deleteMany();
    await Location.deleteMany();
    await Grape.deleteMany();
    await Region.deleteMany();
    await Tour.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (err: unknown) {
    const error = err as { message?: string };
    console.error(`Error with data destruction: ${error.message}`);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  if (process.argv.includes('--delete')) {
    await destroyData();
  } else if (process.argv.includes('--import')) {
    await importData();
  } else {
    console.log('Please specify --import or --delete flag. Use --prod for production data.');
    process.exit(0);
  }
};

run();
