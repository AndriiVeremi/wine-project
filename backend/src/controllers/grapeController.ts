import { Request, Response, NextFunction } from 'express';
import GrapeService from '@/services/grapeService';

class GrapeController {
  public async getGrapes(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      const grapes = await GrapeService.getGrapes(search as string | undefined);
      res.json(grapes);
    } catch (error) {
      next(error);
    }
  }
}

export default new GrapeController();
