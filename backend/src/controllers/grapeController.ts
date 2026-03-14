import { Request, Response } from 'express';
import GrapeService from '@/services/grapeService';
import ctrlWrapper from '@/utils/ctrlWrapper';
import { AuthenticatedRequest } from '@/middleware/auth';

class GrapeController {
  public getGrapes = ctrlWrapper(async (req: Request, res: Response) => {
    const data = await GrapeService.getGrapes(req.query);
    res.json(data);
  });

  public getGrapeById = ctrlWrapper(async (req: Request, res: Response) => {
    const data = await GrapeService.getGrapeById(req.params.id as string);
    res.json(data);
  });

  public addGrape = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const data = await GrapeService.createGrape(req.body, req.userId!, req.userRole!);
    res.status(201).json(data);
  });

  public updateGrape = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const data = await GrapeService.updateGrape(
      req.params.id as string,
      req.body,
      req.userId!,
      req.userRole!,
    );
    res.json(data);
  });

  public deleteGrape = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    await GrapeService.deleteGrape(req.params.id as string, req.userId!, req.userRole!);
    res.status(204).send();
  });

  public updateGrapeImages = ctrlWrapper(async (req: AuthenticatedRequest, res: Response) => {
    const files = req.files as Express.Multer.File[];
    const data = await GrapeService.updateGrapeImages(req.params.id as string, files);
    res.json(data);
  });
}

export default new GrapeController();
