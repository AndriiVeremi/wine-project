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

  public async getCountryById(req: Request, res: Response, next: NextFunction) {
    try {
      const countryId = req.params.id as string || req.query.country as string;
      const country = await LocationService.getCountryById(countryId);

      console.log('Country ID:', countryId);
      console.log('Country found:', country);

      if (!country) {
        throw new HttpError('Country not found', 404);
      }
      res.json(country);
    } catch (error) {
      next(error);
    }
  } 

  public async getRegionsByCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const { countryId } = req.params;

      if (!countryId) {
        throw new HttpError('Country name parameter is required', 400);
      }

      const regions = await LocationService.getRegionsByCountry(countryId as string);
      res.json(regions);
    } catch (error) {
      next(error);
    }
  }

  public async getRegionsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { countryId, regionId } = req.params;

      if (!countryId || !regionId) {
        throw new HttpError('Country ID and Region ID parameters are required', 400);
      }

      const region = await LocationService.getRegionById(countryId as string, regionId as string);

      if (!region) {
        throw new HttpError('Region not found', 404);
      }
      res.json(region);

    } catch (error) {
      next(error);
    }
  }
}

export default new LocationController();
