export default {
  find: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue([]),
  }),
  findOne: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};
