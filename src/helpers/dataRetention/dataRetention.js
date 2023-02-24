export const dataRetention = (data, dataRetention, time) => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].time <= time - dataRetention) return data.slice(i + 1);
  }
  return data;
};
