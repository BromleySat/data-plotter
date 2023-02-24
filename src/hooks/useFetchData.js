import { useEffect } from "react";
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
  const getLocalStorageData = () => {
    const time = moment().valueOf();
    const localStorageDataRetentionValue =
      localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) || 1814400000;
    const localStorageChartTimeWindowValue =
      localStorage.getItem(`CHART TIME WINDOW FOR ${validUrl}`) || 30000;

    const localStorageData = JSON.parse(
      localStorage.getItem(`DATA FOR ${validUrl}`)
    );

    const localStorageDataRetentionData = dataRetention(
      localStorageData,
      localStorageDataRetentionValue,
      time
    );
    setData(localStorageDataRetentionData);
    const localStorageChartTimeWindowData = chartTimeWindow(
      localStorageData,
      localStorageChartTimeWindowValue,
      time
    );
    setVisibleData(localStorageChartTimeWindowData);
  };

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
            } else {
              localStorage.removeItem(`DATA FOR ${validUrl}`);
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
      getLocalStorageData();
    } else {
      getData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const dataInterval = setInterval(() => {
      getData();
    }, refreshRate);
    return () => clearInterval(dataInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
};
