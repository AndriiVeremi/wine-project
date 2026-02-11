import mongoose from 'mongoose';

const owner1Id = new mongoose.Types.ObjectId();
const owner2Id = new mongoose.Types.ObjectId();
const user1Id = new mongoose.Types.ObjectId();
const user2Id = new mongoose.Types.ObjectId();

const winery1Id = new mongoose.Types.ObjectId();
const winery2Id = new mongoose.Types.ObjectId();
const winery3Id = new mongoose.Types.ObjectId();

const wine1Id = new mongoose.Types.ObjectId();
const wine2Id = new mongoose.Types.ObjectId();
const wine3Id = new mongoose.Types.ObjectId();
const wine4Id = new mongoose.Types.ObjectId();
const wine5Id = new mongoose.Types.ObjectId();
const wine6Id = new mongoose.Types.ObjectId();

const kabernetSauvignonId = new mongoose.Types.ObjectId();
const chardonnayId = new mongoose.Types.ObjectId();
const merlotId = new mongoose.Types.ObjectId();
const kabernetFrancId = new mongoose.Types.ObjectId();
const rieslingId = new mongoose.Types.ObjectId();
const isabellaId = new mongoose.Types.ObjectId();

const ukraineId = new mongoose.Types.ObjectId();
const odesaId = new mongoose.Types.ObjectId();
const khersonId = new mongoose.Types.ObjectId();
const lvivId = new mongoose.Types.ObjectId();

const georgiaId = new mongoose.Types.ObjectId();
const guriaId = new mongoose.Types.ObjectId();
const imeretiId = new mongoose.Types.ObjectId();
const kakhetiId = new mongoose.Types.ObjectId();
const kvemoKartliId = new mongoose.Types.ObjectId();
const mtskhetaMtianetiId = new mongoose.Types.ObjectId();
const rachaLechkhumiKvemoSvanetiId = new mongoose.Types.ObjectId();
const samegreloZemoSvanetiId = new mongoose.Types.ObjectId();
const samtskheJavakhetiId = new mongoose.Types.ObjectId();
const shidaKartliId = new mongoose.Types.ObjectId();
const abkhaziaId = new mongoose.Types.ObjectId();
const adjaraId = new mongoose.Types.ObjectId();
const tbilisiId = new mongoose.Types.ObjectId();

export const locations = [
  { _id: ukraineId, name: 'Ukraine', type: 'country' },
  { _id: georgiaId, name: 'Georgia', type: 'country' },

  { _id: odesaId, name: 'Odesa', type: 'region', parentLocation: ukraineId },
  { _id: khersonId, name: 'Kherson', type: 'region', parentLocation: ukraineId },
  { _id: lvivId, name: 'Lviv', type: 'region', parentLocation: ukraineId },

  { _id: guriaId, name: 'Guria', type: 'region', parentLocation: georgiaId },
  { _id: imeretiId, name: 'Imereti', type: 'region', parentLocation: georgiaId },
  { _id: kakhetiId, name: 'Kakheti', type: 'region', parentLocation: georgiaId },
  { _id: kvemoKartliId, name: 'Kvemo Kartli', type: 'region', parentLocation: georgiaId },
  { _id: mtskhetaMtianetiId, name: 'Mtskheta-Mtianeti', type: 'region', parentLocation: georgiaId },
  {
    _id: rachaLechkhumiKvemoSvanetiId,
    name: 'Racha-Lechkhumi and Kvemo Svaneti',
    type: 'region',
    parentLocation: georgiaId,
  },
  {
    _id: samegreloZemoSvanetiId,
    name: 'Samegrelo-Zemo Svaneti',
    type: 'region',
    parentLocation: georgiaId,
  },
  {
    _id: samtskheJavakhetiId,
    name: 'Samtskhe-Javakheti',
    type: 'region',
    parentLocation: georgiaId,
  },
  { _id: shidaKartliId, name: 'Shida Kartli', type: 'region', parentLocation: georgiaId },
  { _id: abkhaziaId, name: 'Abkhazia', type: 'region', parentLocation: georgiaId },
  { _id: adjaraId, name: 'Adjara', type: 'region', parentLocation: georgiaId },
  { _id: tbilisiId, name: 'Tbilisi', type: 'region', parentLocation: georgiaId },
];

