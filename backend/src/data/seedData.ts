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
      'The cradle of Georgian wine culture. This eastern region is famous for its ancient qvevri winemaking tradition and produces the majority of Georgia premium wines. The unique terroir with diverse microclimates creates ideal conditions for both red and white grape varieties.',
    imageUrl: 'https://placehold.co/600x400/841013/FFFFFF?text=Kakheti',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Located in eastern Georgia, Kakheti is dominated by the Alazani and Iori river valleys. The climate is subtropical, with hot summers and relatively mild winters, providing excellent sun exposure for vineyards.',
      features: ['Alazani Valley', 'Caucasus Mountains protection', '300+ sunny days'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'The soils of Kakheti are incredibly diverse, ranging from brown forest soils to alluvial and volcanic layers. Many vineyards sit on limestone-rich terrain which contributes to the mineral character of the wines.',
      mainTypes: ['Brown Forest', 'Alluvial', 'Cinnamonic'],
      properties: ['Well-drained', 'Mineral-rich', 'High clay content'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Winemaking in Kakheti dates back 8,000 years. The traditional Qvevri method (fermenting in large clay jars buried underground) is recognized by UNESCO as intangible cultural heritage. Wine is central to the Georgian "Supra" (feast) culture.',
      rituals: ['Qvevri sealing', 'Rtveli harvest festival', 'Supra feast tradition'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Rkatsiteli', description: 'The most widely planted white variety.' },
        { name: 'Mtsvane Kakhuri', description: 'Produces aromatic, elegant white wines.' },
      ],
      red: [
        { name: 'Saperavi', description: 'Georgias premier red grape, deep and robust.' },
        { name: 'Cabernet Sauvignon', description: 'Successfully adapted international variety.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description:
        'Kakheti is known for both robust reds and complex amber wines. The region produces some of the most prestigious aged wines in Georgia.',
      styles: ['Qvevri Amber', 'Full-bodied Dry Red', 'Semi-sweet Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description:
        'Kakheti hosts most of Georgias PDOs, ensuring quality and authenticity of regional styles.',
      list: ['Mukuzani', 'Tsinandali', 'Kindzmarauli', 'Napareuli', 'Teliani'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'Kakheti is the heart of the industry, producing over 70% of Georgia total wine volume and housing its most historic estates.',
      points: [
        'Economic powerhouse',
        'Historical winemaking center',
        'Home to premier wine research',
      ],
    },
  },
  {
    _id: imeretiId,
    name: 'Imereti',
    description:
      'The green heart of Georgia, famous for its fresh white wines and traditional winemaking methods. Located in the western part of the country, Imereti enjoys a humid subtropical climate perfect for cultivating delicate grape varieties.',
    imageUrl: 'https://placehold.co/600x400/006633/FFFFFF?text=Imereti',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Situated in western Georgia, Imereti has a humid subtropical climate. The region is protected by mountain ranges, leading to moderate temperatures and high humidity, ideal for crisp white wines.',
      features: ['Western Georgia', 'Humid Subtropical', 'Protected by mountains'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'The soils are diverse, with significant deposits of heavy clay and limestone-rich layers. These conditions help retain moisture and impart a unique mineral profile to the local wines.',
      mainTypes: ['Heavy Clay', 'Limestone', 'Alluvial'],
      properties: ['Moisture-retaining', 'Mineral-rich', 'Cooler soil temperature'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'The Imeretian method is a lighter variation of the Qvevri tradition, where fewer skins are used during fermentation, resulting in fresher, more elegant wines with higher acidity.',
      rituals: ['Imeretian Qvevri style', 'Autumn Rtveli', 'Local wine festivals'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Tsitska', description: 'Produces light-bodied, floral white wines.' },
        { name: 'Tsolikouri', description: 'The most popular white variety in western Georgia.' },
        { name: 'Krakhuna', description: 'Known for full-bodied, characterful white wines.' },
      ],
      red: [
        { name: 'Otskhanuri Sapere', description: 'A rare and powerful red variety.' },
        { name: 'Aladasturi', description: 'Produces light, aromatic red and rose wines.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description:
        'Imereti is renowned for its vibrant, high-acidity white wines and elegant, lighter-styled Qvevri expressions.',
      styles: ['Crisp Dry White', 'Elegant Amber', 'Natural Sparkling'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'The region focuses on specific micro-zones that produce unique expressions.',
      list: ['Sviri'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'As the largest wine region in western Georgia, Imereti is crucial for maintaining diversity and preserving unique grape varieties found nowhere else.',
      points: [
        'Center of western winemaking',
        'Biodiversity hotspot',
        'Famous for elegant white wines',
      ],
    },
  },
  {
    _id: rachaId,
    name: 'Racha-Lechkhumi',
    description:
      'A mountainous region in northwestern Georgia known for premium red wines. The high-altitude vineyards at 800-1200 meters create unique conditions for slow-ripening grapes. Racha is famous for producing prestigious aged wines.',
    imageUrl: 'https://placehold.co/600x400/5D4037/FFFFFF?text=Racha',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'A remote mountainous region in northwestern Georgia. The vineyards are located at high altitudes in narrow river valleys, where cool nights and long sunny days ensure perfect grape ripening.',
      features: ['High altitude (800-1200m)', 'Continental climate', 'Alpine influences'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'The soils are predominantly stony and calcareous (limestone-rich), which provide excellent drainage and contribute to the concentrated flavor profiles of Racha red wines.',
      mainTypes: ['Calcareous', 'Stony', 'Sandy Loam'],
      properties: ['Excellent drainage', 'Heat-reflective stones', 'Limestone influence'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Racha is famous for its naturally semi-sweet wines, a tradition born from the cool climate which naturally stops fermentation, preserving the grapes natural sweetness.',
      rituals: ['Mountain viticulture', 'Late harvest', 'Small family estates'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Tsitska', description: 'Grown in lower Lechkhumi for fresh white wines.' },
        { name: 'Tsolikouri', description: 'Widely planted for semi-sweet white wines.' },
      ],
      red: [
        { name: 'Aleksandrouli', description: 'The noble grape used for Khvanchkara.' },
        { name: 'Mujuretuli', description: 'Always blended with Aleksandrouli for depth.' },
        { name: 'Usakhelouri', description: 'A rare, ultra-premium red variety from Lechkhumi.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description:
        'Famous worldwide for naturally semi-sweet red wines, particularly the legendary Khvanchkara.',
      styles: ['Naturally Semi-sweet Red', 'Premium Dry Red', 'Rare Varietals'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Home to some of the most prestigious and internationally recognized PDOs.',
      list: ['Khvanchkara', 'Tvishi', 'Usakhelouri'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'Racha-Lechkhumi represents the "boutique" side of Georgian wine, focusing on rarity, quality, and extreme viticulture.',
      points: [
        'Home to iconic semi-sweet wines',
        'Extreme viticulture leader',
        'Source of Georgias rarest grapes',
      ],
    },
  },
  {
    _id: kartliId,
    name: 'Kartli',
    description:
      'The central region surrounding Tbilisi, offering diverse microclimates and soils. Kartli has emerged as a center for natural and orange wines, with many small producers experimenting with ancient varieties.',
    imageUrl: 'https://placehold.co/600x400/455A64/FFFFFF?text=Kartli',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Located in central Georgia, Kartli includes the Mtkvari River valley. The climate is continental with hot summers and cold winters, influenced by both eastern and western air masses.',
      features: ['Central Georgia', 'River Valley influence', 'Varied microclimates'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'Diverse soils include alluvial deposits along the rivers and sandy, limestone-rich soils on the slopes. This variety allows for a wide range of wine styles from sparkling to robust reds.',
      mainTypes: ['Alluvial', 'Sandy', 'Limestone'],
      properties: ['Well-drained', 'Diverse mineral content', 'Balanced fertility'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Kartli is a hub for the modern Georgian natural wine movement. It has a long history of sparkling wine production and is famous for its unique vertical-press traditions.',
      rituals: ['Natural wine movement', 'Sparkling wine heritage', 'City-edge viticulture'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Chinuri', description: 'Ideal for both still and sparkling wines.' },
        { name: 'Goruli Mtsvane', description: 'Produces aromatic, floral wines.' },
      ],
      red: [
        { name: 'Tavkveri', description: 'Versatile red used for still and sparkling rose.' },
        { name: 'Shavkapito', description: 'An ancient variety producing elegant, mineral reds.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description:
        'Known for Georgias best traditional method sparkling wines and elegant, mineral-driven natural wines.',
      styles: ['Traditional Sparkling', 'Natural White & Amber', 'Elegant Light Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Contains key micro-zones for sparkling and specialized still wines.',
      list: ['Atenuri', 'Bolnisi'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'Kartli bridges the gap between traditional heritage and modern innovation, serving as the experimental heart of Georgian wine.',
      points: [
        'Leader in natural wine',
        'Center for sparkling production',
        'Historical cultural hub',
      ],
    },
  },
  {
    _id: adjaraId,
    name: 'Adjara',
    description:
      'A scenic coastal region in southwestern Georgia with a unique maritime climate. Adjara is renowned for producing Chkhaveri, a rare pink grape variety that creates elegant rose wines.',
    imageUrl: 'https://placehold.co/600x400/0277BD/FFFFFF?text=Adjara',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Located along the Black Sea coast, Adjara has a humid maritime climate with high rainfall and mild temperatures throughout the year.',
      features: ['Coastal proximity', 'Humid Maritime', 'High precipitation'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'The soils are predominantly red and yellow podzolic, rich in iron and other minerals, which contribute to the unique character of local varieties.',
      mainTypes: ['Red Podzolic', 'Yellow Podzolic'],
      properties: ['Acidic', 'Iron-rich', 'Well-drained on slopes'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Adjara has a long history of mountain viticulture, where vines were traditionally grown up trees (Maglari method).',
      rituals: ['Mountain vine cultivation', 'Maritime harvest', 'Traditional family cellars'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Tsolikouri', description: 'Adapts well to the humid coastal climate.' }],
      red: [{ name: 'Chkhaveri', description: 'The pride of Adjara, making delicate rose wines.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description:
        'Famous for its elegant Chkhaveri rose and light, refreshing white wines with high acidity.',
      styles: ['Delicate Rose', 'Crisp White', 'Natural Semi-sweet'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Focusing on the unique micro-zones of the Adjarian mountains.',
      list: ['Keda'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'Adjara preserves unique coastal and mountain viticulture traditions.',
      points: ['Maritime terroir leader', 'Home to rare Chkhaveri', 'Eco-tourism hub'],
    },
  },
  {
    _id: tbilisiId,
    name: 'Tbilisi',
    description:
      'The capital region and urban winemaking hub of Georgia. While not a traditional wine region, Tbilisi hosts many innovative wineries and wine bars showcasing diverse wine culture.',
    imageUrl: 'https://placehold.co/600x400/37474F/FFFFFF?text=Tbilisi',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Located in the heart of the country, Tbilisi has a moderate continental climate with hot summers and cool winters.',
      features: ['Urban microclimate', 'Mtkvari River valley', 'Sheltered by hills'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'The surrounding areas have diverse soils, including clay and alluvial deposits.',
      mainTypes: ['Clay', 'Alluvial', 'Urban soil layers'],
      properties: ['Varied', 'Balanced fertility'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Tbilisi is the center of the modern Georgian wine scene, hosting major festivals and experimental urban wineries.',
      rituals: ['New Wine Festival', 'Urban wine tastings', 'Wine bar culture'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Rkatsiteli', description: 'Widely available from surrounding regions.' }],
      red: [{ name: 'Saperavi', description: 'The staple of urban wine production.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Features a mix of traditional styles and modern experimental blends.',
      styles: ['Urban Blends', 'Natural Wines', 'Craft Labels'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Tbilisi serves as a hub for wines from all PDOs.',
      list: ['National Hub'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'As the capital, it is the primary market and promotional center for Georgian wine.',
      points: ['Commercial center', 'Tourism gateway', 'Education hub'],
    },
  },
  {
    _id: guriaId,
    name: 'Guria',
    description:
      'A small but significant region in western Georgia known for rare indigenous varieties. Guria produces distinctive wines from Tsolikouri and other local grapes.',
    imageUrl: 'https://placehold.co/600x400/2E7D32/FFFFFF?text=Guria',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'A humid region in western Georgia with a subtropical maritime climate, influenced by the Black Sea.',
      features: ['Subtropical humidity', 'Maritime influence', 'Lush vegetation'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'Red and yellow soils predominate, providing good conditions for local varietals.',
      mainTypes: ['Red Soil', 'Alluvial'],
      properties: ['Moist', 'Mineral-rich'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description: 'Guria has a unique tradition of polyphonic singing associated with the harvest.',
      rituals: ['Harvest songs', 'Traditional pressing', 'Local wine festivals'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Tsolikouri', description: 'The main white grape of the region.' }],
      red: [{ name: 'Jani', description: 'A rare and prized local red variety.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Known for high-quality dry and semi-sweet wines.',
      styles: ['Light White', 'Rare Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Developing PDOs based on local micro-zones.',
      list: ['Chkhaveri zones'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'Crucial for preserving rare western Georgian grape varieties.',
      points: ['Biodiversity', 'Cultural heritage', 'Unique terroir'],
    },
  },
  {
    _id: samtskheJavakhetiId,
    name: 'Samtskhe-Javakheti',
    description:
      'A southern highland region with a continental climate ideal for wine production. The region is known for producing robust wines with high acidity from varieties adapted to harsh winters.',
    imageUrl: 'https://placehold.co/600x400/6D4C41/FFFFFF?text=Samtskhe',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'A high-altitude plateau with a harsh continental climate and significant temperature fluctuations.',
      features: ['High altitude', 'Extreme temperatures', 'Volcanic plateau'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'Volcanic and stony soils provide unique mineral profiles.',
      mainTypes: ['Volcanic', 'Stony'],
      properties: ['Mineral-dense', 'Well-drained'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description: 'Revival of ancient terrace viticulture in high-altitude zones.',
      rituals: ['Terrace restoration', 'Mountain harvest', 'Ancient cellar finds'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Tamris Vazi', description: 'An ancient variety being rediscovered.' }],
      red: [{ name: 'Saperavi Budeshuriseburi', description: 'Adapted to higher altitudes.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Mineral-driven wines with high acidity and aging potential.',
      styles: ['High-acid White', 'Mineral Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Focusing on unique high-altitude micro-zones.',
      list: ['Vardzia zones'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'Leading the way in high-altitude and terrace viticulture research.',
      points: ['Historical revival', 'Extreme viticulture', 'Unique mineral terroir'],
    },
  },
  {
    _id: zakarpattiaId,
    name: 'Zakarpattia',
    description:
      'Ukraines most famous wine region, located in the southwestern Carpathian mountains. The unique microclimate and volcanic soils create ideal conditions for producing premium wines, particularly from indigenous grape varieties.',
    imageUrl: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Zakarpattia',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Sheltered by the Carpathian Mountains, this region enjoys a sunny and warm microclimate.',
      features: ['Carpathian protection', 'Warm microclimate', 'Volcanic slopes'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'Rich volcanic soils provide a distinct mineral character to the wines.',
      mainTypes: ['Volcanic', 'Clay', 'Rocky'],
      properties: ['Rich in minerals', 'Good heat retention'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description: 'A mix of Ukrainian, Hungarian, and European winemaking traditions.',
      rituals: ['Wine festivals', 'Cellar tastings', 'Autumn harvest celebrations'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Leanka', description: 'A delicate and aromatic white variety.' }],
      red: [{ name: 'Cabernet Sauvignon', description: 'Produces structured and fruity reds.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Famous for both aromatic whites and full-bodied reds.',
      styles: ['Aromatic White', 'Mineral Red', 'Dessert Wine'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Recognized geographical indications for Transcarpathian wines.',
      list: ['Zakarpattia'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'A key Ukrainian partner and producer of high-quality European-style wines.',
      points: ['Western gateway', 'Volcanic terroir leader', 'Cultural bridge'],
    },
  },
  {
    _id: odesaId,
    name: 'Odesa',
    description:
      'A major wine-producing region in southern Ukraine with a long winemaking tradition. The Black Sea coast provides a mild climate perfect for cultivating international grape varieties.',
    imageUrl: 'https://placehold.co/600x400/87CEEB/333333?text=Odesa',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description: 'A mild maritime climate with long, sunny summers influenced by the Black Sea.',
      features: ['Maritime influence', 'Steppe plains', 'Sun-drenched vineyards'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'Black soil (chernozem) and sandy-clay deposits predominate.',
      mainTypes: ['Chernozem', 'Sandy-Clay'],
      properties: ['Fertile', 'Balanced'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description: 'Home to some of Ukraines largest and most historic wineries.',
      rituals: ['Sea-side festivals', 'Industrial-scale harvest', 'Wine tourism'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Telti-Kuruk', description: 'A unique local variety from Shabo.' }],
      red: [{ name: 'Cabernet Sauvignon', description: 'The dominant red variety.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Versatile range from sparkling to heavy reds.',
      styles: ['Sparkling', 'Coastal White', 'Robust Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Developing quality standards for coastal zones.',
      list: ['Shabo', 'Yalpuh'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'The largest wine production center in Ukraine.',
      points: ['Industrial leader', 'Maritime terroir', 'Export hub'],
    },
  },
  {
    _id: khersonId,
    name: 'Kherson',
    description:
      'A southern Ukrainian region known for its vast vineyards and modern winemaking. The steppe climate and fertile soils produce reliable yields of quality grapes.',
    imageUrl: 'https://placehold.co/600x400/DAA520/333333?text=Kherson',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description: 'Dry steppe climate with hot summers and significant irrigation needs.',
      features: ['Steppe climate', 'Dnipro River proximity', 'Low rainfall'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'Sandy soils and chestnut soils are common in the vineyard areas.',
      mainTypes: ['Sandy', 'Chestnut Soil'],
      properties: ['Light', 'Warm'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description: 'Focused on modern large-scale production and irrigation techniques.',
      rituals: ['Modern harvest', 'Irrigation management', 'Local tastings'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Rkatsiteli', description: 'Widely planted for bulk and quality wines.' }],
      red: [{ name: 'Saperavi', description: 'Adapts well to the hot steppe climate.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Reliable quality wines with good varietal expression.',
      styles: ['Steppe White', 'Fruit-forward Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Identifying specific river-influenced micro-zones.',
      list: ['Lower Dnipro'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'Key region for large-scale viticulture in Ukraine.',
      points: ['Production volume', 'Modern techniques', 'River-side terroir'],
    },
  },
  {
    _id: mykolaivId,
    name: 'Mykolaiv',
    description:
      'A historic Ukrainian wine region in the southern steppe. The region has been developing its winemaking industry with a focus on both traditional and experimental varieties.',
    imageUrl: 'https://placehold.co/600x400/DEB887/333333?text=Mykolaiv',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description: 'Continental steppe climate with maritime influences near the estuaries.',
      features: ['Estuary influence', 'Steppe plains', 'Moderate rainfall'],
    },
    soils: {
      title: 'Soils of Region',
      description: 'Fertile black soils and clay-limestone deposits.',
      mainTypes: ['Chernozem', 'Limestone'],
      properties: ['Rich', 'Good structure'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description: 'A growing scene of boutique and artisanal wineries.',
      rituals: ['Boutique tastings', 'New wave festivals', 'Experimental harvest'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Chardonnay', description: 'Successfully grown for premium whites.' }],
      red: [{ name: 'Merlot', description: 'Produces soft and aromatic reds.' }],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Known for balanced and elegant European-style wines.',
      styles: ['Elegant White', 'Soft Red', 'Rose Blends'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Establishing micro-zones near the Southern Bug estuary.',
      list: ['Estuary zones'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'Emerging leader in high-quality boutique wine production in Ukraine.',
      points: ['Quality focus', 'Boutique growth', 'Estuary terroir'],
    },
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
