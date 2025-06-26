export const getYears = (endYear = 1950) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= endYear; i--) {
    years.push({ id: i, name: i.toString() });
  }
  return years;
};
