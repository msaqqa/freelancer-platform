// select user type
export const selecttUserType = async (type) => {
  try {
    const response = await apiTaqat.post('/user-type', {
      type,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
