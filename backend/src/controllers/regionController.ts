import { Request, Response } from 'express';
import * as regionService from '@/services/regionService';
import ctrlWrapper from '@/utils/ctrlWrapper';

export const getRegionByName = ctrlWrapper(async (req: Request, res: Response) => {
  const { name } = req.params;
  const result = await regionService.getRegionByName(name as string);
  res.status(200).json(result);
});
