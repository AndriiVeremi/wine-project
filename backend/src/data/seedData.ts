import mongoose from 'mongoose';

const owner1Id = new mongoose.Types.ObjectId();
const owner2Id = new mongoose.Types.ObjectId();
const user1Id = new mongoose.Types.ObjectId();
const user2Id = new mongoose.Types.ObjectId();

const winery1Id = new mongoose.Types.ObjectId();
const winery2Id = new mongoose.Types.ObjectId();
const winery3Id = new mongoose.Types.ObjectId();
const winery4Id = new mongoose.Types.ObjectId();
const winery5Id = new mongoose.Types.ObjectId();

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

const tour1Id = new mongoose.Types.ObjectId();
const tour2Id = new mongoose.Types.ObjectId();
const tour3Id = new mongoose.Types.ObjectId();
const tour4Id = new mongoose.Types.ObjectId();

const kabernetSauvignonId = new mongoose.Types.ObjectId();
const chardonnayId = new mongoose.Types.ObjectId();
const merlotId = new mongoose.Types.ObjectId();
const kabernetFrancId = new mongoose.Types.ObjectId();
const rieslingId = new mongoose.Types.ObjectId();
const isabellaId = new mongoose.Types.ObjectId();
const saperaviId = new mongoose.Types.ObjectId();
const tsitskaTsolikouriId = new mongoose.Types.ObjectId();

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

