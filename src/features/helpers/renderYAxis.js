export const renderYAxis = (data, column) => {
  let shouldRender = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i][column] > 5) {
      return shouldRender;
    } else {
      shouldRender = true;
    }
  }
  return shouldRender;
};
