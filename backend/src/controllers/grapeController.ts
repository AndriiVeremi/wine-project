import { Request, Response } from 'express';
import GrapeService from '@/services/grapeService';
import ctrlWrapper from '@/utils/ctrlWrapper';

class GrapeController {
  public getGrapes = ctrlWrapper(async (req: Request, res: Response) => {
    const { search } = req.query;
    const grapes = await GrapeService.getGrapes(search as string | undefined);
    res.json(grapes);
  });
}

export default new GrapeController();
