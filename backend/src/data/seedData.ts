import mongoose from 'mongoose';

// User IDs
const owner1Id = new mongoose.Types.ObjectId();

// Country IDs
const georgiaId = new mongoose.Types.ObjectId();
const ukraineId = new mongoose.Types.ObjectId();

// Region IDs
const kakhetiId = new mongoose.Types.ObjectId();
const imeretiId = new mongoose.Types.ObjectId();
const rachaId = new mongoose.Types.ObjectId();
const kartliId = new mongoose.Types.ObjectId();
const adjaraId = new mongoose.Types.ObjectId();
const tbilisiId = new mongoose.Types.ObjectId();
const guriaId = new mongoose.Types.ObjectId();
const samtskheJavakhetiId = new mongoose.Types.ObjectId();
const abkhaziaId = new mongoose.Types.ObjectId();
const samegreloId = new mongoose.Types.ObjectId();
const mtskhetaId = new mongoose.Types.ObjectId();
const zakarpattiaId = new mongoose.Types.ObjectId();
const odesaId = new mongoose.Types.ObjectId();
const khersonId = new mongoose.Types.ObjectId();
const mykolaivId = new mongoose.Types.ObjectId();

// Winery IDs
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
const win11Id = new mongoose.Types.ObjectId();

// Grape IDs
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
const ojaleshiId = new mongoose.Types.ObjectId();
const usakhelouriId = new mongoose.Types.ObjectId();
const goruliMtsvaneId = new mongoose.Types.ObjectId();
const budeshuriId = new mongoose.Types.ObjectId();
const cabernetSauvignonId = new mongoose.Types.ObjectId();
const janiId = new mongoose.Types.ObjectId();
const avasirkhuaId = new mongoose.Types.ObjectId();
const kachichiId = new mongoose.Types.ObjectId();
const meskhuriMtsvaneId = new mongoose.Types.ObjectId();

