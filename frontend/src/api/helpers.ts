export const getErrorMsg = (err: unknown): string => {
  const error = err as { response?: { data?: { message?: string } } };
  return error.response?.data?.message || 'Something went wrong. Try again!';
};
