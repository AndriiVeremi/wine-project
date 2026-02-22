import { Request, Response, NextFunction } from 'express';
import LocationService from '@/services/locationService';
import Location from '@/models/locationModel';
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

      const countryDoc = await Location.findOne({ name: country as string, type: 'country' });

      if (!countryDoc) {
        throw new HttpError('Country not found', 404);
      }

      const regions = await LocationService.getRegionsByCountry(countryDoc._id);
      res.json(regions);
    } catch (error) {
      next(error);
    }
  }
}

export default new LocationController();
