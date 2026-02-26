export default {
  find: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue([]),
  }),
  findById: jest.fn(),
};
