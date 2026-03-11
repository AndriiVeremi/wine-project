import { Request, Response } from 'express';
import LocationService from '@/services/locationService';
import Location from '@/models/locationModel';
import HttpError from '@/utils/HttpError';
import ctrlWrapper from '@/utils/ctrlWrapper';

class LocationController {
  public getCountries = ctrlWrapper(async (req: Request, res: Response) => {
    const countries = await LocationService.getCountries();
    res.json(countries);
  });

  public getRegionsByCountry = ctrlWrapper(async (req: Request, res: Response) => {
    const { country } = req.query;

    if (!country) {
      throw new HttpError('Country query parameter is required', 400);
    }

    const countryDoc = await Location.findOne({ name: country as string, type: 'country' });

    if (!countryDoc) {
      res.json([]);
      return;
    }

    const regions = await LocationService.getRegionsByCountry(countryDoc._id);
    res.json(regions);
  });
}

export default new LocationController();
