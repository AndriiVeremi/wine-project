import { Request, Response, NextFunction } from 'express';
import LocationService from '@/services/locationService';
import HttpError from '@/utils/HttpError';

class LocationController {
  public async getCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const countries = await LocationService.getCountries();
      res.json(countries);
    } catch (error) {
      next(error);
    }
  }

  public async getRegionsByCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const { country } = req.query;

      if (!country) {
        throw new HttpError('Country query parameter is required', 400);
      }

      const regions = await LocationService.getRegionsByCountry(country as string);
      res.json(regions);
    } catch (error) {
      next(error);
    }
  }
}

export default new LocationController();
