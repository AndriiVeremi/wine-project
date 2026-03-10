import { Request, Response } from 'express';
import GrapeService from '@/services/grapeService';
import ctrlWrapper from '@/utils/ctrlWrapper';
import { AuthenticatedRequest } from '@/middleware/auth';

class GrapeController {
  public getGrapes = ctrlWrapper(async (req: Request, res: Response) => {
    const grapesData = await GrapeService.getGrapes(req.query);
    res.json(grapesData);
  });

  public addGrape = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const newGrape = await GrapeService.createGrape(req.body);
    res.status(201).json(newGrape);
  });

  public updateGrapeImages = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const id = String(req.params.id);
    const files = req.files as Express.Multer.File[];
    const updatedGrape = await GrapeService.updateGrapeImages(id, files);
    res.json(updatedGrape);
  });
}

export default new GrapeController();
