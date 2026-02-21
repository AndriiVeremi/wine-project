import Location from '@/models/locationModel';

class LocationService {
  public async getCountries() {
    const countries = await Location.find({ type: 'country' });
    return countries;
  }

  public async getCountryById(countryId: string) {
    const country = await Location.findOne({ _id: countryId, type: 'country' });
    return country;
  }
  

  public async getRegionsByCountry(countryId: string) {
    const regions = await Location.find({ type: 'region', parentLocation: countryId });
    return regions;
  }

  public async getRegionById(countryId: string, regionId: string) {
    const region = await Location.findOne({ _id: regionId, type: 'region', parentLocation: countryId });
    return region;
  }
}

export default new LocationService();
