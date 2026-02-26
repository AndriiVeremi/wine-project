export default {
  findOne: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue(null),
  }),
  findById: jest.fn(),
};
