export const chartTimeWindow = (data, chartTimeWindow, time) => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].time <= time - chartTimeWindow)
      return data.filter((el) => el.time > data[i].time);
  }
  return data;
};
