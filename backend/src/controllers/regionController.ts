import { Request, Response } from 'express';
import { RegionService } from '@/services/regionService';
import ctrlWrapper from '@/utils/ctrlWrapper';

const regionService = new RegionService();

export const getRegionsByCountry = ctrlWrapper(async (req: Request, res: Response) => {
  const countryName = req.query.country as string;
  const result = await regionService.getRegionsByCountryName(countryName);
  res.status(200).json(result);
});

export const getRegionByName = ctrlWrapper(async (req: Request, res: Response) => {
  const region = req.params.region as string;
  const result = await regionService.getRegionByName(region);
  res.status(200).json(result);
});
