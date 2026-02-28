const mockQueryBuilder = {
  select: jest.fn().mockReturnThis(),
  populate: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};

export default {
  findOne: jest.fn().mockReturnValue({
    ...mockQueryBuilder,
  }),
  findById: jest.fn().mockReturnValue({
    ...mockQueryBuilder,
  }),
};
