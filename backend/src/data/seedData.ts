import mongoose from 'mongoose';

const user1Id = new mongoose.Types.ObjectId();
const user2Id = new mongoose.Types.ObjectId();
const user3Id = new mongoose.Types.ObjectId();
const user4Id = new mongoose.Types.ObjectId();
const user5Id = new mongoose.Types.ObjectId();
const owner1Id = new mongoose.Types.ObjectId();

const georgiaId = new mongoose.Types.ObjectId();
const ukraineId = new mongoose.Types.ObjectId();

const kakhetiId = new mongoose.Types.ObjectId();
const imeretiId = new mongoose.Types.ObjectId();
const rachaId = new mongoose.Types.ObjectId();
const kartliId = new mongoose.Types.ObjectId();
const adjaraId = new mongoose.Types.ObjectId();
const tbilisiId = new mongoose.Types.ObjectId();
const guriaId = new mongoose.Types.ObjectId();
const samtskheJavakhetiId = new mongoose.Types.ObjectId();
const zakarpattiaId = new mongoose.Types.ObjectId();
const odesaId = new mongoose.Types.ObjectId();
const khersonId = new mongoose.Types.ObjectId();
const mykolaivId = new mongoose.Types.ObjectId();

const win1Id = new mongoose.Types.ObjectId();
const win2Id = new mongoose.Types.ObjectId();
const win3Id = new mongoose.Types.ObjectId();
const win4Id = new mongoose.Types.ObjectId();
const win5Id = new mongoose.Types.ObjectId();
const win6Id = new mongoose.Types.ObjectId();
const win7Id = new mongoose.Types.ObjectId();
const win8Id = new mongoose.Types.ObjectId();
const win9Id = new mongoose.Types.ObjectId();
const win10Id = new mongoose.Types.ObjectId();

const saperaviId = new mongoose.Types.ObjectId();
const rkatsiteliId = new mongoose.Types.ObjectId();
const kisiId = new mongoose.Types.ObjectId();
const mtsvaneId = new mongoose.Types.ObjectId();
const khikhviId = new mongoose.Types.ObjectId();
const tavkveriId = new mongoose.Types.ObjectId();
const chkhaveriId = new mongoose.Types.ObjectId();
const shavkapitoId = new mongoose.Types.ObjectId();
const krakhunaId = new mongoose.Types.ObjectId();
const tsitskaId = new mongoose.Types.ObjectId();
const chinuriId = new mongoose.Types.ObjectId();
const usakhelouriId = new mongoose.Types.ObjectId();
const goruliMtsvaneId = new mongoose.Types.ObjectId();
const budeshuriId = new mongoose.Types.ObjectId();
const cabernetSauvignonId = new mongoose.Types.ObjectId();

const wine1Id = new mongoose.Types.ObjectId();
const wine2Id = new mongoose.Types.ObjectId();
const wine3Id = new mongoose.Types.ObjectId();
const wine4Id = new mongoose.Types.ObjectId();
const wine5Id = new mongoose.Types.ObjectId();
const wine6Id = new mongoose.Types.ObjectId();
const wine7Id = new mongoose.Types.ObjectId();
const wine8Id = new mongoose.Types.ObjectId();
const wine9Id = new mongoose.Types.ObjectId();
const wine10Id = new mongoose.Types.ObjectId();
const wine11Id = new mongoose.Types.ObjectId();
const wine12Id = new mongoose.Types.ObjectId();
const wine13Id = new mongoose.Types.ObjectId();
const wine14Id = new mongoose.Types.ObjectId();
const wine15Id = new mongoose.Types.ObjectId();
const wine16Id = new mongoose.Types.ObjectId();
const wine17Id = new mongoose.Types.ObjectId();
const wine18Id = new mongoose.Types.ObjectId();
const wine19Id = new mongoose.Types.ObjectId();
const wine20Id = new mongoose.Types.ObjectId();
const wine21Id = new mongoose.Types.ObjectId();
const wine22Id = new mongoose.Types.ObjectId();
const wine23Id = new mongoose.Types.ObjectId();
const wine24Id = new mongoose.Types.ObjectId();
const wine25Id = new mongoose.Types.ObjectId();
const wine26Id = new mongoose.Types.ObjectId();
const wine27Id = new mongoose.Types.ObjectId();
const wine28Id = new mongoose.Types.ObjectId();
const wine29Id = new mongoose.Types.ObjectId();
const wine30Id = new mongoose.Types.ObjectId();

export const locations = [
  { _id: georgiaId, name: 'Georgia', type: 'country' },
  { _id: ukraineId, name: 'Ukraine', type: 'country' },
  { _id: kakhetiId, name: 'Kakheti', type: 'region', parentLocation: georgiaId },
  { _id: imeretiId, name: 'Imereti', type: 'region', parentLocation: georgiaId },
  { _id: rachaId, name: 'Racha-Lechkhumi', type: 'region', parentLocation: georgiaId },
  { _id: kartliId, name: 'Kartli', type: 'region', parentLocation: georgiaId },
  { _id: adjaraId, name: 'Adjara', type: 'region', parentLocation: georgiaId },
  { _id: tbilisiId, name: 'Tbilisi', type: 'region', parentLocation: georgiaId },
  { _id: guriaId, name: 'Guria', type: 'region', parentLocation: georgiaId },
  {
    _id: samtskheJavakhetiId,
    name: 'Samtskhe-Javakheti',
    type: 'region',
    parentLocation: georgiaId,
  },
  { _id: zakarpattiaId, name: 'Zakarpattia', type: 'region', parentLocation: ukraineId },
  { _id: odesaId, name: 'Odesa', type: 'region', parentLocation: ukraineId },
  { _id: khersonId, name: 'Kherson', type: 'region', parentLocation: ukraineId },
  { _id: mykolaivId, name: 'Mykolaiv', type: 'region', parentLocation: ukraineId },
];

