export const renderYAxis = (data, column) => {
  const value = (element) => element[column] > 5;
  const negativeValue = (element) => element[column] < 0;

  if (data.some(value) && data.some(negativeValue)) {
    return false;
  } else if (data.some(value)) {
    return false;
  } else {
    return true;
  }
};
