import Location from '@/models/locationModel';

class LocationService {
  public async getCountries() {
    const countries = await Location.find({ type: 'country' });
    return countries;
  }

  public async getRegionsByCountry(countryId: string) {
    const regions = await Location.find({ type: 'region', parentLocation: countryId });
    return regions;
  }
}

export default new LocationService();