export const regions = [
  {
    _id: kakhetiId,
    name: 'Kakheti',
    description:
      'The cradle of Georgian wine culture. This eastern region is famous for its ancient qvevri winemaking tradition and produces the majority of Georgias premium wines. The unique terroir with diverse microclimates creates ideal conditions for both red and white grape varieties.',
    imageUrl: 'https://placehold.co/600x400/841013/FFFFFF?text=Kakheti',
  },
  {
    _id: imeretiId,
    name: 'Imereti',
    description:
      'The green heart of Georgia, famous for its fresh white wines and traditional winemaking methods. Located in the western part of the country, Imereti enjoys a humid subtropical climate perfect for cultivating delicate grape varieties.',
    imageUrl: 'https://placehold.co/600x400/006633/FFFFFF?text=Imereti',
  },
  {
    _id: rachaId,
    name: 'Racha-Lechkhumi',
    description:
      'A mountainous region in northwestern Georgia known for premium red wines. The high-altitude vineyards at 800-1200 meters create unique conditions for slow-ripening grapes. Racha is famous for producing prestigious aged wines.',
    imageUrl: 'https://placehold.co/600x400/5D4037/FFFFFF?text=Racha',
  },
  {
    _id: kartliId,
    name: 'Kartli',
    description:
      'The central region surrounding Tbilisi, offering diverse microclimates and soils. Kartli has emerged as a center for natural and orange wines, with many small producers experimenting with ancient varieties.',
    imageUrl: 'https://placehold.co/600x400/455A64/FFFFFF?text=Kartli',
  },
  {
    _id: adjaraId,
    name: 'Adjara',
    description:
      'A scenic coastal region in southwestern Georgia with a unique maritime climate. Adjara is renowned for producing Chkhaveri, a rare pink grape variety that creates elegant rose wines.',
    imageUrl: 'https://placehold.co/600x400/0277BD/FFFFFF?text=Adjara',
  },
  {
    _id: tbilisiId,
    name: 'Tbilisi',
    description:
      'The capital region and urban winemaking hub of Georgia. While not a traditional wine region, Tbilisi hosts many innovative wineries and wine bars showcasing diverse wine culture.',
    imageUrl: 'https://placehold.co/600x400/37474F/FFFFFF?text=Tbilisi',
  },
  {
    _id: guriaId,
    name: 'Guria',
    description:
      'A small but significant region in western Georgia known for rare indigenous varieties. Guria produces distinctive wines from Tsolikouri and other local grapes.',
    imageUrl: 'https://placehold.co/600x400/2E7D32/FFFFFF?text=Guria',
  },
  {
    _id: samtskheJavakhetiId,
    name: 'Samtskhe-Javakheti',
    description:
      'A southern highland region with a continental climate ideal for wine production. The region is known for producing robust wines with high acidity from varieties adapted to harsh winters.',
    imageUrl: 'https://placehold.co/600x400/6D4C41/FFFFFF?text=Samtskhe',
  },
  {
    _id: zakarpattiaId,
    name: 'Zakarpattia',
    description:
      'Ukraines most famous wine region, located in the southwestern Carpathian mountains. The unique microclimate and volcanic soils create ideal conditions for producing premium wines, particularly from indigenous grape varieties.',
    imageUrl: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Zakarpattia',
  },
  {
    _id: odesaId,
    name: 'Odesa',
    description:
      'A major wine-producing region in southern Ukraine with a long winemaking tradition. The Black Sea coast provides a mild climate perfect for cultivating international grape varieties.',
    imageUrl: 'https://placehold.co/600x400/87CEEB/333333?text=Odesa',
  },
  {
    _id: khersonId,
    name: 'Kherson',
    description:
      'A southern Ukrainian region known for its vast vineyards and modern winemaking. The steppe climate and fertile soils produce reliable yields of quality grapes.',
    imageUrl: 'https://placehold.co/600x400/DAA520/333333?text=Kherson',
  },
  {
    _id: mykolaivId,
    name: 'Mykolaiv',
    description:
      'A historic Ukrainian wine region in the southern steppe. The region has been developing its winemaking industry with a focus on both traditional and experimental varieties.',
    imageUrl: 'https://placehold.co/600x400/DEB887/333333?text=Mykolaiv',
  },
];

export const users = [
  {
    _id: user1Id,
    firebaseUid: 'u1',
    firstName: 'Nino',
    lastName: 'Tsereteli',
    email: 'nino@test.com',
    role: 'USER',
  },
  {
    _id: user2Id,
    firebaseUid: 'u2',
    firstName: 'Giorgi',
    lastName: 'Makharadze',
    email: 'giorgi@test.com',
    role: 'USER',
  },
  {
    _id: owner1Id,
    firebaseUid: 'o1',
    firstName: 'Irakli',
    lastName: 'Gvazava',
    email: 'owner@test.com',
    role: 'WINERY_OWNER',
  },
  {
    _id: user3Id,
    firebaseUid: 'user3-uid',
    firstName: 'Tamta',
    lastName: 'Lashkhi',
    email: 'user3@example.com',
    role: 'USER',
    favoriteWines: [wine5Id, wine7Id],
  },
  {
    _id: user4Id,
    firebaseUid: 'user4-uid',
    firstName: 'Zaza',
    lastName: 'Pachulia',
    email: 'user4@example.com',
    role: 'USER',
    favoriteWines: [wine11Id, wine12Id],
  },
  {
    _id: user5Id,
    firebaseUid: 'user5-uid',
    firstName: 'Lali',
    lastName: 'Kapanadze',
    email: 'user5@example.com',
    role: 'USER',
    favoriteWines: [wine15Id, wine19Id],
  },
];

