import _ from "lodash";

export const dataRetention = (data, dataRetention, time) => {
  const lastIndex = _.findLastIndex(
    data,
    (el) => el.time <= time - dataRetention
  );
  if (lastIndex !== -1) return data.slice(lastIndex + 1);
  return data;
};
