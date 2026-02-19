import Grape from '@/models/grapeModel';

class GrapeService {
  public async getGrapes(searchQuery: string | undefined) {
    let query = {};
    if (searchQuery) {
      query = { name: { $regex: searchQuery, $options: 'i' } };
    }
    const grapes = await Grape.find(query);
    return grapes;
  }
}

export default new GrapeService();