export const regions = [
  {
    _id: kakhetiId,
    name: 'Kakheti',
    description: `Kakheti is the principal wine-producing region of Georgia, located in the eastern part of the country. It is home to the largest concentration of vineyards, wineries, and protected wine appellations. Kakheti is widely regarded as the historical and cultural heart of Georgian winemaking, with traditions dating back more than 8,000 years. The region plays a central role in shaping Georgia's wine identity, combining ancient winemaking practices – most notably qvevri fermentation – with modern European techniques.`,
    imageUrl:
      'https://images.unsplash.com/photo-1621213426767-c25091763137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    country: georgiaId,
    climate: {
      title: 'Geographic location and climate',
      description: `Kakheti lies between the Greater Caucasus Mountains and the Alazani River basin. Most vineyards are situated in the Alazani Valley, which provides ideal natural conditions for viticulture. These conditions allow grapes to ripen evenly, achieving balanced sugar levels while maintaining natural acidity.`,
      features: [
        'warm and dry summers',
        'mild autumns',
        'a high number of sunny days throughout the growing season.',
      ],
    },
    soils: {
      title: 'Soils of Kakheti',
      description: `The diversity of soils in Kakheti has a direct influence on the character and style of the wines produced in the region.`,
      mainTypes: [
        'alluvial soils of the Alazani Valley',
        'clay-limestone soils',
        'sandy and clay soils with gravel inclusions.',
      ],
      properties: [
        'good drainage',
        'deep vine root systems',
        'wines with pronounced mineral structure and complexity.',
      ],
    },
    traditions: {
      title: 'Winemaking culture and traditions',
      description: `Kakheti is the birthplace of qvevri winemaking, the traditional Georgian method of fermenting and aging wine in large clay vessels buried underground. This technique has been recognized by UNESCO as part of the Intangible Cultural Heritage of Humanity. Winemaking here represents a living cultural tradition passed down through generations.`,
      rituals: [
        'religious rituals',
        'traditional feasts (supra)',
        'family and seasonal celebrations.',
      ],
    },
    grapeVarieties: {
      title: 'Main grape varieties of Kakheti',
      white: [
        {
          name: 'Rkatsiteli',
          description: 'the most widely planted grape, used for both white and amber wines.',
        },
        {
          name: 'Mtsvane Kakhuri',
          description: 'an aromatic variety adding freshness and floral notes.',
        },
        {
          name: 'Kisi',
          description: 'a rare indigenous grape known for its complexity and depth.',
        },
      ],
      red: [
        {
          name: 'Saperavi',
          description:
            'a teinturier grape with dark flesh, producing deeply colored and structured wines',
        },
      ],
    },
    typicalWines: {
      title: 'Typical wines of the region',
      description: `Wines from Kakheti are known for their structure, intensity, and strong expression of terroir. Depending on the winemaking approach, Kakhetian wines can range from fresh and fruit-driven to complex, tannic, and age-worthy.`,
      styles: ['dry white wines', 'amber (orange) wines', 'dry red wines', 'qvevri wines.'],
    },
    pdos: {
      title: 'Protected Designations of Origin (PDO)',
      description: `Kakheti contains the highest number of protected wine appellations in Georgia. Each designation reflects specific climatic and soil conditions that define the style of its wines.`,
      list: [
        'Tsinandali — refined dry white wines.',
        'Mukuzani — dry red wines made from Saperavi.',
        'Kindzmarauli — semi-sweet red wines.',
        'Napareuli — dry red wines with balanced structure.',
      ],
    },
    importance: {
      title: 'Importance of Kakheti for Georgian winemaking',
      description: `Internationally, Kakheti largely shapes the global perception of Georgian wine.`,
      points: [
        "the majority of the country's vineyards are located here,",
        'the region hosts a wide range of wineries, from small family estates to large commercial producers,',
        'it is the primary destination for wine tourism in Georgia.',
      ],
    },
  },
  {
    _id: rachaLechkhumiKvemoSvanetiId,
    name: 'Racha-Lechkhumi and Kvemo Svaneti',
    description: `Racha-Lechkhumi and Kvemo Svaneti is a mountainous region in northwestern Georgia, famous for its premium quality wines, particularly the semi-sweet wines from the Khvanchkara and Tkibuli micro-zones. The region combines high-altitude vineyards with traditional winemaking to produce distinctive wines.`,
    imageUrl:
      'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80&w=2078&auto=format&fit=crop',
    country: georgiaId,
    climate: {
      title: 'Climate',
      description: `The region has a unique microclimate influenced by high mountains. Cool temperatures and adequate rainfall create ideal conditions for producing wines with balanced acidity.`,
      features: ['mountain climate', 'cool summers', 'cold winters', 'high altitude'],
    },
    soils: {
      title: 'Soils',
      description: `The soils are varied, from clay to limestone-rich soils, contributing to the mineral character of the wines.`,
      mainTypes: ['clay soils', 'limestone soils', 'mountain soils'],
      properties: ['high minerality', 'good drainage'],
    },
    traditions: {
      title: 'Winemaking traditions',
      description: `Racha is famous for its semi-sweet wines, particularly Khvanchkara, which has been loved by royalty including the Russian Tsar.`,
      rituals: ['traditional supra', 'royal wine ceremonies'],
    },
    grapeVarieties: {
      title: 'Grape varieties',
      white: [
        {
          name: 'Tsolikauri',
          description: 'semi-sweet wines, aromatic',
        },
        {
          name: 'Alexandria',
          description: 'rare variety for semi-sweet wines',
        },
      ],
      red: [
        {
          name: 'Aleksandrouli',
          description: 'for semi-sweet red wines',
        },
        {
          name: 'Mujuretuli',
          description: 'for semi-sweet red wines',
        },
      ],
    },
    typicalWines: {
      title: 'Typical wines',
      description: `Racha is world-famous for its naturally semi-sweet wines with exceptional balance.`,
      styles: ['semi-sweet red wines', 'semi-sweet white wines', 'dry wines'],
    },
    pdos: {
      title: 'PDO',
      description: `This region has some of Georgia's most famous protected appellations.`,
      list: [
        'Khvanchkara — famous semi-sweet red wine',
        'Tkibuli — semi-sweet white wine',
        'Racha — dry wines',
      ],
    },
    importance: {
      title: 'Significance',
      description: `Racha produces some of Georgia's most prestigious wines, known internationally for their quality.`,
      points: [
        'premium semi-sweet wine production',
        'unique indigenous grape varieties',
        'historical significance (royal wines)',
      ],
    },
  },
];