export const wineries = [
  {
    _id: win1Id,
    name: 'Shumi Estate',
    owner: owner1Id,
    country: georgiaId,
    region: kakhetiId,
    address: 'Telavi',
    coordinates: { lat: 41.91, lng: 45.47 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/841013/FFFFFF?text=Shumi',
    contactEmail: 'shumi@ge',
    contactPhone: '+99532123456',
    averageRating: 4.9,
    history:
      'Premium boutique winery specializing in traditional qvevri wines. Shumi Estate combines ancient methods with modern precision to create exceptional expressions of Kakheti terroir.',
  },
  {
    _id: win2Id,
    name: 'Kateni',
    owner: owner1Id,
    country: georgiaId,
    region: kakhetiId,
    address: 'Kvareli',
    coordinates: { lat: 41.94, lng: 45.81 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/31343C/FFFFFF?text=Kateni',
    contactEmail: 'kateni@ge',
    contactPhone: '+99532987654',
    averageRating: 4.8,
    history:
      'Family-owned estate producing natural wines from ancient grape varieties. Kateni is known for its minimalist approach and exceptional Kisi amber wines.',
  },
  {
    _id: win3Id,
    name: 'Mikaber',
    owner: owner1Id,
    country: georgiaId,
    region: rachaId,
    address: 'Ambrolauri',
    coordinates: { lat: 42.52, lng: 43.14 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/5D4037/FFFFFF?text=Mikaber',
    contactEmail: 'mikaber@ge',
    contactPhone: '+99543212345',
    averageRating: 4.7,
    history:
      'High-altitude winery crafting premium Racha wines from indigenous varieties. Mikaber specializes in aged reds from Aleksandrouli and Mujuretuli grapes.',
  },
  {
    _id: win4Id,
    name: "Ilya's Wine",
    owner: owner1Id,
    country: georgiaId,
    region: kartliId,
    address: 'Kiketi',
    coordinates: { lat: 41.71, lng: 44.63 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/455A64/FFFFFF?text=Ilya',
    contactEmail: 'ilya@ge',
    contactPhone: '+99544234567',
    averageRating: 4.9,
    history:
      "Pioneer of natural wines in Kartli, producing unfiltered Chinuri and Goruli Mtsvane. Ilya's wines are made in 300-year-old qvevris with minimal intervention.",
  },
  {
    _id: win5Id,
    name: 'Chkhaveri House',
    owner: owner1Id,
    country: georgiaId,
    region: adjaraId,
    address: 'Kobuleti',
    coordinates: { lat: 41.97, lng: 41.73 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/0277BD/FFFFFF?text=Chkhaveri',
    contactEmail: 'chkhaveri@ge',
    contactPhone: '+99522234567',
    averageRating: 4.6,
    history:
      'Dedicated to preserving the rare Chkhaveri grape variety. This boutique winery produces elegant roses that showcase Adjara unique maritime terroir.',
  },
  {
    _id: win6Id,
    name: 'Tbilvino',
    owner: owner1Id,
    country: georgiaId,
    region: tbilisiId,
    address: 'Tbilisi',
    coordinates: { lat: 41.71, lng: 44.82 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/37474F/FFFFFF?text=Tbilvino',
    contactEmail: 'tbilvino@ge',
    contactPhone: '+99532234567',
    averageRating: 4.5,
    history:
      'One of Georgias largest and most historic wine companies, founded in 1962. Tbilvino produces consistent quality wines accessible to every wine lover.',
  },
  {
    _id: win7Id,
    name: 'Dakishvili Family',
    owner: owner1Id,
    country: georgiaId,
    region: kakhetiId,
    address: 'Shalauri',
    coordinates: { lat: 41.9, lng: 45.48 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/8D6E63/FFFFFF?text=Dakishvili',
    contactEmail: 'dakishvili@ge',
    contactPhone: '+99533234567',
    averageRating: 4.9,
    history:
      'Three generations of qvevri winemakers creating small-batch premium wines. Dakishvili Family is renowned for exceptional aged Saperavi and Kisi wines.',
  },
  {
    _id: win8Id,
    name: 'Chateau Mukhrani',
    owner: owner1Id,
    country: georgiaId,
    region: kartliId,
    address: 'Mukhrani',
    coordinates: { lat: 41.93, lng: 44.58 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/B71C1C/FFFFFF?text=Mukhrani',
    contactEmail: 'mukhrani@ge',
    contactPhone: '+99544234567',
    averageRating: 4.6,
    history:
      'Royal estate gardens combining nobility with modern winemaking precision. Chateau Mukhrani produces premium wines in historic palace grounds.',
  },
  {
    _id: win9Id,
    name: 'Uzhgorod Wines',
    owner: owner1Id,
    country: ukraineId,
    region: zakarpattiaId,
    address: 'Uzhgorod',
    coordinates: { lat: 48.62, lng: 22.28 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/8B4513/FFFFFF?text=Uzhgorod',
    contactEmail: 'uzhgorod@ua',
    contactPhone: '+38031234567',
    averageRating: 4.4,
    history:
      'Leading Ukrainian winery in the Carpathian region, producing wines that showcase the unique potential of Zakarpattia terroir.',
  },
  {
    _id: win10Id,
    name: 'Odesa Prestige',
    owner: owner1Id,
    country: ukraineId,
    region: odesaId,
    address: 'Odesa',
    coordinates: { lat: 46.48, lng: 30.72 },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/87CEEB/333333?text=Odesa',
    contactEmail: 'odesa@ua',
    contactPhone: '+38048234567',
    averageRating: 4.3,
    history:
      'Modern Ukrainian winery near the Black Sea, known for producing quality wines from international and local grape varieties.',
  },
];

export const grapes = [
  {
    _id: saperaviId,
    name: 'Saperavi',
    type: 'red',
    regions: [kakhetiId, rachaId],
    description:
      'The most famous Georgian red grape variety, known for its deep color and robust structure. Saperavi produces full-bodied wines with high acidity and tannins, featuring rich flavors of dark berries and plums.',
    acidity: 'High',
    body: 'Full',
    tannins: 'High',
    aromas: ['Blackberry', 'Plum', 'Earth'],
    agingPotential: '20y',
    imageUrls: ['https://placehold.co/400x600/4A148C/FFFFFF?text=Saperavi'],
  },
  {
    _id: rkatsiteliId,
    name: 'Rkatsiteli',
    type: 'white',
    regions: [kakhetiId, kartliId],
    description:
      'One of the oldest and most widely planted white grape varieties in Georgia. Rkatsiteli produces versatile wines ranging from crisp to rich amber-colored when aged in qvevri.',
    acidity: 'Med',
    body: 'Med',
    aromas: ['Apple', 'Citrus', 'Honey'],
    agingPotential: '5y',
    imageUrls: ['https://placehold.co/400x600/F9A825/FFFFFF?text=Rkatsiteli'],
  },
  {
    _id: kisiId,
    name: 'Kisi',
    type: 'white',
    regions: [kakhetiId],
    description:
      'An ancient aromatic white grape variety experiencing a remarkable renaissance in modern Georgian winemaking. Kisi produces complex wines with outstanding aging potential.',
    acidity: 'Med',
    body: 'Full',
    aromas: ['Apricot', 'Tropical', 'Herb'],
    agingPotential: '10y',
    imageUrls: ['https://placehold.co/400x600/FFD700/31343C?text=Kisi'],
  },
  {
    _id: mtsvaneId,
    name: 'Mtsvane',
    type: 'white',
    regions: [kakhetiId],
    description:
      'An ancient Georgian grape meaning green berry. Mtsvane produces elegant white wines with crisp acidity and bright citrus flavors.',
    acidity: 'High',
    body: 'Med',
    aromas: ['Lemon', 'Green Apple', 'Herb'],
    agingPotential: '5y',
    imageUrls: ['https://placehold.co/400x600/C0CA33/31343C?text=Mtsvane'],
  },
  {
    _id: khikhviId,
    name: 'Khikhvi',
    type: 'white',
    regions: [kakhetiId],
    description:
      'A rare Georgian white grape with exceptional sugar accumulation potential. Khikhvi produces aromatic wines with tropical fruit notes and natural sweetness.',
    acidity: 'Low',
    body: 'Full',
    aromas: ['Tropical', 'Honey', 'Pear'],
    agingPotential: '8y',
    imageUrls: ['https://placehold.co/400x600/FFC107/333333?text=Khikhvi'],
  },
  {
    _id: tavkveriId,
    name: 'Tavkveri',
    type: 'red',
    regions: [kartliId],
    description:
      'A versatile red grape from Kartli producing both still and sparkling wines. Tavkveri creates medium-bodied wines with bright acidity and fresh berry flavors.',
    acidity: 'High',
    body: 'Med',
    tannins: 'Med',
    aromas: ['Cherry', 'Raspberry', 'Herb'],
    agingPotential: '5y',
    imageUrls: ['https://placehold.co/400x600/E53935/FFFFFF?text=Tavkveri'],
  },
  {
    _id: chkhaveriId,
    name: 'Chkhaveri',
    type: 'rose',
    regions: [adjaraId],
    description:
      'A rare pink grape variety from Adjara creating elegant rose wines. Chkhaveri produces delicate wines with subtle strawberry and floral notes.',
    acidity: 'Med',
    body: 'Light',
    aromas: ['Strawberry', 'Rose', 'Citrus'],
    agingPotential: '3y',
    imageUrls: ['https://placehold.co/400x600/F48FB1/333333?text=Chkhaveri'],
  },
  {
    _id: shavkapitoId,
    name: 'Shavkapito',
    type: 'red',
    regions: [kartliId],
    description:
      'An ancient Georgian red grape from Kartli with distinctive mineral character. Shavkapito creates medium-bodied wines with firm tannins and complex flavors.',
    acidity: 'Med',
    body: 'Med',
    tannins: 'Med',
    aromas: ['Blackberry', 'Mineral', 'Herb'],
    agingPotential: '10y',
    imageUrls: ['https://placehold.co/400x600/5D4037/FFFFFF?text=Shavkapito'],
  },
  {
    _id: krakhunaId,
    name: 'Krakhuna',
    type: 'white',
    regions: [imeretiId],
    description:
      'A traditional Imeretian white grape producing full-bodied wines with strong character. Krakhuna creates rich wines with flavors of dried fruits and nuts.',
    acidity: 'Med',
    body: 'Full',
    aromas: ['Dried Fruit', 'Nut', 'Honey'],
    agingPotential: '7y',
    imageUrls: ['https://placehold.co/400x600/FFB300/333333?text=Krakhuna'],
  },
  {
    _id: tsitskaId,
    name: 'Tsitska',
    type: 'white',
    regions: [imeretiId, guriaId],
    description:
      'A traditional Imeretian white grape variety prized for its delicate and floral characteristics. Tsitska produces light-bodied wines with refreshing acidity.',
    acidity: 'High',
    body: 'Light',
    aromas: ['Pear', 'Flower', 'Citrus'],
    agingPotential: '3y',
    imageUrls: ['https://placehold.co/400x600/2E7D32/FFFFFF?text=Tsitska'],
  },
  {
    _id: chinuriId,
    name: 'Chinuri',
    type: 'white',
    regions: [kartliId],
    description:
      'An ancient Georgian white grape from Kartli, experiencing a modern renaissance. Chinuri creates elegant wines with bright acidity and citrus notes.',
    acidity: 'High',
    body: 'Med',
    aromas: ['Citrus', 'Green Apple', 'Floral'],
    agingPotential: '5y',
    imageUrls: ['https://placehold.co/400x600/CFD8DC/333333?text=Chinuri'],
  },
  {
    _id: usakhelouriId,
    name: 'Usakhelouri',
    type: 'red',
    regions: [rachaId],
    description:
      'A rare red grape from Racha, known for producing elegant aged wines. Usakhelouri creates medium to full-bodied wines with refined tannins.',
    acidity: 'Med',
    body: 'Full',
    tannins: 'Med',
    aromas: ['Cherry', 'Rose', 'Earth'],
    agingPotential: '15y',
    imageUrls: ['https://placehold.co/400x600/880E4F/FFFFFF?text=Usakhelouri'],
  },
  {
    _id: goruliMtsvaneId,
    name: 'Goruli Mtsvane',
    type: 'white',
    regions: [kartliId],
    description:
      'A rare white grape from Kartli, related to Mtsvane but with distinct characteristics. Goruli Mtsvane produces aromatic wines with citrus and herbal notes.',
    acidity: 'Med',
    body: 'Med',
    aromas: ['Citrus', 'Herb', 'Mineral'],
    agingPotential: '5y',
    imageUrls: ['https://placehold.co/400x600/9CCC65/333333?text=Goruli'],
  },
  {
    _id: budeshuriId,
    name: 'Budeshuri',
    type: 'red',
    regions: [kakhetiId],
    description:
      'An ancient red grape variety from Kakheti, historically used in blends. Budeshuri creates wines with deep color and fruity character.',
    acidity: 'Med',
    body: 'Med',
    tannins: 'Med',
    aromas: ['Berry', 'Spice', 'Herb'],
    agingPotential: '8y',
    imageUrls: ['https://placehold.co/400x600/7B1FA2/FFFFFF?text=Budeshuri'],
  },
  {
    _id: cabernetSauvignonId,
    name: 'Cabernet Sauvignon',
    type: 'red',
    regions: [zakarpattiaId, odesaId],
    description:
      'International grape variety successfully cultivated in Ukraine. Ukrainian Cabernet Sauvignon produces full-bodied wines with dark fruit flavors and firm tannins.',
    acidity: 'High',
    body: 'Full',
    tannins: 'High',
    aromas: ['Blackcurrant', 'Cedar', 'Tobacco'],
    agingPotential: '15y',
    imageUrls: ['https://placehold.co/400x600/722F37/FFFFFF?text=Cabernet'],
  },
];

export const wines = [
  {
    _id: wine1Id,
    winery: win1Id,
    name: 'Shumi Saperavi Reserve',
    vintage: 2018,
    grape: saperaviId,
    description:
      'A bold and powerful red wine from the heart of Kakheti. This exceptional Saperavi displays deep ruby color with rich aromas of dark berries, plums, and subtle oak notes.',
    imageUrl: 'https://placehold.co/400x600/841013/FFFFFF?text=Shumi+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1200,
  },
  {
    _id: wine2Id,
    winery: win1Id,
    name: 'Shumi Rkatsiteli',
    vintage: 2021,
    grape: rkatsiteliId,
    description:
      'A crisp and refreshing white wine showcasing the purity of Kakheti terroir. This elegant Rkatsiteli presents delicate aromas of green apple and citrus.',
    imageUrl: 'https://placehold.co/400x600/FFD700/31343C?text=Shumi+Rkatsiteli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 650,
  },
  {
    _id: wine3Id,
    winery: win1Id,
    name: 'Shumi Kisi Amber',
    vintage: 2019,
    grape: kisiId,
    description:
      'A stunning amber wine crafted using traditional qvevri methods. This golden-hued Kisi reveals complex aromas of dried apricots and warm spices.',
    imageUrl: 'https://placehold.co/400x600/FFA500/FFFFFF?text=Shumi+Kisi',
    color: 'orange',
    sweetness: 'dry',
    averageRating: 4.8,
    price: 1450,
  },
  {
    _id: wine4Id,
    winery: win2Id,
    name: 'Kateni Saperavi',
    vintage: 2020,
    grape: saperaviId,
    description:
      'A natural expression of Kakheti terroir from old vines. This authentic Saperavi showcases pure fruit character with rich dark fruit flavors.',
    imageUrl: 'https://placehold.co/400x600/722F37/FFFFFF?text=Kateni+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.8,
    price: 980,
  },
  {
    _id: wine5Id,
    winery: win2Id,
    name: 'Kateni Mtsvane',
    vintage: 2022,
    grape: mtsvaneId,
    description:
      'An elegant white wine expressing the purity of Mtsvane grapes. This crisp offering displays bright citrus and fresh herb aromas.',
    imageUrl: 'https://placehold.co/400x600/F5F5DC/333333?text=Kateni+Mtsvane',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 720,
  },
  {
    _id: wine6Id,
    winery: win2Id,
    name: 'Kateni Khikhvi',
    vintage: 2021,
    grape: khikhviId,
    description:
      'A rare aromatic white wine from the Khikhvi grape. This distinctive offering presents tropical fruit aromas with honey and pear notes.',
    imageUrl: 'https://placehold.co/400x600/FFE082/333333?text=Kateni+Khikhvi',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1850,
  },
  {
    _id: wine7Id,
    winery: win3Id,
    name: 'Mikaber Usakhelouri',
    vintage: 2017,
    grape: usakhelouriId,
    description:
      'A prestigious red from the Racha mountains showing exceptional character. This rare Usakhelouri displays deep ruby color with complex layers of cherry and earth.',
    imageUrl: 'https://placehold.co/400x600/880E4F/FFFFFF?text=Mikaber+Usakhelouri',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 2500,
  },
  {
    _id: wine8Id,
    winery: win3Id,
    name: 'Mikaber Rkatsiteli',
    vintage: 2021,
    grape: rkatsiteliId,
    description:
      'A pure and expressive white wine from the Caucasus mountains. This crisp Rkatsiteli displays bright citrus and green apple aromas.',
    imageUrl: 'https://placehold.co/400x600/FFF59D/333333?text=Mikaber+Rkatsiteli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 750,
  },
  {
    _id: wine9Id,
    winery: win3Id,
    name: 'Mikaber Rose',
    vintage: 2023,
    grape: chkhaveriId,
    description:
      'A delicate rose from mountain-grown Chkhaveri grapes. This refreshing wine presents lovely strawberry and floral aromas.',
    imageUrl: 'https://placehold.co/400x600/FFB6C1/333333?text=Mikaber+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 680,
  },
  {
    _id: wine10Id,
    winery: win4Id,
    name: 'Ilya Chinuri Natural',
    vintage: 2022,
    grape: chinuriId,
    description:
      'A pioneering unfiltered natural white from Kartli. This artisanal Chinuri presents cloudy appearance with intense citrus and floral aromas.',
    imageUrl: 'https://placehold.co/400x600/ECEFF1/333333?text=Ilya+Chinuri',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1650,
  },
  {
    _id: wine11Id,
    winery: win4Id,
    name: 'Ilya Goruli Mtsvane',
    vintage: 2021,
    grape: goruliMtsvaneId,
    description:
      'A rare expression of endangered Goruli Mtsvane grapes. This unique wine displays bright citrus and herb aromas with distinctive mineral character.',
    imageUrl: 'https://placehold.co/400x600/9CCC65/333333?text=Ilya+Goruli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 1400,
  },
  {
    _id: wine12Id,
    winery: win4Id,
    name: 'Ilya Tavkveri',
    vintage: 2022,
    grape: tavkveriId,
    description:
      'A vibrant red showcasing Kartli versatile Tavkveri variety. This medium-bodied wine offers bright cherry and raspberry flavors.',
    imageUrl: 'https://placehold.co/400x600/E53935/FFFFFF?text=Ilya+Tavkveri',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 850,
  },
  {
    _id: wine13Id,
    winery: win5Id,
    name: 'Chkhaveri House Rose',
    vintage: 2023,
    grape: chkhaveriId,
    description:
      'An elegant rose preserving the rare Chkhaveri grape from Adjara. This delicate wine offers subtle strawberry and rose petal aromas.',
    imageUrl: 'https://placehold.co/400x600/F8BBD9/333333?text=Chkhaveri+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 580,
  },
  {
    _id: wine14Id,
    winery: win5Id,
    name: 'Adjara White',
    vintage: 2022,
    grape: tsitskaId,
    description:
      'A coastal white wine reflecting Adjara maritime influences. This Tsitska displays fresh citrus and floral notes with balanced acidity.',
    imageUrl: 'https://placehold.co/400x600/B2DFDB/333333?text=Adjara+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 450,
  },
  {
    _id: wine15Id,
    winery: win5Id,
    name: 'Chkhaveri Amber',
    vintage: 2022,
    grape: chkhaveriId,
    description:
      'An amber expression of Chkhaveri with extended skin contact. This experimental wine presents deeper color with complex dried fruit flavors.',
    imageUrl: 'https://placehold.co/400x600/FFCC80/333333?text=Chkhaveri+Amber',
    color: 'orange',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 720,
  },
  {
    _id: wine16Id,
    winery: win6Id,
    name: 'Tbilvino Saperavi',
    vintage: 2021,
    grape: saperaviId,
    description:
      'A modern expression of Georgias signature red for everyday enjoyment. This approachable Saperavi offers juicy berry flavors.',
    imageUrl: 'https://placehold.co/400x600/8B0000/FFFFFF?text=Tbilvino+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 350,
  },
  {
    _id: wine17Id,
    winery: win6Id,
    name: 'Tbilvino Rkatsiteli',
    vintage: 2022,
    grape: rkatsiteliId,
    description:
      'A capital-style white wine celebrating city life. This fresh Rkatsiteli delivers bright citrus and green apple notes.',
    imageUrl: 'https://placehold.co/400x600/FFF59D/333333?text=Tbilvino+Rkatsiteli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.3,
    price: 280,
  },
  {
    _id: wine18Id,
    winery: win6Id,
    name: 'Tbilvino Kindzmarauli',
    vintage: 2022,
    grape: saperaviId,
    description:
      'Georgias beloved semi-sweet red in its classic style. This Kindzmarauli displays luscious cherry and berry flavors with balanced sweetness.',
    imageUrl: 'https://placehold.co/400x600/B71C1C/FFFFFF?text=Tbilvino+Kindzmarauli',
    color: 'red',
    sweetness: 'semi-sweet',
    averageRating: 4.6,
    price: 420,
  },
  {
    _id: wine19Id,
    winery: win7Id,
    name: 'Dakishvili Family Kisi',
    vintage: 2019,
    grape: kisiId,
    description:
      'A precious amber wine from family recipes passed through generations. This precious Kisi reveals layers of complexity with dried fruits and honey.',
    imageUrl: 'https://placehold.co/400x600/FF8F00/FFFFFF?text=Dakishvili+Kisi',
    color: 'orange',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1800,
  },
  {
    _id: wine20Id,
    winery: win7Id,
    name: 'Dakishvili Saperavi',
    vintage: 2018,
    grape: saperaviId,
    description:
      'A dark and mysterious Saperavi from old vines. This premium wine offers deep color with rich flavors of blackberries and dark chocolate.',
    imageUrl: 'https://placehold.co/400x600/4A148C/FFFFFF?text=Dakishvili+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 2100,
  },
  {
    _id: wine21Id,
    winery: win7Id,
    name: 'Dakishvili Mtsvane',
    vintage: 2020,
    grape: mtsvaneId,
    description:
      'An elegant white from old-vine Mtsvane in Kakheti. This refined wine presents citrus and green apple with subtle herb notes.',
    imageUrl: 'https://placehold.co/400x600/CDDC39/333333?text=Dakishvili+Mtsvane',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 950,
  },
  {
    _id: wine22Id,
    winery: win8Id,
    name: 'Royal Palace Red',
    vintage: 2017,
    grape: saperaviId,
    description:
      'A noble red worthy of royalty from historic palace grounds. This distinguished Saperavi displays remarkable depth with layers of dark fruit and oak.',
    imageUrl: 'https://placehold.co/400x600/B71C1C/FFFFFF?text=Mukhrani+Red',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 1800,
  },
  {
    _id: wine23Id,
    winery: win8Id,
    name: 'White Palace',
    vintage: 2022,
    grape: rkatsiteliId,
    description:
      'A grand white wine from the royal estate gardens. This elegant Rkatsiteli offers refined citrus and apple flavors.',
    imageUrl: 'https://placehold.co/400x600/FFF176/333333?text=Mukhrani+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 900,
  },
  {
    _id: wine24Id,
    winery: win8Id,
    name: 'Palace Rose',
    vintage: 2023,
    grape: budeshuriId,
    description:
      'A delicate rose from palace vineyards. This refreshing wine showcases the potential of rare Georgian grape varieties.',
    imageUrl: 'https://placehold.co/400x600/FFB6C1/333333?text=Mukhrani+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 650,
  },
  {
    _id: wine25Id,
    winery: win9Id,
    name: 'Uzhgorod Cabernet',
    vintage: 2019,
    grape: cabernetSauvignonId,
    description:
      'A premium Ukrainian Cabernet from Carpathian vineyards. This full-bodied red offers rich dark fruit flavors with notes of cedar and tobacco.',
    imageUrl: 'https://placehold.co/400x600/722F37/FFFFFF?text=Uzhgorod+Cabernet',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 550,
  },
  {
    _id: wine26Id,
    winery: win9Id,
    name: 'Carpathian White',
    vintage: 2021,
    grape: rkatsiteliId,
    description:
      'An elegant white from Zakarpattia volcanic soils. This crisp wine displays bright citrus and mineral notes unique to the region.',
    imageUrl: 'https://placehold.co/400x600/FFF59D/333333?text=Uzhgorod+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 380,
  },
  {
    _id: wine27Id,
    winery: win9Id,
    name: 'Uzhgorod Rose',
    vintage: 2022,
    grape: cabernetSauvignonId,
    description:
      'A refreshing rose from Ukrainian vineyards. This light wine offers delicate strawberry and melon aromas.',
    imageUrl: 'https://placehold.co/400x600/FFB6C1/333333?text=Uzhgorod+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.3,
    price: 320,
  },
  {
    _id: wine28Id,
    winery: win10Id,
    name: 'Odesa Reserve',
    vintage: 2020,
    grape: cabernetSauvignonId,
    description:
      'A distinguished red from Black Sea coast vineyards. This Cabernet displays deep color with complex berry and spice notes.',
    imageUrl: 'https://placehold.co/400x600/800020/FFFFFF?text=Odesa+Reserve',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 450,
  },
  {
    _id: wine29Id,
    winery: win10Id,
    name: 'Odesa White',
    vintage: 2022,
    grape: rkatsiteliId,
    description:
      'A modern white wine from Odesa region. This crisp Rkatsiteli offers bright citrus and apple flavors.',
    imageUrl: 'https://placehold.co/400x600/FAFAD2/333333?text=Odesa+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.2,
    price: 280,
  },
  {
    _id: wine30Id,
    winery: win10Id,
    name: 'Black Sea Red',
    vintage: 2021,
    grape: saperaviId,
    description:
      'An experimental red from Odesa using Georgian grape varieties. This Saperavi offers bold flavor with local terroir character.',
    imageUrl: 'https://placehold.co/400x600/8B0000/FFFFFF?text=Black+Sea+Red',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.3,
    price: 380,
  },
];

export const reviews = [
  {
    wineId: wine1Id,
    userId: user1Id,
    rating: 5,
    comment: 'Exceptional Saperavi! Deep color, rich flavor, and beautiful finish.',
  },
  {
    wineId: wine1Id,
    userId: user2Id,
    rating: 5,
    comment: 'One of the best wines I have ever tasted. True Georgian heritage.',
  },
  {
    wineId: wine2Id,
    userId: user1Id,
    rating: 4,
    comment: 'Crisp and refreshing. Perfect for summer evenings.',
  },
  {
    wineId: wine3Id,
    userId: user2Id,
    rating: 5,
    comment: 'Amazing amber wine! Complex flavors that keep evolving.',
  },
  {
    wineId: wine4Id,
    userId: user1Id,
    rating: 5,
    comment: 'Pure expression of nature. You can taste the authenticity.',
  },
  {
    wineId: wine6Id,
    userId: user2Id,
    rating: 5,
    comment: 'Incredible aromatic complexity. Khikhvi is definitely a grape to watch.',
  },
  {
    wineId: wine7Id,
    userId: user1Id,
    rating: 5,
    comment: 'Worth the premium price. This is world-class wine from Racha.',
  },
  {
    wineId: wine10Id,
    userId: user2Id,
    rating: 5,
    comment: 'Revolutionary natural wine. Cloudy, raw, and absolutely delicious.',
  },
  {
    wineId: wine13Id,
    userId: user1Id,
    rating: 4,
    comment: 'Delicate and elegant. Perfect for a summer terrace.',
  },
  {
    wineId: wine16Id,
    userId: user2Id,
    rating: 4,
    comment: 'Excellent everyday wine. Great value for quality.',
  },
  {
    wineId: wine19Id,
    userId: user1Id,
    rating: 5,
    comment: 'Family legacy in every bottle. Outstanding quality.',
  },
  {
    wineId: wine22Id,
    userId: user2Id,
    rating: 5,
    comment: 'Royal quality! A wine for special occasions.',
  },
  {
    wineId: wine25Id,
    userId: user1Id,
    rating: 4,
    comment: 'Surprisingly good Ukrainian Cabernet. Great potential.',
  },
  {
    wineId: wine26Id,
    userId: user2Id,
    rating: 4,
    comment: 'Beautiful expression of Zakarpattia terroir.',
  },
  {
    wineId: wine28Id,
    userId: user1Id,
    rating: 4,
    comment: 'Solid Ukrainian wine. Shows promising development.',
  },
];

export const tours = [
  {
    winery: win1Id,
    name: 'Kakheti Wine Experience',
    description:
      'A comprehensive journey through the cradle of Georgian wine culture. This immersive tour takes you through ancient vineyards, traditional wine cellars, and historic monuments of the Kakheti region.',
    duration: 180,
    price: 200,
    images: ['https://placehold.co/600x400/841013/FFFFFF?text=Kakheti+Tour'],
    groupSize: { min: 2, max: 12 },
  },
  {
    winery: win3Id,
    name: 'Racha Mountain Wine Tour',
    description:
      'An exclusive journey to Georgias highest altitude vineyards in Racha. Visit family wineries producing rare Aleksandrouli and Mujuretuli wines at 1200 meters elevation.',
    duration: 240,
    price: 350,
    images: ['https://placehold.co/600x400/5D4037/FFFFFF?text=Racha+Tour'],
    groupSize: { min: 2, max: 8 },
  },
  {
    winery: win4Id,
    name: 'Kartli Natural Wine Discovery',
    description:
      'Explore the innovative side of Georgian winemaking in Kartli. Visit pioneering natural wine producers creating unfiltered wines in centuries-old qvevris.',
    duration: 150,
    price: 180,
    images: ['https://placehold.co/600x400/455A64/FFFFFF?text=Kartli+Tour'],
    groupSize: { min: 2, max: 10 },
  },
  {
    winery: win9Id,
    name: 'Carpathian Wine Journey',
    description:
      'Discover Ukrainian winemaking in the beautiful Carpathian mountains. Visit historic wineries and taste premium wines from Zakarpattia region.',
    duration: 180,
    price: 150,
    images: ['https://placehold.co/600x400/8B4513/FFFFFF?text=Carpathian+Tour'],
    groupSize: { min: 2, max: 12 },
  },
  {
    winery: win7Id,
    name: 'Family Qvevri Winemaking',
    description:
      'An intimate experience with three generations of qvevri winemakers. Learn ancient techniques and enjoy homemade supra with the family.',
    duration: 180,
    price: 280,
    images: ['https://placehold.co/600x400/8D6E63/FFFFFF?text=Qvevri+Tour'],
    groupSize: { min: 2, max: 6 },
  },
];
