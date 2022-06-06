export const lastIndexOf = (data, cutOff) => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].currentTime.getTime() < cutOff) return i;
  }
  return -1;
};
