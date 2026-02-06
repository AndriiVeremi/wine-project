import mongoose from 'mongoose';

// User ID
const owner1Id = new mongoose.Types.ObjectId();
const owner2Id = new mongoose.Types.ObjectId();
const user1Id = new mongoose.Types.ObjectId();
const user2Id = new mongoose.Types.ObjectId();

// Winery ID
const winery1Id = new mongoose.Types.ObjectId();
const winery2Id = new mongoose.Types.ObjectId();
const winery3Id = new mongoose.Types.ObjectId();

// Wine ID
const wine1Id = new mongoose.Types.ObjectId();
const wine2Id = new mongoose.Types.ObjectId();
const wine3Id = new mongoose.Types.ObjectId();
const wine4Id = new mongoose.Types.ObjectId();
const wine5Id = new mongoose.Types.ObjectId();
const wine6Id = new mongoose.Types.ObjectId();

// Location ID
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
  // Країни
  { _id: ukraineId, name: 'Ukraine', type: 'country' },
  { _id: georgiaId, name: 'Georgia', type: 'country' },

  // Регіони України
  { _id: odesaId, name: 'Odesa', type: 'region', parentLocation: ukraineId },
  { _id: khersonId, name: 'Kherson', type: 'region', parentLocation: ukraineId },
  { _id: lvivId, name: 'Lviv', type: 'region', parentLocation: ukraineId },

  // Регіони грузії
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
    firstName: 'Іван',
    lastName: 'Власник',
    email: 'ivan.owner@example.com',
    role: 'WINERY_OWNER',
    winery: winery1Id,
    favoriteWines: [wine3Id, wine5Id],
  },
  {
    _id: owner2Id,
    firebaseUid: 'firebaseUid_owner2',
    firstName: 'Марія',
    lastName: 'Засновник',
    email: 'maria.founder@example.com',
    role: 'WINERY_OWNER',
    winery: winery2Id,
    favoriteWines: [wine1Id],
  },
  {
    _id: user1Id,
    firebaseUid: 'firebaseUid_user1',
    firstName: 'Олександр',
    lastName: 'Користувач',
    email: 'alex.user@example.com',
    role: 'USER',
    favoriteWines: [wine1Id, wine2Id, wine6Id],
  },
  {
    _id: user2Id,
    firebaseUid: 'firebaseUid_user2',
    firstName: 'Олена',
    lastName: 'Дослідниця',
    email: 'olena.explorer@example.com',
    role: 'USER',
    favoriteWines: [wine4Id],
  },
];

export const wineries = [
  {
    _id: winery1Id,
    name: 'Виноробня "Сонячна Долина"',
    owner: owner1Id,
    history:
      'Наша історія починається з великої любові до винограду, вирощеного під теплим українським сонцем.',
    country: ukraineId,
    region: odesaId,
    address: 'вул. Винна, 1, Одеса',
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
    name: 'Шато Каменка',
    owner: owner2Id,
    history: 'Сімейна виноробня, що зберігає старовинні традиції виноробства регіону Каменка.',
    country: ukraineId,
    region: khersonId,
    address: 'с. Каменка, вул. Центральна, 10',
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
    name: 'Вина Прикарпаття',
    owner: owner1Id,
    history: 'Невелика виноробня в Карпатах, що спеціалізується на унікальних локальних сортах.',
    country: ukraineId,
    region: lvivId,
    address: 'м. Стрий, вул. Замкова, 5',
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

export const wines = [
  {
    _id: wine1Id,
    winery: winery1Id,
    name: 'Каберне Совіньйон Резерв',
    vintage: 2020,
    grape: 'Каберне Совіньйон',
    description: 'Вишукане червоне вино з насиченим смаком чорної смородини та нотками шкіри.',
    tastingNotes: ['чорна смородина', 'шкіра', 'дуб'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=CS_Reserve',
    type: 'red',
    color: 'dry',
    averageRating: 4.7,
    price: 850,
  },
  {
    _id: wine2Id,
    winery: winery1Id,
    name: 'Шардоне Одеса',
    vintage: 2022,
    grape: 'Шардоне',
    description:
      'Свіже біле вино з яскравими фруктовими ароматами та легким мінеральним присмаком.',
    tastingNotes: ['зелене яблуко', 'лимон', 'мінерали'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Chardonnay_Odesa',
    type: 'white',
    color: 'dry',
    averageRating: 4.5,
    price: 620,
  },
  {
    _id: wine3Id,
    winery: winery2Id,
    name: 'Мерло Каменка',
    vintage: 2021,
    grape: 'Мерло',
    description: "Оксамитове червоне вино з нотками сливи, вишні та м'якими танінами.",
    tastingNotes: ['слива', 'вишня', 'ваніль'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Merlot_Kamenka',
    type: 'red',
    color: 'semi-dry',
    averageRating: 4.3,
    price: 580,
  },
  {
    _id: wine4Id,
    winery: winery2Id,
    name: 'Розе Каберне',
    vintage: 2022,
    grape: 'Каберне Фран',
    description: 'Освіжаюче рожеве вино з ароматами полуниці та легким, приємним смаком.',
    tastingNotes: ['полуниця', 'малина', 'цитрус'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Rose_Cabernet',
    type: 'rose',
    color: 'dry',
    averageRating: 4.6,
    price: 490,
  },
  {
    _id: wine5Id,
    winery: winery3Id,
    name: 'Рислинг Карпатський',
    vintage: 2020,
    grape: 'Ріслінг',
    description: 'Унікальне біле вино з Карпат з яскравою кислотністю та ароматами квітів.',
    tastingNotes: ['квіти', 'персик', 'мінерали'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Riesling_Carpathian',
    type: 'white',
    color: 'sweet',
    averageRating: 4.2,
    price: 710,
  },
  {
    _id: wine6Id,
    winery: winery3Id,
    name: 'Ізабелла Ігриста',
    vintage: 2022,
    grape: 'Ізабелла',
    description: 'Легке ігристе вино з характерним ягідним ароматом, ідеальне для святкування.',
    tastingNotes: ['лісові ягоди', 'мускат'],
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
    comment: 'Це вино просто неперевершене! Ідеальний смак для особливих моментів.',
  },
  {
    wineId: wine1Id,
    userId: user2Id,
    rating: 4,
    comment: 'Дуже сподобалось, але хотілося б трохи більше тіла.',
  },
  {
    wineId: wine2Id,
    userId: user1Id,
    rating: 4,
    comment: 'Чудове повсякденне вино, приємне і освіжаюче.',
  },
  {
    wineId: wine3Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Мерло Каменка - гордість нашої землі. Рекомендую!',
  },
  {
    wineId: wine4Id,
    userId: user2Id,
    rating: 3,
    comment: 'Трохи занадто легке для мого смаку, але для літа підійде.',
  },
];
