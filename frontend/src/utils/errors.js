export const getErrorMessage = (error, fallback = "Something went wrong") => {
  return error?.data?.message || error?.error || fallback;
};
