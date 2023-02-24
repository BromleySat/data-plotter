export const chartTimeWindow = (data, chartTimeWindow, time) => {
  const filteredData = data.filter((el) => el.time >= time - chartTimeWindow);
  if (filteredData.length > 0) return filteredData;
  return [];
};
