import { Request, Response, NextFunction } from 'express';

export const parseFormData = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return next();

  const numbers = ['vintage', 'price', 'volume', 'boxQuantity', 'duration'];
  const booleans = ['hasPackaging', 'decanting', 'inStock', 'isVip'];
  const objects = [
    'tastingNotes',
    'foodPairing',
    'galleryUrl',
    'groupSize',
    'images',
    'characteristics',
  ];

  for (const key of numbers) {
    if (req.body[key] !== undefined && req.body[key] !== '') {
      req.body[key] = Number(req.body[key]);
    }
  }

  for (const key of booleans) {
    if (req.body[key] !== undefined) {
      req.body[key] = req.body[key] === 'true' || req.body[key] === true;
    }
  }

  for (const key of objects) {
    if (typeof req.body[key] === 'string') {
      const value = req.body[key].trim();
      if (value.startsWith('[') || value.startsWith('{')) {
        try {
          req.body[key] = JSON.parse(value);
        } catch {
          continue;
        }
      }
    }
  }

  next();
};

export default parseFormData;