// Wine IDs
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
const wine31Id = new mongoose.Types.ObjectId();

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
  { _id: abkhaziaId, name: 'Abkhazia', type: 'region', parentLocation: georgiaId },
  {
    _id: samegreloId,
    name: 'Samegrelo',
    type: 'region',
    parentLocation: georgiaId,
  },
  { _id: mtskhetaId, name: 'Mtskheta-Mtianeti', type: 'region', parentLocation: georgiaId },
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
      "The cradle of Georgian wine culture. This eastern region is famous for its ancient qvevri winemaking tradition and produces the majority of Georgia's premium wines. The unique terroir with diverse microclimates creates ideal conditions for both red and white grape varieties.",
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
        { name: 'Saperavi', description: "Georgia's premier red grape, deep and robust." },
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
        "Kakheti hosts most of Georgia's PDOs, ensuring quality and authenticity of regional styles.",
      list: ['Mukuzani', 'Tsinandali', 'Kindzmarauli', 'Napareuli', 'Teliani'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        "Kakheti is the heart of the industry, producing over 70% of Georgia's total wine volume and housing its most historic estates.",
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
        "Racha is famous for its naturally semi-sweet wines, a tradition born from the cool climate which naturally stops fermentation, preserving the grapes' natural sweetness.",
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
        "Source of Georgia's rarest grapes",
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
        "Known for Georgia's best traditional method sparkling wines and elegant, mineral-driven natural wines.",
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
      description:
        'The surrounding areas have diverse soils, including clay and alluvial deposits.',
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
      description:
        'As the capital, it is the primary market and promotional center for Georgian wine.',
      points: ['Commercial center', 'Tourism gateway', 'Education hub'],
    },
  },
  {
    _id: guriaId,
    name: 'Guria',
    description:
      'A historic coastal region in western Georgia with a humid subtropical climate. Guria is famous for its unique "Maglari" viticulture—where vines climb trees—and its rare Chkhaveri grape, which produces some of the most elegant rose and sparkling wines in the country.',
    imageUrl: 'https://placehold.co/600x400/2E7D32/FFFFFF?text=Guria',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'A humid region in western Georgia with a subtropical maritime climate, influenced by the Black Sea. The humidity and mild temperatures allow for very late harvests, sometimes extending into December.',
      features: ['Subtropical humidity', 'Black Sea influence', 'Late harvest (up to December)'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'Red and yellow podzolic soils predominate, rich in iron and other minerals, which contribute to the unique character of local varieties like Chkhaveri and Jani.',
      mainTypes: ['Red Soil', 'Yellow Podzolic', 'Alluvial'],
      properties: ['Iron-rich', 'Mineral-dense', 'Well-drained on slopes'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Guria winemaking is deeply tied to polyphonic singing. Historically, the region was influenced by the Scottish brothers Marr in the 19th century, who helped modernize local viticulture and preserve the rare Chkhaveri grape.',
      rituals: ['Maglari vine training', 'Polyphonic harvest songs', 'Late-winter Rtveli'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Tsolikouri', description: 'Adapts well to the humid climate.' },
        { name: 'Sakmiela', description: 'A rare, highly aromatic local white variety.' },
      ],
      red: [
        { name: 'Chkhaveri', description: 'The crown jewel, used for white, rose, and sparkling.' },
        { name: 'Jani', description: 'A rare red variety with high sugar and extract.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Known for high-quality, elegant dry and naturally sparkling wines.',
      styles: ['Elegant Rose', 'Aromatic White', 'Classic Method Sparkling'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Developing PDOs based on local micro-zones and unique grape varietals.',
      list: ['Chkhaveri micro-zones', 'Bakhvi'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'Crucial for preserving rare western Georgian grape varieties and extreme coastal viticulture.',
      points: ['Biodiversity leader', 'Maritime terroir pioneer', 'Unique cultural heritage'],
    },
  },
  {
    _id: samtskheJavakhetiId,
    name: 'Samtskhe-Javakheti',
    description:
      'One of the highest wine-growing regions in the world, Meskheti is the land of ancient rock-cut terraces. After centuries of neglect, this region is undergoing a miraculous revival, uncovering 400-year-old vines and producing mineral-rich wines from volcanic soils.',
    imageUrl: 'https://placehold.co/600x400/6D4C41/FFFFFF?text=Samtskhe',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'A high-altitude volcanic plateau (900-1700m) with a harsh continental climate and significant temperature fluctuations. The vineyards are mostly located on southern-facing terraces to capture maximum sunlight.',
      features: [
        'High altitude (up to 1700m)',
        'Extreme diurnal temperature shifts',
        'Ancient terraces (Oroko)',
      ],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'Volcanic and stony soils provide unique mineral profiles that are unparalleled in other Georgian regions.',
      mainTypes: ['Volcanic', 'Stony', 'Calcareous'],
      properties: ['Mineral-dense', 'Well-drained', 'High heat retention'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Famous for "Oroko"—ancient stone terraces built into the mountains. Meskheti has a tradition of "wild viticulture," where ancient vines survived for centuries in forests and on high-altitude slopes.',
      rituals: ['Terrace restoration', 'Mountain harvest', 'Discovery of ancient forest vines'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Meskhuri Mtsvane', description: 'Distinct from Kakhuri Mtsvane, very mineral.' },
        { name: 'Tamris Vazi', description: 'An ancient variety being rediscovered.' },
      ],
      red: [
        { name: 'Saperavi Meskhuri', description: 'A local, high-altitude clone of Saperavi.' },
        { name: 'Kharistvala', description: 'A rare, thick-skinned red variety.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Mineral-driven wines with high acidity and extreme aging potential.',
      styles: ['High-acid Mineral White', 'Structured Ghetto Red', 'Terrace Blends'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Focusing on unique high-altitude micro-zones and terrace viticulture.',
      list: ['Vardzia Terraces', 'Akhaltsikhe'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'Leading the way in high-altitude and terrace viticulture research and historical revival.',
      points: ['Historical revival', 'Extreme viticulture', 'Unique mineral terroir'],
    },
  },
  {
    _id: zakarpattiaId,
    name: 'Zakarpattia',
    description:
      "Ukraine's most famous wine region, located in the southwestern Carpathian mountains. The unique microclimate and volcanic soils create ideal conditions for producing premium wines, particularly from indigenous grape varieties.",
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
      description: "Home to some of Ukraine's largest and most historic wineries.",
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
  {
    _id: abkhaziaId,
    name: 'Abkhazia',
    description:
      'A legendary maritime region where the Black Sea meets the Caucasus. Abkhazia has a long history of producing light, aromatic wines that benefit from the limestone-rich coastal soils and high humidity, creating a unique "maritime" terroir.',
    imageUrl: 'https://placehold.co/600x400/006064/FFFFFF?text=Abkhazia',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Stretching along the Black Sea coast, Abkhazia enjoys high humidity and mild temperatures, protected by the Caucasus Mountains.',
      features: ['Maritime influence', 'Subtropical humidity', 'Mountain protection'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'Predominantly limestone and alluvial soils, which provide excellent drainage and mineral character to the grapes.',
      mainTypes: ['Limestone', 'Alluvial'],
      properties: ['High calcium content', 'Mineral-rich'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Abkhazian winemaking is characterized by small family vineyards and a preference for light, aromatic wines that perfectly complement the local spicy cuisine.',
      rituals: ['Maritime harvest', 'Oak barrel aging'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Avasirkhua', description: 'The most famous white grape of Abkhazia.' },
        { name: 'Tsolikouri', description: 'Gives fresh and balanced white wines.' },
      ],
      red: [
        { name: 'Kachichi', description: 'Produces deep, structured red wines.' },
        { name: 'Amlakhu', description: 'A rare variety used for premium reds.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Light, refreshing whites and famous naturally semi-sweet reds.',
      styles: ['Semi-sweet Red', 'Crisp White'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Historical micro-zones along the coastline.',
      list: ['Lykhny', 'Apsny', 'Anakopia'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description: 'Preserves the unique maritime terroir of the Black Sea coast.',
      points: ['Maritime viticulture', 'Unique local clones'],
    },
  },
  {
    _id: samegreloId,
    name: 'Samegrelo',
    description:
      "The heart of ancient Colchis, Samegrelo is a lush western region where winemaking dates back to antiquity. It is the spiritual home of the Ojaleshi grape, one of Georgia's oldest and most prized red varieties, traditionally grown using the Maglari method.",
    imageUrl: 'https://placehold.co/600x400/1B5E20/FFFFFF?text=Samegrelo',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Located in the humid western lowlands, rising up to the high peaks of Svaneti. The climate is warm and very humid, with the best vineyards situated in the Martvili and Senaki districts.',
      features: ['High rainfall', 'Warm humidity', 'River valleys'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'Fertile alluvial soils in the lowlands and rocky, mineral-rich soils in the upper regions.',
      mainTypes: ['Alluvial', 'Rocky', 'Limestone'],
      properties: ['High organic matter', 'Moisture-retentive'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        'Famous for "Maglari" viticulture—training vines to grow up trees. Megrelian winemaking is deeply intertwined with local folklore and festive rituals, with fermentation traditionally occurring in "Churi" (local qvevri).',
      rituals: ['Maglari vine training', 'Churi fermentation', 'Late-autumn harvest'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [{ name: 'Tsolikouri', description: 'Produces light, high-acid white wines.' }],
      red: [
        { name: 'Ojaleshi', description: 'The noble grape of Samegrelo, spicy and deep.' },
        { name: 'Koloshi', description: 'A rare, dark-skinned local variety being rediscovered.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description: 'Rich, semi-sweet Ojaleshi and refreshing, citrusy whites.',
      styles: ['Premium Semi-sweet Red', 'Citrusy White'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Focused on the legendary Ojaleshi micro-zones.',
      list: ['Salkhino'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'The source of some of the most aromatic semi-sweet wines and ancient viticulture methods.',
      points: ['Ojaleshi heritage', 'Ancient vine-training methods', 'Colchian roots'],
    },
  },
  {
    _id: mtskhetaId,
    name: 'Mtskheta-Mtianeti',
    description:
      "Centered around the ancient capital Mtskheta, this region is the historic gateway of Georgian Christianity and wine. It is a premier location for elegant, high-acid wines and is the heart of Georgia's traditional-method sparkling wine production.",
    imageUrl: 'https://placehold.co/600x400/BF360C/FFFFFF?text=Mtskheta',
    locationAndClimate: {
      title: 'Geographic Location and Climate',
      description:
        'Located at the confluence of the Mtkvari and Aragvi rivers. The region benefits from river-valley microclimates and limestone-rich slopes.',
      features: ['River confluence', 'Strategic location', 'Mountain valleys'],
    },
    soils: {
      title: 'Soils of Region',
      description:
        'A mix of river-deposited alluvial soils and limestone slopes, ideal for balanced viticulture and high-acid sparkling wines.',
      mainTypes: ['Alluvial', 'Limestone'],
      properties: ['Well-structured', 'Good mineral balance'],
    },
    cultureAndTraditions: {
      title: 'Winemaking Culture and Traditions',
      description:
        "Home to some of Georgia's oldest church vineyards. Winemaking here has always been closely linked to the spiritual and political life of the nation, with a focus on refined, celebratory styles.",
      rituals: ['Church vineyard blessings', 'Pilgrimage wine traditions'],
    },
    grape: {
      title: 'Main Grape Varieties of Region',
      white: [
        { name: 'Chinuri', description: 'Elegant variety perfect for sparkling wine.' },
        {
          name: 'Goruli Mtsvane',
          description: 'Aromatic and structured, often blended with Chinuri.',
        },
      ],
      red: [
        { name: 'Shavkapito', description: 'Produces elegant, mineral reds with herbal notes.' },
        { name: 'Tavkveri', description: 'Used for fruity reds and sparkling roses.' },
      ],
    },
    typicalWines: {
      title: 'Typical Wines of the Region',
      description:
        'High-quality traditional method sparkling wines and elegant, mineral-driven still wines.',
      styles: ['Traditional Sparkling', 'Elegant Amber', 'Light-bodied Dry Red'],
    },
    pdo: {
      title: 'Protected Designations of Origin (PDO)',
      description: 'Includes key micro-zones for dry and sparkling wines.',
      list: ['Atenuri (Sparkling PDO)', 'Mukhrani'],
    },
    regionImportance: {
      title: 'Importance of Region for Georgian Winemaking',
      description:
        'A key region for the production of Georgian sparkling wines and historical continuity.',
      points: ['Sparkling wine leader', 'Historical viticulture hub', 'Center for innovation'],
    },
  },
];

export const users = [
  {
    _id: owner1Id,
    firebaseUid: 'o1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    role: 'ADMIN',
  },
];

export const wineries = [
  {
    _id: win1Id,
    name: 'Shumi Estate',
    owner: owner1Id,
    country: georgiaId,
    region: kakhetiId,
    address: 'Tsinandali Village, Telavi',
    coordinates: { lat: 41.91, lng: 45.47 },
    websiteUrl: 'https://shumi.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/841013/FFFFFF?text=Shumi',
    contactEmail: 'info@shumi.ge',
    contactPhone: '+995322274848',
    averageRating: 4.9,
    whereToBuy: [
      { name: '8000 Vintages', url: 'https://8000vintages.ge' },
      { name: 'Winery Khareba Shop', url: 'https://winerykhareba.com' },
    ],
    history:
      'Shumi Estate is located in Tsinandali, the historical center of Georgian winemaking. The winery owns vineyards in almost all of Georgia’s unique micro-zones. Our history is a blend of ancient traditions and modern innovations, focusing on biological viticulture and rare endemic grape varieties.',
  },
  {
    _id: win2Id,
    name: 'Kateni',
    owner: owner1Id,
    country: georgiaId,
    region: kakhetiId,
    address: 'Kvareli, Kakheti',
    coordinates: { lat: 41.94, lng: 45.81 },
    websiteUrl: 'https://kateni.wine',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/31343C/FFFFFF?text=Kateni',
    contactEmail: 'hello@kateni.ge',
    contactPhone: '+99532987654',
    averageRating: 4.8,
    whereToBuy: [
      { name: 'Wine Library', url: 'https://winelibrary.ge' },
      { name: 'Smart Supermarket', url: 'https://smart.ge' },
    ],
    history:
      'Kateni is a family-run artisanal winery dedicated to natural qvevri wines. We believe in minimal intervention, allowing the grapes to express the true character of the Alazani Valley. Our Kisi and Saperavi are fermented with wild yeasts and aged for months in buried clay jars.',
  },
  {
    _id: win3Id,
    name: 'Mikaber',
    owner: owner1Id,
    country: georgiaId,
    region: rachaId,
    address: 'Ambrolauri, Racha',
    coordinates: { lat: 42.52, lng: 43.14 },
    websiteUrl: 'https://mikaber.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/5D4037/FFFFFF?text=Mikaber',
    contactEmail: 'contact@mikaber.ge',
    contactPhone: '+99543212345',
    averageRating: 4.7,
    whereToBuy: [
      { name: 'Racha Wine House', url: 'https://rachawines.ge' },
    ],
    history:
      'Nestled in the high mountains of Racha, Mikaber specializes in the noble Aleksandrouli and Mujuretuli grapes. Our vineyards sit at 800-1000 meters altitude, where cool nights ensure slow ripening and exceptional aromatic complexity in our wines.',
  },
  {
    _id: win4Id,
    name: "Ilya's Wine",
    owner: owner1Id,
    country: georgiaId,
    region: kartliId,
    address: 'Kiketi Village, Kartli',
    coordinates: { lat: 41.71, lng: 44.63 },
    websiteUrl: 'https://ilyawine.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/455A64/FFFFFF?text=Ilya',
    contactEmail: 'ilya@ilyawine.ge',
    contactPhone: '+99544234567',
    averageRating: 4.9,
    whereToBuy: [
      { name: 'Tbilisi Wine Museum shop', url: '#' },
      { name: 'Natural Wine Bar', url: '#' },
    ],
    history:
      'Ilya is a pioneer of the modern natural wine movement in Kartli. Using 300-year-old qvevris inherited from his grandfather, he produces unfiltered, vibrant wines that have gained a cult following among natural wine enthusiasts worldwide.',
  },
  {
    _id: win5Id,
    name: 'Chkhaveri House',
    owner: owner1Id,
    country: georgiaId,
    region: adjaraId,
    address: 'Keda Municipality, Adjara',
    coordinates: { lat: 41.97, lng: 41.73 },
    websiteUrl: 'https://chkhaverihouse.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/0277BD/FFFFFF?text=Chkhaveri',
    contactEmail: 'info@chkhaverihouse.ge',
    contactPhone: '+99522234567',
    averageRating: 4.6,
    whereToBuy: [
      { name: 'Batumi Wine Exchange', url: '#' },
    ],
    history:
      'Chkhaveri House is dedicated to the preservation of the rare Chkhaveri grape. Our maritime vineyards benefit from the Black Sea breeze, which imparts a unique salinity and freshness to our delicate rose and white wines.',
  },
  {
    _id: win6Id,
    name: 'Tbilvino',
    owner: owner1Id,
    country: georgiaId,
    region: tbilisiId,
    address: '2 Sanapiro St, Tbilisi',
    coordinates: { lat: 41.71, lng: 44.82 },
    websiteUrl: 'https://tbilvino.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/37474F/FFFFFF?text=Tbilvino',
    contactEmail: 'tbilvino@tbilvino.ge',
    contactPhone: '+99532234567',
    averageRating: 4.5,
    whereToBuy: [
      { name: 'Goodwill', url: 'https://goodwill.ge' },
      { name: 'Carrefour Georgia', url: 'https://carrefourgeorgia.com' },
    ],
    history:
      'Founded in 1962, Tbilvino is one of the largest and most successful wine producers in Georgia. We export to over 30 countries, making Georgian wine heritage accessible to global consumers while maintaining high quality standards and regional authenticity.',
  },
  {
    _id: win7Id,
    name: 'Dakishvili Family',
    owner: owner1Id,
    country: georgiaId,
    region: kakhetiId,
    address: 'Shalauri, Telavi',
    coordinates: { lat: 41.9, lng: 45.48 },
    websiteUrl: 'https://dakishvili.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/8D6E63/FFFFFF?text=Dakishvili',
    contactEmail: 'family@dakishvili.ge',
    contactPhone: '+99533234567',
    averageRating: 4.9,
    whereToBuy: [
      { name: 'Wine Gallery', url: 'https://winegallery.ge' },
    ],
    history:
      'With three generations of winemaking expertise, the Dakishvili family produces some of the most sought-after boutique wines in Georgia. Our Viticulturist and Winemaker, Temur Dakishvili, focuses on low-yield vineyards and long skin contact in qvevri.',
  },
  {
    _id: win8Id,
    name: 'Chateau Mukhrani',
    owner: owner1Id,
    country: georgiaId,
    region: kartliId,
    address: 'Mukhrani, Kartli',
    coordinates: { lat: 41.93, lng: 44.58 },
    websiteUrl: 'https://chateaumukhrani.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/B71C1C/FFFFFF?text=Mukhrani',
    contactEmail: 'info@mukhrani.com',
    contactPhone: '+99544234567',
    averageRating: 4.6,
    whereToBuy: [
      { name: 'Chateau Mukhrani Boutique', url: '#' },
      { name: 'Duty Free Tbilisi', url: '#' },
    ],
    history:
      'Restored to its former royal glory, Chateau Mukhrani was founded in 1878 by Ivane Mukhranbatoni. Today, it combines historical nobility with state-of-the-art winemaking technology, producing premium European-style and traditional Georgian wines.',
  },
  {
    _id: win9Id,
    name: 'Uzhgorod Wines',
    owner: owner1Id,
    country: ukraineId,
    region: zakarpattiaId,
    address: 'Uzhgorod, Ukraine',
    coordinates: { lat: 48.62, lng: 22.28 },
    websiteUrl: 'https://uzhgorod.wine',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/8B4513/FFFFFF?text=Uzhgorod',
    contactEmail: 'info@uzhgorod.ua',
    contactPhone: '+38031234567',
    averageRating: 4.4,
    whereToBuy: [
      { name: 'Silpo', url: 'https://silpo.ua' },
      { name: 'WineTime', url: 'https://winetime.ua' },
    ],
    history:
      'Located in the sun-drenched volcanic slopes of Zakarpattia, our winery revives the ancient traditions of Carpathian viticulture. We focus on local varieties like Leanka and international grapes that have adapted perfectly to our unique terroir.',
  },
  {
    _id: win10Id,
    name: 'Odesa Prestige',
    owner: owner1Id,
    country: ukraineId,
    region: odesaId,
    address: 'Odesa Region, Ukraine',
    coordinates: { lat: 46.48, lng: 30.72 },
    websiteUrl: 'https://odesaprestige.com.ua',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: false,
    logoUrl: 'https://placehold.co/400x400/87CEEB/333333?text=Odesa',
    contactEmail: 'export@odesa.ua',
    contactPhone: '+38048234567',
    averageRating: 4.3,
    whereToBuy: [
      { name: 'Novus', url: 'https://novus.ua' },
      { name: 'Metro UA', url: 'https://metro.ua' },
    ],
    history:
      'Born from the maritime breezes of the Black Sea, Odesa Prestige represents the modern face of Ukrainian winemaking. Our facility utilizes cold fermentation and careful oak aging to create wines with exceptional freshness and balance.',
  },
  {
    _id: win11Id,
    name: 'Obene',
    owner: owner1Id,
    country: georgiaId,
    region: samegreloId,
    address: 'Martvili, Samegrelo',
    coordinates: { lat: 42.41, lng: 42.37 },
    websiteUrl: 'https://obene.ge',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isVip: true,
    logoUrl: 'https://placehold.co/400x400/1B5E20/FFFFFF?text=Obene',
    contactEmail: 'obene@ge',
    contactPhone: '+995555123456',
    averageRating: 4.9,
    whereToBuy: [
      { name: 'Small Winemakers Shop', url: '#' },
    ],
    history:
      'Obene is a heart project dedicated to reviving the Ojaleshi grape in its ancestral home of Samegrelo. We use the traditional Maglari method where vines climb trees, and ferment our wines in "churi" — the western Georgian equivalent of qvevri.',
  },
];

export const grapes = [
  {
    _id: saperaviId,
    name: 'Saperavi',
    type: 'red',
    regions: [kakhetiId, rachaId],
    alsoKnownAs: ['Didisaperavi', 'Saperavi Budeshuriseburi'],
    description:
      'The most famous Georgian red grape variety, known for its deep color and robust structure. Saperavi is a teinturier grape, meaning its flesh is also red. It produces full-bodied wines with high acidity and tannins, featuring rich flavors of dark berries, plums, and a hint of tobacco when aged.',
    characteristics: ['Deep color', 'High tannins', 'Excellent aging potential', 'High acidity'],
    foodPairing: ['Grilled lamb (Mtsvadi)', 'Aged cheeses', 'Beef stew', 'Khinkali'],
    acidity: 'High',
    body: 'Full',
    tannins: 'High',
    aromas: ['Blackberry', 'Plum', 'Leather', 'Smoked tobacco'],
    agingPotential: '20+ years',
    imageUrls: ['https://placehold.co/400x600/4A148C/FFFFFF?text=Saperavi'],
  },
  {
    _id: rkatsiteliId,
    name: 'Rkatsiteli',
    type: 'white',
    regions: [kakhetiId, kartliId],
    alsoKnownAs: ['Topoli'],
    description:
      'One of the oldest and most widely planted white grape varieties in Georgia. Known for its versatility, it can be used for crisp dry whites, traditional qvevri amber wines, and even sparkling wines. Its name literally means "red vine" due to the reddish hue of its stems.',
    characteristics: ['Floral notes', 'Fresh acidity', 'Versatile winemaking', 'High sugar accumulation'],
    foodPairing: ['Poultry', 'Walnut sauce (Satsivi)', 'Fresh vegetables', 'Kachapuri'],
    acidity: 'Medium-High',
    body: 'Medium',
    aromas: ['Wildflower', 'Green apple', 'Honey', 'Dried walnut'],
    agingPotential: '5-10 years (Amber)',
    imageUrls: ['https://placehold.co/400x600/F9A825/FFFFFF?text=Rkatsiteli'],
  },
  {
    _id: kisiId,
    name: 'Kisi',
    type: 'white',
    regions: [kakhetiId],
    alsoKnownAs: ['Kisi Kakhuri'],
    description:
      'An ancient aromatic white grape variety that was nearly extinct. It is now experiencing a remarkable renaissance. Kisi produces complex wines that combine the floral elegance of Mtsvane with the structure of Rkatsiteli.',
    characteristics: ['Intense aroma', 'Exotic fruit notes', 'Great for qvevri', 'Elegant structure'],
    foodPairing: ['Spicy Asian cuisine', 'Roasted chicken', 'Seafood', 'Fruit salads'],
    acidity: 'Medium',
    body: 'Full',
    aromas: ['Apricot', 'Pear', 'Honey', 'Tea leaves'],
    agingPotential: '10+ years',
    imageUrls: ['https://placehold.co/400x600/FFD700/31343C?text=Kisi'],
  },
  {
    _id: mtsvaneId,
    name: 'Mtsvane Kakhuri',
    type: 'white',
    regions: [kakhetiId],
    alsoKnownAs: ['Mtsvane'],
    description:
      'Meaning "green" in Georgian, this grape produces elegant white wines with a bright, greenish tint. It is prized for its intense citrus and floral aromas and is often blended with Rkatsiteli to add aromatic lift.',
    characteristics: ['Bright acidity', 'Citrus profile', 'Aromatic lifting', 'Fresh finish'],
    foodPairing: ['Light salads', 'Grilled fish', 'Goat cheese', 'Summer pasta'],
    acidity: 'High',
    body: 'Medium',
    aromas: ['Lemon', 'Grapefruit', 'White peach', 'Spring flowers'],
    agingPotential: '3-5 years',
    imageUrls: ['https://placehold.co/400x600/C0CA33/31343C?text=Mtsvane'],
  },
  {
    _id: khikhviId,
    name: 'Khikhvi',
    type: 'white',
    regions: [kakhetiId],
    alsoKnownAs: ['Janura'],
    description:
      'A rare Georgian white grape with exceptional potential for producing naturally semi-sweet and dessert wines. It accumulates sugar easily while maintaining its aromatic profile of exotic fruits.',
    characteristics: ['High sugar', 'Exotic aromatics', 'Soft acidity', 'Rich mouthfeel'],
    foodPairing: ['Blue cheese', 'Nut-based desserts', 'Spicy curry', 'Lobster'],
    acidity: 'Medium-Low',
    body: 'Full',
    aromas: ['Tropical fruit', 'Dried apricot', 'Clove', 'Honey'],
    agingPotential: '8-12 years',
    imageUrls: ['https://placehold.co/400x600/FFC107/333333?text=Khikhvi'],
  },
  {
    _id: tavkveriId,
    name: 'Tavkveri',
    type: 'red',
    regions: [kartliId],
    description:
      'A versatile red grape from the Kartli region. It is unique because it only has female flowers and requires other varieties nearby for pollination. It produces fresh, fruit-forward reds and vibrant roses.',
    characteristics: ['Fruit-forward', 'Soft tannins', 'Versatile styles', 'Vibrant acidity'],
    foodPairing: ['Salmon', 'Duck breast', 'Wild mushroom risotto', 'Light appetizers'],
    acidity: 'High',
    body: 'Medium-Light',
    tannins: 'Medium',
    aromas: ['Red cherry', 'Raspberry', 'Hibiscus', 'Mountain herbs'],
    agingPotential: '3-7 years',
    imageUrls: ['https://placehold.co/400x600/E53935/FFFFFF?text=Tavkveri'],
  },
  {
    _id: chkhaveriId,
    name: 'Chkhaveri',
    type: 'rose',
    regions: [adjaraId, guriaId],
    alsoKnownAs: ['Chkhaveri Rose'],
    description:
      "A rare pink-skinned grape variety from the maritime regions of Adjara and Guria. It is traditionally grown using the Maglari method. Chkhaveri creates some of the most delicate and sophisticated rose and white wines in Georgia.",
    characteristics: ['Maritime salinity', 'Light body', 'Elegant rose hue', 'High freshness'],
    foodPairing: ['Oysters', 'Grilled shrimp', 'Light poultry', 'Vegetable tempura'],
    acidity: 'Medium-High',
    body: 'Light',
    aromas: ['Wild strawberry', 'Rose petals', 'Citrus zest', 'Wet stones'],
    agingPotential: '3-5 years',
    imageUrls: ['https://placehold.co/400x600/F48FB1/333333?text=Chkhaveri'],
  },
  {
    _id: ojaleshiId,
    name: 'Ojaleshi',
    type: 'red',
    regions: [samegreloId],
    alsoKnownAs: ['Shonuri'],
    description:
      'One of the oldest Georgian red grape varieties from Samegrelo. Historically grown high up in trees (Maglari), it is known for its high sugar content and deep, spicy character. It is the signature grape of the Colchian wine heritage.',
    characteristics: ['Spicy aroma', 'Late ripening', 'High extraction', 'Deep color'],
    foodPairing: ['Spicy Megrelian dishes', 'Venison', 'Smoked meats', 'Walnut desserts'],
    acidity: 'Medium',
    body: 'Full',
    tannins: 'Medium-High',
    aromas: ['Blackberry', 'Black pepper', 'Pomegranate', 'Earth'],
    agingPotential: '10-15 years',
    imageUrls: ['https://placehold.co/400x600/2E7D32/FFFFFF?text=Ojaleshi'],
  },
  {
    _id: usakhelouriId,
    name: 'Usakhelouri',
    type: 'red',
    regions: [rachaId],
    description:
      'The "nameless" grape from Racha, considered one of the most prestigious and expensive varieties in Georgia. It grows on extremely steep slopes and produces intense, velvety wines with legendary aromatic complexity.',
    characteristics: ['Velvety texture', 'Ultra-premium', 'Limited production', 'Mountain character'],
    foodPairing: ['Fine dining red meat', 'Truffles', 'Dark chocolate', 'Quiet contemplation'],
    acidity: 'Medium',
    body: 'Full',
    tannins: 'Medium-Soft',
    aromas: ['Black cherry', 'Violet', 'Forest floor', 'Cinnamon'],
    agingPotential: '15+ years',
    imageUrls: ['https://placehold.co/400x600/880E4F/FFFFFF?text=Usakhelouri'],
  },
  {
    _id: cabernetSauvignonId,
    name: 'Cabernet Sauvignon',
    type: 'red',
    regions: [zakarpattiaId, odesaId],
    description:
      'The world-renowned international variety that has found a second home in Ukraine. In the volcanic soils of Zakarpattia and the maritime climate of Odesa, it produces structured wines with local terroir nuances.',
    characteristics: ['Firm structure', 'Dark fruit profile', 'Cedar notes', 'High tannins'],
    foodPairing: ['Steak', 'Roast beef', 'Hard cheeses', 'Game'],
    acidity: 'High',
    body: 'Full',
    tannins: 'High',
    aromas: ['Blackcurrant', 'Bell pepper', 'Cedar', 'Graphite'],
    agingPotential: '10-20 years',
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
      'A bold and powerful red wine from the heart of Kakheti. This exceptional Saperavi displays deep ruby color with rich aromas of dark berries, plums, and subtle oak notes. Aged for 12 months in French oak barrels.',
    imageUrl: 'https://placehold.co/400x600/841013/FFFFFF?text=Shumi+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1200,
    alcohol: '14.5%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: true,
    foodPairing: ['Grilled Lamb', 'Steak', 'Aged Sulguni Cheese', 'Beef Khinkali'],
    inStock: true,
  },
  {
    _id: wine2Id,
    winery: win1Id,
    name: 'Shumi Rkatsiteli',
    vintage: 2021,
    grape: rkatsiteliId,
    description:
      'A crisp and refreshing white wine showcasing the purity of Kakheti terroir. This elegant Rkatsiteli presents delicate aromas of green apple and citrus. Produced using modern cold fermentation techniques.',
    imageUrl: 'https://placehold.co/400x600/FFD700/31343C?text=Shumi+Rkatsiteli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 650,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Roasted Chicken', 'Fresh Salads', 'Khachapuri', 'Grilled Fish'],
    inStock: true,
  },
  {
    _id: wine3Id,
    winery: win1Id,
    name: 'Shumi Kisi Amber',
    vintage: 2019,
    grape: kisiId,
    description:
      'A stunning amber wine crafted using traditional qvevri methods. This golden-hued Kisi reveals complex aromas of dried apricots and warm spices. Fermented and aged on the skins for 6 months.',
    imageUrl: 'https://placehold.co/400x600/FFA500/FFFFFF?text=Shumi+Kisi',
    color: 'orange',
    sweetness: 'dry',
    averageRating: 4.8,
    price: 1450,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '14-16°C',
    decanting: true,
    foodPairing: ['Satsivi (Chicken in Walnut Sauce)', 'Roasted Vegetables', 'Spicy Pork', 'Hard Cheeses'],
    inStock: true,
  },
  {
    _id: wine4Id,
    winery: win2Id,
    name: 'Kateni Saperavi',
    vintage: 2020,
    grape: saperaviId,
    description:
      'A natural expression of Kakheti terroir from old vines. This authentic Saperavi showcases pure fruit character with rich dark fruit flavors. Unfiltered and produced without added sulfites.',
    imageUrl: 'https://placehold.co/400x600/722F37/FFFFFF?text=Kateni+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.8,
    price: 980,
    alcohol: '14.0%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: true,
    foodPairing: ['Mtsvadi (Georgian BBQ)', 'Smoked Meats', 'Rich Pasta Dishes'],
    inStock: true,
  },
  {
    _id: wine5Id,
    winery: win2Id,
    name: 'Kateni Mtsvane',
    vintage: 2022,
    grape: mtsvaneId,
    description:
      'An elegant white wine expressing the purity of Mtsvane grapes. This crisp offering displays bright citrus and fresh herb aromas. Hand-harvested from high-altitude vineyards.',
    imageUrl: 'https://placehold.co/400x600/F5F5DC/333333?text=Kateni+Mtsvane',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 720,
    alcohol: '12.0%',
    volume: 750,
    servingTemperature: '8-10°C',
    decanting: false,
    foodPairing: ['Goat Cheese', 'Asparagus', 'Light Seafood', 'Walnut Salad'],
    inStock: true,
  },
  {
    _id: wine6Id,
    winery: win2Id,
    name: 'Kateni Khikhvi',
    vintage: 2021,
    grape: khikhviId,
    description:
      'A rare aromatic white wine from the Khikhvi grape. This distinctive offering presents tropical fruit aromas with honey and pear notes. Excellent structural balance.',
    imageUrl: 'https://placehold.co/400x600/FFE082/333333?text=Kateni+Khikhvi',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1850,
    alcohol: '13.0%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Asian Fusion', 'Lobster', 'Creamy Risotto', 'Pear and Blue Cheese'],
    inStock: true,
  },
  {
    _id: wine7Id,
    winery: win3Id,
    name: 'Mikaber Usakhelouri',
    vintage: 2017,
    grape: usakhelouriId,
    description:
      'A prestigious red from the Racha mountains showing exceptional character. This rare Usakhelouri displays deep ruby color with complex layers of cherry and earth. Limited edition production.',
    imageUrl: 'https://placehold.co/400x600/880E4F/FFFFFF?text=Mikaber+Usakhelouri',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 2500,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: true,
    foodPairing: ['Venison', 'Duck with Cherry Sauce', 'Truffle Pasta', 'Fine Chocolate'],
    inStock: true,
  },
  {
    _id: wine8Id,
    winery: win3Id,
    name: 'Mikaber Rkatsiteli',
    vintage: 2021,
    grape: rkatsiteliId,
    description:
      'A pure and expressive white wine from the Caucasus mountains. This crisp Rkatsiteli displays bright citrus and green apple aromas with a mineral finish.',
    imageUrl: 'https://placehold.co/400x600/FFF59D/333333?text=Mikaber+Rkatsiteli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 750,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Grilled Trout', 'Vegetable Quiche', 'Fresh Greens'],
    inStock: true,
  },
  {
    _id: wine9Id,
    winery: win3Id,
    name: 'Mikaber Rose',
    vintage: 2023,
    grape: chkhaveriId,
    description:
      'A delicate rose from mountain-grown Chkhaveri grapes. This refreshing wine presents lovely strawberry and floral aromas with vibrant acidity.',
    imageUrl: 'https://placehold.co/400x600/FFB6C1/333333?text=Mikaber+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 680,
    alcohol: '11.5%',
    volume: 750,
    servingTemperature: '8-10°C',
    decanting: false,
    foodPairing: ['Summer Berries', 'Sushi', 'Soft Brie', 'Fruit Tarts'],
    inStock: true,
  },
  {
    _id: wine10Id,
    winery: win4Id,
    name: 'Ilya Chinuri Natural',
    vintage: 2022,
    grape: chinuriId,
    description:
      'A pioneering unfiltered natural white from Kartli. This artisanal Chinuri presents cloudy appearance with intense citrus and floral aromas. Made in qvevri with zero additives.',
    imageUrl: 'https://placehold.co/400x600/ECEFF1/333333?text=Ilya+Chinuri',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1650,
    alcohol: '12.0%',
    volume: 750,
    servingTemperature: '12-14°C',
    decanting: false,
    foodPairing: ['Fermented Foods', 'Oily Fish', 'Wild Mushrooms', 'Artisanal Bread'],
    inStock: true,
  },
  {
    _id: wine11Id,
    winery: win4Id,
    name: 'Ilya Goruli Mtsvane',
    vintage: 2021,
    grape: goruliMtsvaneId,
    description:
      'A rare expression of endangered Goruli Mtsvane grapes. This unique wine displays bright citrus and herb aromas with distinctive mineral character from Kartli volcanic soils.',
    imageUrl: 'https://placehold.co/400x600/9CCC65/333333?text=Ilya+Goruli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 1400,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Herb-crusted Chicken', 'Pesto Pasta', 'Green Beans', 'White Fish'],
    inStock: true,
  },
  {
    _id: wine12Id,
    winery: win4Id,
    name: 'Ilya Tavkveri',
    vintage: 2022,
    grape: tavkveriId,
    description:
      'A vibrant red showcasing Kartli versatile Tavkveri variety. This medium-bodied wine offers bright cherry and raspberry flavors with a light, spicy finish.',
    imageUrl: 'https://placehold.co/400x600/E53935/FFFFFF?text=Ilya+Tavkveri',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 850,
    alcohol: '13.0%',
    volume: 750,
    servingTemperature: '14-16°C',
    decanting: false,
    foodPairing: ['Grilled Salmon', 'Charcuterie Board', 'Roasted Beet Salad'],
    inStock: true,
  },
  {
    _id: wine13Id,
    winery: win5Id,
    name: 'Chkhaveri House Rose',
    vintage: 2023,
    grape: chkhaveriId,
    description:
      'An elegant rose preserving the rare Chkhaveri grape from Adjara. This delicate wine offers subtle strawberry and rose petal aromas with a hint of maritime salinity.',
    imageUrl: 'https://placehold.co/400x600/F8BBD9/333333?text=Chkhaveri+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 580,
    alcohol: '11.0%',
    volume: 750,
    servingTemperature: '8-10°C',
    decanting: false,
    foodPairing: ['Fresh Seafood', 'Shrimp Cocktail', 'Mild Goat Cheese', 'Melon with Ham'],
    inStock: true,
  },
  {
    _id: wine14Id,
    winery: win5Id,
    name: 'Adjara White',
    vintage: 2022,
    grape: tsitskaId,
    description:
      'A coastal white wine reflecting Adjara maritime influences. This Tsitska displays fresh citrus and floral notes with balanced acidity and a refreshing finish.',
    imageUrl: 'https://placehold.co/400x600/B2DFDB/333333?text=Adjara+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 450,
    alcohol: '12.0%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Mussels', 'Steamed Vegetables', 'Light Poultry', 'White Pizza'],
    inStock: true,
  },
  {
    _id: wine15Id,
    winery: win5Id,
    name: 'Chkhaveri Amber',
    vintage: 2022,
    grape: chkhaveriId,
    description:
      'An amber expression of Chkhaveri with extended skin contact. This experimental wine presents deeper color with complex dried fruit and mineral flavors.',
    imageUrl: 'https://placehold.co/400x600/FFCC80/333333?text=Chkhaveri+Amber',
    color: 'orange',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 720,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '14-16°C',
    decanting: true,
    foodPairing: ['Aromatic Curry', 'Roasted Pork', 'Mature Cheeses', 'Spiced Nuts'],
    inStock: true,
  },
  {
    _id: wine16Id,
    winery: win6Id,
    name: 'Tbilvino Saperavi',
    vintage: 2021,
    grape: saperaviId,
    description:
      "A modern expression of Georgia's signature red for everyday enjoyment. This approachable Saperavi offers juicy berry flavors and smooth tannins.",
    imageUrl: 'https://placehold.co/400x600/8B0000/FFFFFF?text=Tbilvino+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 350,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: false,
    foodPairing: ['Burgers', 'Grilled Chicken', 'Pizza', 'Meat Pies'],
    inStock: true,
  },
  {
    _id: wine17Id,
    winery: win6Id,
    name: 'Tbilvino Rkatsiteli',
    vintage: 2022,
    grape: rkatsiteliId,
    description:
      'A capital-style white wine celebrating city life. This fresh Rkatsiteli delivers bright citrus and green apple notes with a clean, crisp finish.',
    imageUrl: 'https://placehold.co/400x600/FFF59D/333333?text=Tbilvino+Rkatsiteli',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.3,
    price: 280,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Light Appetizers', 'Sandwiches', 'White Meat Salads'],
    inStock: true,
  },
  {
    _id: wine18Id,
    winery: win6Id,
    name: 'Tbilvino Kindzmarauli',
    vintage: 2022,
    grape: saperaviId,
    description:
      "Georgia's beloved semi-sweet red in its classic style. This Kindzmarauli displays luscious cherry and berry flavors with balanced sweetness and a velvety texture.",
    imageUrl: 'https://placehold.co/400x600/B71C1C/FFFFFF?text=Tbilvino+Kindzmarauli',
    color: 'red',
    sweetness: 'semi-sweet',
    averageRating: 4.6,
    price: 420,
    alcohol: '11.5%',
    volume: 750,
    servingTemperature: '12-14°C',
    decanting: false,
    foodPairing: ['Desserts', 'Fruit Platters', 'Blue Cheese', 'Spicy Meat Snacks'],
    inStock: true,
  },
  {
    _id: wine19Id,
    winery: win7Id,
    name: 'Dakishvili Family Kisi',
    vintage: 2019,
    grape: kisiId,
    description:
      'A precious amber wine from family recipes passed through generations. This precious Kisi reveals layers of complexity with dried fruits, honey, and roasted nuts.',
    imageUrl: 'https://placehold.co/400x600/FF8F00/FFFFFF?text=Dakishvili+Kisi',
    color: 'orange',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 1800,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '14-16°C',
    decanting: true,
    foodPairing: ['Satsivi', 'Roasted Lamb with Herbs', 'Smoked Fish', 'Aged Sheep Cheese'],
    inStock: true,
  },
  {
    _id: wine20Id,
    winery: win7Id,
    name: 'Dakishvili Saperavi',
    vintage: 2018,
    grape: saperaviId,
    description:
      'A dark and mysterious Saperavi from old vines. This premium wine offers deep color with rich flavors of blackberries, dark chocolate, and black pepper. Aged 18 months in oak.',
    imageUrl: 'https://placehold.co/400x600/4A148C/FFFFFF?text=Dakishvili+Saperavi',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.9,
    price: 2100,
    alcohol: '14.5%',
    volume: 750,
    servingTemperature: '18-20°C',
    decanting: true,
    foodPairing: ['Grilled Ribeye Steak', 'Wild Boar', 'Strong Hard Cheeses', 'Pork Mtsvadi'],
    inStock: true,
  },
  {
    _id: wine21Id,
    winery: win7Id,
    name: 'Dakishvili Mtsvane',
    vintage: 2020,
    grape: mtsvaneId,
    description:
      'An elegant white from old-vine Mtsvane in Kakheti. This refined wine presents citrus and green apple with subtle herb notes and a long, complex finish.',
    imageUrl: 'https://placehold.co/400x600/CDDC39/333333?text=Dakishvili+Mtsvane',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 950,
    alcohol: '13.0%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Grilled Veal', 'Creamy Chicken Dishes', 'Rich Salads', 'Seafood Pasta'],
    inStock: true,
  },
  {
    _id: wine22Id,
    winery: win8Id,
    name: 'Royal Palace Red',
    vintage: 2017,
    grape: saperaviId,
    description:
      'A noble red worthy of royalty from historic palace grounds. This distinguished Saperavi displays remarkable depth with layers of dark fruit, oak, and vanilla notes.',
    imageUrl: 'https://placehold.co/400x600/B71C1C/FFFFFF?text=Mukhrani+Red',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.7,
    price: 1800,
    alcohol: '14.0%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: true,
    foodPairing: ['Beef Wellington', 'Lamb Chops', 'Gourmet Burgers', 'Sharp Cheeses'],
    inStock: true,
  },
  {
    _id: wine23Id,
    winery: win8Id,
    name: 'White Palace',
    vintage: 2022,
    grape: rkatsiteliId,
    description:
      'A grand white wine from the royal estate gardens. This elegant Rkatsiteli offers refined citrus and apple flavors with a majestic, long finish.',
    imageUrl: 'https://placehold.co/400x600/FFF176/333333?text=Mukhrani+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.6,
    price: 900,
    alcohol: '13.0%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['White Truffle Risotto', 'Roasted Sea Bass', 'Fine Poultry'],
    inStock: true,
  },
  {
    _id: wine24Id,
    winery: win8Id,
    name: 'Palace Rose',
    vintage: 2023,
    grape: budeshuriId,
    description:
      'A delicate rose from palace vineyards. This refreshing wine showcases the potential of rare Georgian grape varieties with its light and floral profile.',
    imageUrl: 'https://placehold.co/400x600/FFB6C1/333333?text=Mukhrani+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 650,
    alcohol: '12.0%',
    volume: 750,
    servingTemperature: '8-10°C',
    decanting: false,
    foodPairing: ['Lobster Salad', 'Fresh Berries', 'Goat Cheese Tart', 'Light Pasta'],
    inStock: true,
  },
  {
    _id: wine25Id,
    winery: win9Id,
    name: 'Uzhgorod Cabernet',
    vintage: 2019,
    grape: cabernetSauvignonId,
    description:
      'A premium Ukrainian Cabernet from Carpathian vineyards. This full-bodied red offers rich dark fruit flavors with notes of cedar, tobacco, and black pepper.',
    imageUrl: 'https://placehold.co/400x600/722F37/FFFFFF?text=Uzhgorod+Cabernet',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.5,
    price: 550,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: true,
    foodPairing: ['Steak', 'Game Meat', 'Hard Ukrainian Cheeses', 'Goulash'],
    inStock: true,
  },
  {
    _id: wine26Id,
    winery: win9Id,
    name: 'Carpathian White',
    vintage: 2021,
    grape: rkatsiteliId,
    description:
      "An elegant white from Zakarpattia's volcanic soils. This crisp wine displays bright citrus and mineral notes unique to the Carpathian region.",
    imageUrl: 'https://placehold.co/400x600/FFF59D/333333?text=Uzhgorod+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 380,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Fresh River Fish', 'Mild Curries', 'Chicken Kiev', 'Vegetable Risotto'],
    inStock: true,
  },
  {
    _id: wine27Id,
    winery: win9Id,
    name: 'Uzhgorod Rose',
    vintage: 2022,
    grape: cabernetSauvignonId,
    description:
      'A refreshing rose from Ukrainian vineyards. This light wine offers delicate strawberry and melon aromas with a crisp, balanced finish.',
    imageUrl: 'https://placehold.co/400x600/FFB6C1/333333?text=Uzhgorod+Rose',
    color: 'rose',
    sweetness: 'dry',
    averageRating: 4.3,
    price: 320,
    alcohol: '11.5%',
    volume: 750,
    servingTemperature: '8-10°C',
    decanting: false,
    foodPairing: ['Fruit Salads', 'Grilled Chicken Salad', 'Light Cheeses'],
    inStock: true,
  },
  {
    _id: wine28Id,
    winery: win10Id,
    name: 'Odesa Reserve',
    vintage: 2020,
    grape: cabernetSauvignonId,
    description:
      'A distinguished red from Black Sea coast vineyards. This Cabernet displays deep color with complex berry and spice notes and soft maritime influence.',
    imageUrl: 'https://placehold.co/400x600/800020/FFFFFF?text=Odesa+Reserve',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.4,
    price: 450,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: true,
    foodPairing: ['BBQ Pork', 'Roasted Root Vegetables', 'Lamb Stew'],
    inStock: true,
  },
  {
    _id: wine29Id,
    winery: win10Id,
    name: 'Odesa White',
    vintage: 2022,
    grape: rkatsiteliId,
    description:
      'A modern white wine from Odesa region. This crisp Rkatsiteli offers bright citrus and apple flavors with a touch of seaside freshness.',
    imageUrl: 'https://placehold.co/400x600/FAFAD2/333333?text=Odesa+White',
    color: 'white',
    sweetness: 'dry',
    averageRating: 4.2,
    price: 280,
    alcohol: '12.0%',
    volume: 750,
    servingTemperature: '10-12°C',
    decanting: false,
    foodPairing: ['Grilled Shrimp', 'Fried Calamari', 'White Fish Tacos'],
    inStock: true,
  },
  {
    _id: wine30Id,
    winery: win10Id,
    name: 'Black Sea Red',
    vintage: 2021,
    grape: saperaviId,
    description:
      'An experimental red from Odesa using Georgian grape varieties. This Saperavi offers bold flavor with local terroir character and excellent balance.',
    imageUrl: 'https://placehold.co/400x600/8B0000/FFFFFF?text=Black+Sea+Red',
    color: 'red',
    sweetness: 'dry',
    averageRating: 4.3,
    price: 380,
    alcohol: '13.5%',
    volume: 750,
    servingTemperature: '16-18°C',
    decanting: false,
    foodPairing: ['Spicy Sausages', 'Beef Skewers', 'Hard Aged Cheeses'],
    inStock: true,
  },
  {
    _id: wine31Id,
    winery: win11Id,
    name: 'Obene Ojaleshi',
    vintage: 2021,
    grape: ojaleshiId,
    description:
      'A legendary semi-sweet red wine from the heart of Samegrelo. This deep ruby Ojaleshi reveals complex spicy aromas with notes of wild berries and mountain pepper. Produced in traditional western Georgian churi.',
    imageUrl: 'https://placehold.co/400x600/1B5E20/FFFFFF?text=Obene+Ojaleshi',
    color: 'red',
    sweetness: 'semi-sweet',
    averageRating: 4.9,
    price: 1850,
    alcohol: '12.5%',
    volume: 750,
    servingTemperature: '12-14°C',
    decanting: false,
    foodPairing: ['Spicy Megrelian Kuchmachi', 'Roasted Walnuts', 'Strong Cheeses', 'Chocolate Desserts'],
    inStock: true,
  },
];

export const reviews = [
  {
    wineId: wine1Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Exceptional Saperavi! Deep color, rich flavor, and beautiful finish.',
  },
  {
    wineId: wine1Id,
    userId: owner1Id,
    rating: 5,
    comment: 'One of the best wines I have ever tasted. True Georgian heritage.',
  },
  {
    wineId: wine2Id,
    userId: owner1Id,
    rating: 4,
    comment: 'Crisp and refreshing. Perfect for summer evenings.',
  },
  {
    wineId: wine3Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Amazing amber wine! Complex flavors that keep evolving.',
  },
  {
    wineId: wine4Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Pure expression of nature. You can taste the authenticity.',
  },
  {
    wineId: wine6Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Incredible aromatic complexity. Khikhvi is definitely a grape to watch.',
  },
  {
    wineId: wine7Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Worth the premium price. This is world-class wine from Racha.',
  },
  {
    wineId: wine10Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Revolutionary natural wine. Cloudy, raw, and absolutely delicious.',
  },
  {
    wineId: wine13Id,
    userId: owner1Id,
    rating: 4,
    comment: 'Delicate and elegant. Perfect for a summer terrace.',
  },
  {
    wineId: wine16Id,
    userId: owner1Id,
    rating: 4,
    comment: 'Excellent everyday wine. Great value for quality.',
  },
  {
    wineId: wine19Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Family legacy in every bottle. Outstanding quality.',
  },
  {
    wineId: wine22Id,
    userId: owner1Id,
    rating: 5,
    comment: 'Royal quality! A wine for special occasions.',
  },
  {
    wineId: wine25Id,
    userId: owner1Id,
    rating: 4,
    comment: 'Surprisingly good Ukrainian Cabernet. Great potential.',
  },
  {
    wineId: wine26Id,
    userId: owner1Id,
    rating: 4,
    comment: 'Beautiful expression of Zakarpattia terroir.',
  },
  {
    wineId: wine28Id,
    userId: owner1Id,
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
      "An exclusive journey to Georgia's highest altitude vineyards in Racha. Visit family wineries producing rare Aleksandrouli and Mujuretuli wines at 1200 meters elevation.",
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
