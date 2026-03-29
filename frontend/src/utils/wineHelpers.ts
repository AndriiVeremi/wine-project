/**
 * Returns a progress percentage based on a string value
 */
export const calcProgress = (val: string): number => {
  if (val === 'Low' || val === 'Light' || val === 'Soft') return 20;
  if (val === 'Medium-Low' || val === 'Medium-Light' || val === 'Medium-Soft') return 40;
  if (val === 'Medium') return 60;
  if (val === 'Medium-High') return 80;
  if (val === 'High' || val === 'Full-bodied' || val === 'Full' || val === 'Very High') return 100;
  return 0;
};

/**
 * Returns an emoji based on the food pairing description
 */
export const getFoodEmoji = (text: string): string => {
  const low = text.toLowerCase();

  // Order matters: check more specific items first
  if (low.includes('cheese')) return '🧀';
  if (
    low.includes('steak') ||
    low.includes('ribeye') ||
    low.includes('beef') ||
    low.includes('veal') ||
    low.includes('meat') ||
    low.includes('skewers') ||
    low.includes('mtsvadi') ||
    low.includes('bbq')
  )
    return '🥩';
  if (
    low.includes('chicken') ||
    low.includes('poultry') ||
    low.includes('duck') ||
    low.includes('quail')
  )
    return '🍗';
  if (
    low.includes('lamb') ||
    low.includes('venison') ||
    low.includes('boar') ||
    low.includes('game')
  )
    return '🐗';
  if (
    low.includes('fish') ||
    low.includes('salmon') ||
    low.includes('trout') ||
    low.includes('sea bass')
  )
    return '🐟';
  if (
    low.includes('shrimp') ||
    low.includes('lobster') ||
    low.includes('prawn') ||
    low.includes('seafood') ||
    low.includes('calamari') ||
    low.includes('mussels') ||
    low.includes('oysters')
  )
    return '🦐';
  if (
    low.includes('salad') ||
    low.includes('vegetable') ||
    low.includes('greens') ||
    low.includes('beans') ||
    low.includes('asparagus')
  )
    return '🥗';
  if (low.includes('mushroom') || low.includes('truffle')) return '🍄';
  if (
    low.includes('pasta') ||
    low.includes('pizza') ||
    low.includes('risotto') ||
    low.includes('curry') ||
    low.includes('goulash')
  )
    return '🍝';
  if (
    low.includes('khachapuri') ||
    low.includes('khinkali') ||
    low.includes('bread') ||
    low.includes('pie') ||
    low.includes('tart')
  )
    return '🥧';
  if (
    low.includes('dessert') ||
    low.includes('sweet') ||
    low.includes('chocolate') ||
    low.includes('cake')
  )
    return '🍰';
  if (
    low.includes('fruit') ||
    low.includes('pear') ||
    low.includes('apricot') ||
    low.includes('plum') ||
    low.includes('melon')
  )
    return '🍑';
  if (low.includes('berry') || low.includes('strawberry')) return '🍓';
  if (low.includes('nut') || low.includes('walnut')) return '🥜';
  if (low.includes('sushi')) return '🍣';

  return '🍽️';
};

/**
 * Returns an emoji based on the wine characteristic or aroma
 */
export const getCharacteristicEmoji = (text: string): string => {
  const low = text.toLowerCase();

  if (low.includes('cherry') || low.includes('berry') || low.includes('plum')) return '🍓';
  if (low.includes('flower') || low.includes('floral') || low.includes('rose') || low.includes('violet')) return '🌿';
  if (low.includes('oak') || low.includes('vanilla') || low.includes('smoke') || low.includes('tobacco')) return '🪵';
  if (low.includes('mineral') || low.includes('stone') || low.includes('earth')) return '💎';
  if (low.includes('honey') || low.includes('sweet')) return '🍯';
  if (low.includes('pepper') || low.includes('spice')) return '🌶️';
  if (low.includes('mint') || low.includes('herb')) return '🌱';
  if (low.includes('leather')) return '💼';

  return '✨';
};

// Data for forms and suggestions
export const foodPairingCategories = [
  {
    name: 'Cheese',
    icon: '🧀',
    options: ['Fresh cheeses', 'Soft-ripened', 'Hard cheeses', 'Blue cheeses', 'Goat cheese'],
  },
  {
    name: 'Meat',
    icon: '🥩',
    options: ['Red meat', 'Game', 'Poultry', 'Cured meats', 'Lamb', 'Pork', 'Beef'],
  },
  {
    name: 'Seafood',
    icon: '🐟',
    options: ['Lean fish', 'Fatty fish', 'Shellfish', 'Oysters', 'Grilled seafood'],
  },
  {
    name: 'Vegetables & Salads',
    icon: '🥗',
    options: ['Light salads', 'Roasted vegetables', 'Mushrooms', 'Root vegetables', 'Spicy greens'],
  },
  {
    name: 'Desserts & Fruit',
    icon: '🍰',
    options: ['Dark chocolate', 'Fresh fruit', 'Fruit tarts', 'Creamy desserts', 'Nuts'],
  },
];

export const characteristicSuggestions = [
  {
    name: 'Fruit & Berry',
    icon: '🍓',
    options: [
      'Cherry',
      'Plum',
      'Blackberry',
      'Strawberry',
      'Raspberry',
      'Peach',
      'Apricot',
      'Lemon',
      'Apple',
    ],
  },
  {
    name: 'Floral & Herbal',
    icon: '🌿',
    options: ['Violet', 'Rose', 'Mint', 'Lavender', 'Eucalyptus', 'Grassy', 'Dried herbs'],
  },
  {
    name: 'Spice & Oak',
    icon: '🪵',
    options: [
      'Vanilla',
      'Oak',
      'Smoke',
      'Black pepper',
      'Cinnamon',
      'Clove',
      'Chocolate',
      'Coffee',
    ],
  },
  {
    name: 'Earth & Mineral',
    icon: '💎',
    options: ['Mineral', 'Flint', 'Wet stones', 'Mushrooms', 'Forest floor', 'Leather', 'Tobacco'],
  },
];