export const users = [
  {
    _id: owner1Id,
    firebaseUid: 'firebaseUid_owner1',
    firstName: 'Ivan',
    lastName: 'Owner',
    email: 'ivan.owner@example.com',
    role: 'WINERY_OWNER',
    winery: winery1Id,
    favoriteWines: [wine3Id, wine5Id],
  },
  {
    _id: owner2Id,
    firebaseUid: 'firebaseUid_owner2',
    firstName: 'Maria',
    lastName: 'Founder',
    email: 'maria.founder@example.com',
    role: 'WINERY_OWNER',
    winery: winery2Id,
    favoriteWines: [wine1Id],
  },
  {
    _id: user1Id,
    firebaseUid: 'firebaseUid_user1',
    firstName: 'Oleksandr',
    lastName: 'User',
    email: 'alex.user@example.com',
    role: 'USER',
    favoriteWines: [wine1Id, wine2Id, wine6Id],
  },
  {
    _id: user2Id,
    firebaseUid: 'firebaseUid_user2',
    firstName: 'Olena',
    lastName: 'Explorer',
    email: 'olena.explorer@example.com',
    role: 'USER',
    favoriteWines: [wine4Id],
  },
];

export const wineries = [
  {
    _id: winery1Id,
    name: 'Winery "Sunny Valley"',
    owner: owner1Id,
    history:
      'Our story begins with a great love for grapes grown under the warm Ukrainian sun.',
    country: ukraineId,
    region: odesaId,
    address: '1, Vynna St., Odesa',
    isVip: true,
    logoUrl: 'https://placehold.co/200x200/EEE/31343C?text=SD_Logo',
    galleryUrl: [
      'https://placehold.co/600x400/EEE/31343C?text=SD_Gallery_1',
      'https://placehold.co/600x400/EEE/31343C?text=SD_Gallery_2',
    ],
    whereToBuy: [{ name: 'GoodWine', url: 'https://goodwine.ua/sd' }],
    contactEmail: 'contact1@example.com',
    contactPhone: '+380991112233',
  },
  {
    _id: winery2Id,
    name: 'Chateau Kamenka',
    owner: owner2Id,
    history: 'A family winery that preserves the ancient winemaking traditions of the Kamenka region.',
    country: ukraineId,
    region: khersonId,
    address: '10, Tsentralna St., Kamenka village',
    isVip: false,
    logoUrl: 'https://placehold.co/200x200/EEE/31343C?text=CK_Logo',
    galleryUrl: [
      'https://placehold.co/600x400/EEE/31343C?text=CK_Gallery_1',
      'https://placehold.co/600x400/EEE/31343C?text=CK_Gallery_2',
    ],
    whereToBuy: [{ name: 'WineTime', url: 'https://winetime.ua/chateau' }],
    contactEmail: 'contact2@example.com',
    contactPhone: '+380994445566',
  },
  {
    _id: winery3Id,
    name: 'Wines of Prykarpattia',
    owner: owner1Id,
    history: 'A small winery in the Carpathians, specializing in unique local varieties.',
    country: ukraineId,
    region: lvivId,
    address: '5, Zamkova St., Stryi',
    isVip: false,
    logoUrl: 'https://placehold.co/200x200/EEE/31343C?text=VP_Logo',
    galleryUrl: [
      'https://placehold.co/600x400/EEE/31343C?text=VP_Gallery_1',
      'https://placehold.co/600x400/EEE/31343C?text=VP_Gallery_2',
    ],
    whereToBuy: [{ name: 'Rozetka', url: 'https://rozetka.com.ua/vp' }],
    contactEmail: 'contact3@example.com',
    contactPhone: '+380997778899',
  },
];