export const users = [
  {
    _id: owner1Id,
    firebaseUid: 'firebaseUid_owner1',
    firstName: 'Ivan',
    lastName: 'Owner',
    email: 'ivan.owner@example.com',
    role: 'WINERY_OWNER',
    avatarUrl:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwOWYwMCI+PHBhdGggZD0iTTEyIDEwYzg5LjkzOCAwIDgtNy05OC04LTcgOC03IDh6bTAgMmMtMi42NyAwLTggMS40NC04IDR2MmgyMnYtMmMwLTIuNTYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNOCAyMXYtMmMwLTIuNTYgNS4zMy00IDgtNHMyLjY3IDEuNDQgMiA0djJ6Ii8+PC9zdmc+',
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
    avatarUrl:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZjFhMiI+PHBhdGggZD0iTTEyIDEwYzg5LjkzOCAwIDgtNy05OC04LTcgOC03IDh6bTAgMmMtMi42NyAwLTggMS40NC04IDR2MmgyMnYtMmMwLTIuNTYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNOCAyMXYtMmMwLTIuNTYgNS4zMy00IDgtNHMyLjY3IDEuNDQgMiA0djJ6Ii8+PC9zdmc+',
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
    avatarUrl:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzQ1NjZjOCI+PHBhdGggZD0iTTEyIDEwYzg5LjkzOCAwIDgtNy05OC04LTcgOC03IDh6bTAgMmMtMi42NyAwLTggMS40NC04IDR2MmgyMnYtMmMwLTIuNTYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNOCAyMXYtMmMwLTIuNTYgNS4zMy00IDgtNHMyLjY3IDEuNDQgMiA0djJ6Ii8+PC9zdmc+',
    favoriteWines: [wine1Id, wine2Id, wine6Id],
  },
  {
    _id: user2Id,
    firebaseUid: 'firebaseUid_user2',
    firstName: 'Olena',
    lastName: 'Explorer',
    email: 'olena.explorer@example.com',
    role: 'USER',
    avatarUrl:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzhhNzZiMyI+PHBhdGggZD0iTTEyIDEwYzg5LjkzOCAwIDgtNy05OC04LTcgOC03IDh6bTAgMmMtMi42NyAwLTggMS40NC04IDR2MmgyMnYtMmMwLTIuNTYtNS4zMy00LTgtNHoiLz48cGF0aCBkPSJNOCAyMXYtMmMwLTIuNTYgNS4zMy00IDgtNHMyLjY3IDEuNDQgMiA0djJ6Ii8+PC9zdmc+',
    favoriteWines: [wine4Id],
  },
];

