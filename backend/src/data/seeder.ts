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

dotenv.config();

const isProd = process.argv.includes('--prod');
const seedFilePath = isProd ? './seedData.prod' : './seedData';

const loadSeedData = async () => {
  try {
    return await import(seedFilePath);
  } catch (error) {
    if (isProd) {
      console.warn('Production seed data not found, falling back to default.');
      return await import('./seedData');
    }
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

    console.log('Importing regions...');
    for (const item of regions) {
      await Region.create(item);
    }

    console.log('Importing users...');
    for (const item of users) {
      await User.create(item);
    }

    console.log('Importing wineries...');
    for (const item of wineries) {
      await Winery.create(item);
    }

    console.log('Importing grapes...');
    for (const item of grapes) {
      await Grape.create(item);
    }

    console.log('Importing wines...');
    for (const item of wines) {
      await Wine.create(item);
    }

    console.log('Importing tours...');
    for (const item of tours) {
      await Tour.create(item);
    }

    console.log('Importing reviews...');
    for (const item of reviews) {
      await Review.create(item);
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
