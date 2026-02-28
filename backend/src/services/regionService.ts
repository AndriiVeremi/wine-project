import Region from '@/models/regionModel';
import HttpError from '@/utils/HttpError';

export const getRegionByName = async (regionName: string) => {
  const region = await Region.findOne({ name: new RegExp(`^${regionName}$`, 'i') });

  if (!region) {
    throw new HttpError('Region not found.', 404);
  }

  return region;
};
