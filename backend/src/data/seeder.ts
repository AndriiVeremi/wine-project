import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '@/models/userModel';
import Winery from '@/models/wineryModel';
import Wine from '@/models/wineModel';
import Review from '@/models/reviewModel';
import Location from '@/models/locationModel';
import Grape from '@/models/grapeModel'; 
import { users, wineries, wines, reviews, locations, grapes } from '@/data/seedData'; 

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
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Winery.deleteMany();
    await Wine.deleteMany();
    await Review.deleteMany();
    await Location.deleteMany();
    await Grape.deleteMany(); 
    console.log('Existing data cleared.');

    console.log('Importing locations...');
    for (const item of locations) {
      try {
        await Location.create(item);
      } catch (error: any) {
        console.error(`Error importing location ${item.name}: ${error.message}`);
      }
    }
    console.log('Locations imported.');

    console.log('Importing users...');
    for (const item of users) {
      try {
        await User.create(item);
      } catch (error: any) {
        console.error(`Error importing user ${item.firstName} ${item.lastName}: ${error.message}`);
      }
    }
    console.log('Users imported.');

    console.log('Importing wineries...');
    for (const item of wineries) {
      try {
        await Winery.create(item);
      } catch (error: any) {
        console.error(`Error importing winery ${item.name}: ${error.message}`);
      }
    }
    console.log('Wineries imported.');

    console.log('Importing grapes...');
    for (const item of grapes) {
      try {
        await Grape.create(item);
      } catch (error: any) {
        console.error(`Error importing grape ${item.name}: ${error.message}`);
      }
    }
    console.log('Grapes imported.');

    console.log('Importing wines...');
    for (const item of wines) {
      try {
        let grapeId;
        if (item.grape instanceof mongoose.Types.ObjectId) {
            grapeId = item.grape;
        } else if (typeof item.grape === 'string') {
            console.log(`Attempting to cast string grape "${item.grape}" to ObjectId for wine "${item.name}"`);
            grapeId = new mongoose.Types.ObjectId(item.grape);
        } else {
            console.warn(`Grape for wine "${item.name}" is neither a string nor an ObjectId. Value: ${item.grape}, Type: ${typeof item.grape}`);
            grapeId = new mongoose.Types.ObjectId(item.grape);
        }
        
        await Wine.create({ ...item, grape: grapeId });
      } catch (error: any) {
        console.error(`Error importing wine ${item.name}: ${error.message}`);
      }
    }
    console.log('Wines imported.');

    console.log('Importing reviews...');
    for (const item of reviews) {
      try {
        await Review.create(item);
      } catch (error: any) {
        console.error(`Error importing review for wine ID ${item.wineId} by user ID ${item.userId}: ${error.message}`);
      }
    }
    console.log('Reviews imported.');

    console.log('Data Imported!');
    process.exit();
  } catch (error: any) {
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