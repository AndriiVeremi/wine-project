import Tour, { ITour } from '@/models/tourModel';
import Winery from '@/models/wineryModel';
import Region from '@/models/regionModel';
import { HydratedDocument, Types } from 'mongoose';
import HttpError from '@/utils/HttpError';

export interface PopulatedTour extends Omit<ITour, 'winery'> {
  winery: { _id: Types.ObjectId; name: string };
}

export const getToursByRegion = async (
  regionName: string,
): Promise<HydratedDocument<PopulatedTour>[]> => {
  const region = await Region.findOne({ name: { $regex: regionName, $options: 'i' } });

  if (!region) {
    throw new HttpError(`Region with name '${regionName}' not found.`, 404);
  }

  const wineriesInRegion = await Winery.find({ region: region._id }).select('_id');

  const wineryIds = wineriesInRegion.map((winery) => winery._id);

  if (wineryIds.length === 0) {
    return [];
  }

  const tours = (await Tour.find({ winery: { $in: wineryIds } }).populate(
    'winery',
    'name',
  )) as unknown as HydratedDocument<PopulatedTour>[];

  return tours;
};
