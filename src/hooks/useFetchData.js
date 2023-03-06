import { useEffect, useState } from "react";
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
  const [localStorageApplied, setLocalStorageApplied] = useState(false);

  const getLocalStorageData = (res, time) => {
    res.data.time = time;
    const localStorageDataRetentionValue =
      localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) || 1814400000;
    const localStorageChartTimeWindowValue =
      localStorage.getItem(`CHART TIME WINDOW FOR ${validUrl}`) || 300000;

    const localStorageData = JSON.parse(
      localStorage.getItem(`DATA FOR ${validUrl}`)
    );

    const localStorageDataRetention = dataRetention(
      localStorageData,
      localStorageDataRetentionValue,
      time
    );
    setData(localStorageDataRetention, res.data);
    const localStorageChartTimeWindow = chartTimeWindow(
      localStorageData,
      localStorageChartTimeWindowValue,
      time
    );
    setVisibleData(localStorageChartTimeWindow, res.data);
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
            if (
              localStorage.getItem(`DATA FOR ${validUrl}`) !== null &&
              !localStorageApplied
            ) {
              setLocalStorageApplied(true);
              getLocalStorageData(res, time);
            } else {
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
            }
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
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
