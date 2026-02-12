// select user type
export const selecttUserType = async (type) => {
  const response = await apiTaqat.post('/user-type', {
    type,
  });
  return response.data;
};
