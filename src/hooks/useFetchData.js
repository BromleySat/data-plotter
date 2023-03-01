import { useEffect } from "react";
import { useUpdateEffect } from "./useUpdateEffect";
import { storageSetItem } from "../helpers/storageSetItem";
import { dataRetention } from "../helpers/dataRetention/dataRetention";
import { chartTimeWindow } from "../helpers/chartTimeWindow/chartTimeWindow";
import axios from "axios";
import moment from "moment";

let isRequestInProgress = false;

export const useFetchData = (
  validUrl,
  dataLocalStorageToggle,
  setDataLocalStorageToggle,
  data,
  setData,
  setVisibleData,
  refreshRate,
  dataRetentionValue,
  chartTimeWindowValue
) => {
  const getData = async () => {
    if (validUrl) {
      if (isRequestInProgress) return;
      isRequestInProgress = true;
      await axios
        .get(validUrl)
        .then(
          (res) => {
            const time = moment().valueOf();
            res.data.time = time;
            const dataRetentionData = dataRetention(
              data,
              dataRetentionValue,
              time
            );
            setData(dataRetentionData, res.data);
            const chartTimeWindowData = chartTimeWindow(
              data,
              chartTimeWindowValue,
              time
            );
            setVisibleData(chartTimeWindowData, res.data);
            if (dataLocalStorageToggle) {
              storageSetItem(
                `DATA FOR ${validUrl}`,
                JSON.stringify([...data, res.data])
              );
            }
          },
          (error) => {
            console.log(error);
          }
        )
        .finally(() => {
          isRequestInProgress = false;
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem(`TOGGLE FOR ${validUrl}`) !== null) {
      setDataLocalStorageToggle(
        JSON.parse(localStorage.getItem(`TOGGLE FOR ${validUrl}`))
      );
    }
    if (localStorage.getItem(`DATA FOR ${validUrl}`) !== null) {
      setData(JSON.parse(localStorage.getItem(`DATA FOR ${validUrl}`)));
    } else {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    const dataInterval = setInterval(() => {
      getData();
    }, refreshRate);
    return () => clearInterval(dataInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data,
    refreshRate,
    dataRetentionValue,
    chartTimeWindowValue,
    dataLocalStorageToggle,
  ]);

  useUpdateEffect(() => {
    const time = moment().valueOf();
    const dataRetentionData = dataRetention(data, dataRetentionValue, time);
    setData(dataRetentionData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRetentionValue]);

  useUpdateEffect(() => {
    const time = moment().valueOf();
    const chartTimeWindowData = chartTimeWindow(
      data,
      chartTimeWindowValue,
      time
    );
    setVisibleData(chartTimeWindowData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartTimeWindowValue]);
};
