export const dataRetention = (data, dataRetention, currentTime) => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].currentTime < currentTime - dataRetention) return data.slice(i);
  }
  return data;
};
