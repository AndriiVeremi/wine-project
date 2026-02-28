import Region from '@/models/regionModel';
import Location from '@/models/locationModel';
import HttpError from '@/utils/HttpError';

export class RegionService {
  public async getAllRegions() {
    return await Region.find().populate('country', 'name');
  }

  public async getRegionByName(name: string) {
    const region = await Region.findOne({ name }).populate('country', 'name');
    if (!region) {
      throw new HttpError(`Region with name ${name} not found`, 404);
    }
    return region;
  }

  public async getRegionsByCountryName(countryName: string) {
    const country = await Location.findOne({ name: countryName, type: 'country' });
    if (!country) {
      throw new HttpError(`Country with name ${countryName} not found`, 404);
    }

    const regions = await Region.find({ country: country._id }).populate('country', 'name');
    return regions;
  }
}
