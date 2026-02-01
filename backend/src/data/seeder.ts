import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '@/models/userModel';
import Winery from '@/models/wineryModel';
import Wine from '@/models/wineModel';
import Review from '@/models/reviewModel';
import { users, wineries, wines, reviews } from './seedData';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in environment variables');
      process.exit(1);
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err: any) {
    console.error(`Error connecting to DB: ${err.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Очищення перед завантаженням
    await User.deleteMany();
    await Winery.deleteMany();
    await Wine.deleteMany();
    await Review.deleteMany();

    // Завантаження даних
    await User.insertMany(users);
    await Winery.insertMany(wineries);
    await Wine.insertMany(wines);
    await Review.insertMany(reviews);


    console.log('Data Imported!');
    process.exit();
  } catch (error: any) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Winery.deleteMany();
    await Wine.deleteMany();
    await Review.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error: any) {
    console.error(`Error with data destruction: ${error.message}`);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();

  if (process.argv[2] === '--delete') {
    await destroyData();
  } else if (process.argv[2] === '--import') {
    await importData();
  } else {
    console.log('Please specify --import or --delete flag');
    process.exit(0);
  }
};

run();