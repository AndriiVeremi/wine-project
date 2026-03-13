import { Request, Response, NextFunction } from 'express';

export const parseFormData = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) return next();

  const numFields = ['vintage', 'price', 'volume', 'boxQuantity'];
  const boolFields = ['hasPackaging', 'decanting', 'inStock', 'isVip'];
  const jsonFields = ['tastingNotes', 'foodPairing', 'galleryUrl'];

  numFields.forEach((f) => {
    if (req.body[f] !== undefined && req.body[f] !== '') {
      req.body[f] = Number(req.body[f]);
    }
  });

  boolFields.forEach((f) => {
    if (req.body[f] !== undefined) {
      req.body[f] = req.body[f] === 'true' || req.body[f] === true;
    }
  });

  jsonFields.forEach((f) => {
    if (typeof req.body[f] === 'string' && req.body[f].trim().startsWith('[')) {
      try {
        req.body[f] = JSON.parse(req.body[f]);
      } catch {
        // Not a valid JSON string, keep as is
      }
    }
  });

  next();
};

export default parseFormData;