export const wineries = [
  {
    _id: winery1Id,
    name: 'Winery "Sunny Valley"',
    owner: owner1Id,
    history: 'Our story begins with a great love for grapes grown under the warm Ukrainian sun.',
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
    history:
      'A family winery that preserves the ancient winemaking traditions of the Kamenka region.',
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
  {
    _id: winery4Id,
    name: 'Kindzmarauli Marani',
    owner: owner2Id,
    history: 'One of the largest wineries in the Kindzmarauli microzone, founded in 2001.',
    country: georgiaId,
    region: kakhetiId,
    address: 'Kvareli, Georgia',
    isVip: true,
    logoUrl: 'https://placehold.co/200x200/EEE/31343C?text=KM_Logo',
    galleryUrl: ['https://placehold.co/600x400/EEE/31343C?text=KM_Gallery_1'],
    whereToBuy: [{ name: '8000 Vintages', url: 'https://8000vintages.ua' }],
    contactEmail: 'contact4@example.com',
    contactPhone: '+995322550000',
  },
  {
    _id: winery5Id,
    name: "Baia's Wine",
    owner: owner2Id,
    history:
      'A family winery in the village of Obcha, Imereti, founded by two sisters, Baia and Gvantsa Abuladze.',
    country: georgiaId,
    region: imeretiId,
    address: 'Obcha, Bagdati, Georgia',
    isVip: false,
    logoUrl: 'https://placehold.co/200x200/EEE/31343C?text=BW_Logo',
    galleryUrl: ['https://placehold.co/600x400/EEE/31343C?text=BW_Gallery_1'],
    whereToBuy: [{ name: 'Vino&Vino', url: 'https://vinovino.ua' }],
    contactEmail: 'contact5@example.com',
    contactPhone: '+995555123456',
  },
];

export const grapes = [
  {
    _id: kabernetSauvignonId,
    name: 'Cabernet Sauvignon',
    description:
      'One of the world most widely recognized red wine grape varieties. It is grown in nearly every major wine producing country among a diverse spectrum of climates.',
    color: 'red',
    alsoKnownAs: ['Bordeaux', 'Cab'],
    characteristics: ['full-bodied', 'high tannins', 'black currant', 'cedar'],
    foodPairing: ['red meat', 'lamb', 'hard cheese'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Cabernet_Sauvignon',
    regions: [odesaId, khersonId],
  },
  {
    _id: chardonnayId,
    name: 'Chardonnay',
    description:
      'A green-skinned grape variety used in the production of white wine. The variety originated in the Burgundy wine region of eastern France.',
    color: 'white',
    alsoKnownAs: [],
    characteristics: ['unoaked', 'crisp', 'green apple', 'citrus', 'oaked', 'buttery', 'vanilla'],
    foodPairing: ['fish', 'chicken', 'creamy sauces'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Chardonnay',
    regions: [odesaId],
  },
  {
    _id: merlotId,
    name: 'Merlot',
    description:
      'A dark blue-colored wine grape variety, that is used as both a blending grape and for varietal wines. ',
    color: 'red',
    alsoKnownAs: [],
    characteristics: ['soft tannins', 'plum', 'cherry', 'chocolate'],
    foodPairing: ['poultry', 'pork', 'mushrooms'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Merlot',
    regions: [khersonId],
  },
  {
    _id: kabernetFrancId,
    name: 'Cabernet Franc',
    description:
      'One of the major black grape varieties worldwide. It is principally grown for blending with Cabernet Sauvignon and Merlot in the Bordeaux style, but can also be vinified alone.',
    color: 'red',
    alsoKnownAs: [],
    characteristics: ['raspberry', 'bell pepper', 'graphite'],
    foodPairing: ['roasted chicken', 'duck', 'vegetarian dishes'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Cabernet_Franc',
    regions: [khersonId],
  },
  {
    _id: rieslingId,
    name: 'Riesling',
    description:
      'A white grape variety which originated in the Rhine region. Riesling is an aromatic grape variety displaying flowery, almost perfumed, aromas as well as high acidity.',
    color: 'white',
    alsoKnownAs: [],
    characteristics: ['aromatic', 'high acidity', 'apple', 'peach', 'mineral'],
    foodPairing: ['spicy food', 'pork', 'cured meat'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Riesling',
    regions: [lvivId],
  },
  {
    _id: isabellaId,
    name: 'Isabella',
    description:
      'A particular American grape variety, a hybrid of Vitis labrusca and Vitis vinifera, used for table, juice, and wine production.',
    color: 'red',
    alsoKnownAs: ['Fragolino'],
    characteristics: ['strawberry', 'foxy', 'sweet'],
    foodPairing: ['fruit desserts', 'chocolate'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Isabella',
    regions: [lvivId],
  },
  {
    _id: saperaviId,
    name: 'Saperavi',
    description:
      'A Georgian red grape variety that is one of the most well-known in the country. It is a teinturier grape, meaning its flesh and juice are red, which gives the wine a deep, inky color.',
    color: 'red',
    alsoKnownAs: [],
    characteristics: ['deep color', 'high acidity', 'robust tannins', 'dark berries', 'spice'],
    foodPairing: ['grilled meat', 'stews', 'aged cheeses'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Saperavi',
    regions: [kakhetiId],
  },
  {
    _id: tsitskaTsolikouriId,
    name: 'Tsitska-Tsolikouri',
    description:
      'A classic blend of two white grape varieties from Imereti, western Georgia. Tsitska provides acidity and citrus notes, while Tsolikouri adds body and floral aromas.',
    color: 'white',
    alsoKnownAs: [],
    characteristics: ['aromatic', 'crisp acidity', 'green apple', 'pear', 'floral'],
    foodPairing: ['salads', 'seafood', 'chicken'],
    imageUrl: 'https://placehold.co/400x300/EEE/31343C?text=Tsitska-Tsolikouri',
    regions: [imeretiId],
  },
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

    color: 'red',

    sweetness: 'dry',

    averageRating: 4.7,

    price: 850,

    volume: 0.75,

    boxQuantity: 6,

    hasPackaging: true,

    alcohol: '13.5%',

    decanting: true,

    bottleDiameter: '75mm',

    servingTemperature: '16-18°C',

    foodPairing: ['Steak', 'Lamb', 'Aged Cheese'],

    supplier: 'Main Supplier Inc.',
  },

  {
    _id: wine2Id,

    winery: winery1Id,

    name: 'Chardonnay Odesa',

    vintage: 2022,

    grape: chardonnayId,

    description: 'Fresh white wine with bright fruit aromas and a light mineral aftertaste.',

    tastingNotes: ['green apple', 'lemon', 'minerals'],

    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Chardonnay_Odesa',

    color: 'white',

    sweetness: 'dry',

    averageRating: 4.5,

    price: 620,

    volume: 0.75,

    boxQuantity: 6,

    hasPackaging: true,

    alcohol: '12.5%',

    decanting: false,

    bottleDiameter: '75mm',

    servingTemperature: '8-10°C',

    foodPairing: ['Fish', 'Seafood', 'Salads'],

    supplier: 'Coastal Wines Distribution',
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

    color: 'red',

    sweetness: 'semi-dry',

    averageRating: 4.3,

    price: 580,

    volume: 0.75,

    boxQuantity: 6,

    hasPackaging: false,

    alcohol: '13.0%',

    decanting: false,

    bottleDiameter: '76mm',

    servingTemperature: '15-17°C',

    foodPairing: ['Pizza', 'Pasta', 'Grilled Vegetables'],

    supplier: 'Southern Grapes Ltd.',
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

    color: 'rose',

    sweetness: 'dry',

    averageRating: 4.6,

    price: 490,

    volume: 0.75,

    boxQuantity: 12,

    hasPackaging: true,

    alcohol: '12.0%',

    decanting: false,

    bottleDiameter: '75mm',

    servingTemperature: '7-9°C',

    foodPairing: ['Light snacks', 'Salads', 'Goat cheese'],

    supplier: 'Southern Grapes Ltd.',
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

    color: 'white',

    sweetness: 'semi-sweet',

    averageRating: 4.2,

    price: 710,

    volume: 0.75,

    boxQuantity: 6,

    hasPackaging: true,

    alcohol: '11.5%',

    decanting: false,

    bottleDiameter: '75mm',

    servingTemperature: '6-8°C',

    foodPairing: ['Spicy Asian cuisine', 'Fruit desserts'],

    supplier: 'Mountain Vineyards Co.',
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

    color: 'rose',

    sweetness: 'semi-dry',

    averageRating: 4.0,

    price: 380,

    volume: 0.75,

    boxQuantity: 12,

    hasPackaging: false,

    alcohol: '10.5%',

    decanting: false,

    bottleDiameter: '80mm',

    servingTemperature: '5-7°C',

    foodPairing: ['Appetizers', 'Fruits', 'Desserts'],

    supplier: 'Mountain Vineyards Co.',
  },
  {
    _id: wine7Id,
    winery: winery4Id,
    name: 'Saperavi Qvevri',
    vintage: 2019,
    grape: saperaviId,
    description:
      'Classic Kakhetian Saperavi, aged in qvevri. A full-bodied, tannic wine with a rich bouquet of black cherry and pomegranate.',
    tastingNotes: ['black cherry', 'pomegranate', 'blackberry', 'spice'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Saperavi_Qvevri',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.8,
    price: 950,
    volume: 0.75,
    boxQuantity: 6,
    hasPackaging: true,
    alcohol: '14.0%',
    decanting: true,
    servingTemperature: '18-20°C',
    foodPairing: ['Shashlik', 'Khachapuri', 'Aged Guda cheese'],
    supplier: 'Georgian Wine Imports',
  },
  {
    _id: wine8Id,
    winery: winery4Id,
    name: 'Kindzmarauli',
    vintage: 2021,
    grape: saperaviId,
    description:
      'A naturally semi-sweet red wine from the Kindzmarauli microzone. It has a harmonious taste with notes of ripe cherry and blackberry.',
    tastingNotes: ['ripe cherry', 'blackberry', 'jam'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Kindzmarauli',
    color: 'red',
    sweetness: 'semi-sweet',
    averageRating: 4.7,
    price: 880,
    volume: 0.75,
    boxQuantity: 6,
    hasPackaging: true,
    alcohol: '11.5%',
    decanting: false,
    servingTemperature: '14-16°C',
    foodPairing: ['Desserts', 'Fruits', 'Blue cheese'],
    supplier: 'Georgian Wine Imports',
  },
  {
    _id: wine9Id,
    winery: winery5Id,
    name: 'Tsitska-Tsolikouri',
    vintage: 2022,
    grape: tsitskaTsolikouriId,
    description:
      'A light, refreshing white wine from Imereti. It has a bright acidity and aromas of green apple, pear, and wildflowers.',
    tastingNotes: ['green apple', 'pear', 'wildflowers', 'citrus'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Tsitska_Tsolikouri',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 750,
    volume: 0.75,
    boxQuantity: 6,
    hasPackaging: false,
    alcohol: '12.0%',
    decanting: false,
    servingTemperature: '10-12°C',
    foodPairing: ['Imeretian cheese', 'Pkhali', 'Grilled fish'],
    supplier: 'Georgian Artisan Wines',
  },
  {
    _id: wine10Id,
    winery: winery5Id,
    name: 'Otskhanuri Sapere',
    vintage: 2020,
    grape: saperaviId, // Assuming Otskhanuri Sapere is a type of Saperavi for simplicity
    description:
      'A rare red wine from Imereti, known for its high acidity and rich tannic structure. Notes of red berries, herbs, and spices.',
    tastingNotes: ['red berries', 'herbs', 'spices', 'pomegranate'],
    imageUrl: 'https://placehold.co/400x600/EEE/31343C?text=Otskhanuri_Sapere',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 1100,
    volume: 0.75,
    boxQuantity: 6,
    hasPackaging: true,
    alcohol: '13.0%',
    decanting: true,
    servingTemperature: '16-18°C',
    foodPairing: ['Game', 'Spicy meat dishes', 'Lobio'],
    supplier: 'Georgian Artisan Wines',
  },
];

export const tours = [
  {
    _id: tour1Id,
    winery: winery1Id,
    name: 'Sunny Valley Wine Experience',
    description:
      'Discover the art of winemaking at Sunny Valley. Tour our vineyards, learn about the production process, and enjoy a guided tasting of our premium wines paired with local delicacies.',
    duration: 180,
    price: 450,
    images: [
      'https://placehold.co/600x400/EEE/31343C?text=Tour_Sunny_1',
      'https://placehold.co/600x400/EEE/31343C?text=Tour_Sunny_2',
    ],
    groupSize: {
      min: 2,
      max: 15,
    },
  },
  {
    _id: tour2Id,
    winery: winery4Id,
    name: 'Kakheti Qvevri Wine Tour',
    description:
      'Immerse yourself in ancient Georgian winemaking traditions. Visit our qvevri cellar, learn about the 8000-year-old method of fermentation in clay amphorae, and taste exceptional Saperavi and amber wines.',
    duration: 240,
    price: 850,
    images: [
      'https://placehold.co/600x400/EEE/31343C?text=Tour_Kakheti_1',
      'https://placehold.co/600x400/EEE/31343C?text=Tour_Kakheti_2',
    ],
    groupSize: {
      min: 4,
      max: 20,
    },
  },
  {
    _id: tour3Id,
    winery: winery4Id,
    name: 'Kindzmarauli Cellar Tasting',
    description:
      'Exclusive tasting of our premium Kindzmarauli and Mukuzani wines in the historic cellar. Learn about the unique microclimate of Kakheti and what makes these wines special.',
    duration: 120,
    price: 650,
    images: ['https://placehold.co/600x400/EEE/31343C?text=Tour_Cellar_1'],
    groupSize: {
      min: 2,
      max: 10,
    },
  },
  {
    _id: tour4Id,
    winery: winery5Id,
    name: "Baia's Wine Family Experience",
    description:
      'Experience authentic Imeretian hospitality at Baias Wine. Meet the sisters who founded the winery, explore their qvevri cellar, and enjoy a traditional Georgian feast with their natural wines.',
    duration: 210,
    price: 750,
    images: [
      'https://placehold.co/600x400/EEE/31343C?text=Tour_Baia_1',
      'https://placehold.co/600x400/EEE/31343C?text=Tour_Baia_2',
    ],
    groupSize: {
      min: 2,
      max: 12,
    },
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