export const grapes = [
  { _id: kabernetSauvignonId, name: 'Cabernet Sauvignon' },
  { _id: chardonnayId, name: 'Chardonnay' },
  { _id: merlotId, name: 'Merlot' },
  { _id: kabernetFrancId, name: 'Cabernet Franc' },
  { _id: rieslingId, name: 'Riesling' },
  { _id: isabellaId, name: 'Isabella' },
];

export const wines = [
  {
    _id: wine1Id,
    winery: winery1Id,
    name: 'Cabernet Sauvignon Reserve',
    vintage: 2020,
    grape: kabernetSauvignonId,
    description: 'Exquisite red wine with a rich taste of black currant and notes of leather.',
    tastingNotes: ['black currant', 'leather', 'oak'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=CS_Reserve',
    type: 'red',
    color: 'dry',
    averageRating: 4.7,
    price: 850,
  },
  {
    _id: wine2Id,
    winery: winery1Id,
    name: 'Chardonnay Odesa',
    vintage: 2022,
    grape: chardonnayId,
    description:
      'Fresh white wine with bright fruit aromas and a light mineral aftertaste.',
    tastingNotes: ['green apple', 'lemon', 'minerals'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Chardonnay_Odesa',
    type: 'white',
    color: 'dry',
    averageRating: 4.5,
    price: 620,
  },
  {
    _id: wine3Id,
    winery: winery2Id,
    name: 'Merlot Kamenka',
    vintage: 2021,
    grape: merlotId,
    description: 'Velvety red wine with notes of plum, cherry and soft tannins.',
    tastingNotes: ['plum', 'cherry', 'vanilla'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Merlot_Kamenka',
    type: 'red',
    color: 'semi-dry',
    averageRating: 4.3,
    price: 580,
  },
  {
    _id: wine4Id,
    winery: winery2Id,
    name: 'Rose Cabernet',
    vintage: 2022,
    grape: kabernetFrancId,
    description: 'Refreshing rose wine with aromas of strawberry and a light, pleasant taste.',
    tastingNotes: ['strawberry', 'raspberry', 'citrus'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Rose_Cabernet',
    type: 'rose',
    color: 'dry',
    averageRating: 4.6,
    price: 490,
  },
  {
    _id: wine5Id,
    winery: winery3Id,
    name: 'Riesling Carpathian',
    vintage: 2020,
    grape: rieslingId,
    description: 'A unique white wine from the Carpathians with bright acidity and floral aromas.',
    tastingNotes: ['flowers', 'peach', 'minerals'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Riesling_Carpathian',
    type: 'white',
    color: 'semi-sweet', 
    averageRating: 4.2,
    price: 710,
  },
  {
    _id: wine6Id,
    winery: winery3Id,
    name: 'Isabella Sparkling',
    vintage: 2022,
    grape: isabellaId,
    description: 'Light sparkling wine with a characteristic berry aroma, ideal for celebrations.',
    tastingNotes: ['forest berries', 'muscat'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Isabella_Sparkling',
    type: 'sparkling',
    color: 'semi-dry',
    averageRating: 4.0,
    price: 380,
  },
];


export const reviews = [
  {
    wineId: wine1Id,
    userId: user1Id,
    rating: 5,
    comment: 'This wine is simply unsurpassed! The perfect taste for special moments.',
  },
  {
    wineId: wine1Id,
    userId: user2Id,
    rating: 4,
    comment: 'I liked it very much, but I would like a little more body.',
  },
  {
    wineId: wine2Id,
    userId: user1Id,
    rating: 4,
    comment: 'A wonderful everyday wine, pleasant and refreshing.',
  },
  {
    wineId: wine3Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Merlot Kamenka is the pride of our land. I recommend it!',
  },
  {
    wineId: wine4Id,
    userId: user2Id,
    rating: 3,
    comment: 'A little too light for my taste, but it will do for the summer.',
  },
];