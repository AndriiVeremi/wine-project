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
    if (!countryName) {
      return await Region.find().populate('country', 'name');
    }
    const country = await Location.findOne({
      name: { $regex: new RegExp(`^${countryName}$`, 'i') },
      type: 'country',
    });
    if (!country) {
      return []; // Return empty array instead of throwing 404 to avoid frontend errors
    }

    const regions = await Region.find({ country: country._id }).populate('country', 'name');
    return regions;
  }
}
