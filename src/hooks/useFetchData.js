import { useEffect, useState } from "react";
import { storageSetItem } from "../helpers/storageSetItem";
import { dataRetention } from "../helpers/dataRetention/dataRetention";
import { chartTimeWindow } from "../helpers/chartTimeWindow/chartTimeWindow";
import axios from "axios";
import moment from "moment";

let isRequestInProgress = false;
let executed = false;

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
      const time = Number(BigInt(moment().valueOf()));
      if (localStorage.getItem(`DATA FOR ${validUrl}`) !== null && !executed) {
        executed = true;
        const localStorageData = JSON.parse(
          localStorage.getItem(`DATA FOR ${validUrl}`)
        );
        const dataRetentionVal =
          localStorage.getItem(`DATA RETENTION FOR ${validUrl}`) || 1814400000;
        const chartTimeWindowVal =
          localStorage.getItem(`CHART TIME WINDOW FOR ${validUrl}`) || 30000;
        const dataRetentionData = dataRetention(
          localStorageData,
          dataRetentionVal,
          time
        );
        setData(dataRetentionData);
        const chartTimeWindowData = chartTimeWindow(
          localStorageData,
          chartTimeWindowVal,
          time
        );
        setVisibleData(chartTimeWindowData);
        return;
      }
      if (isRequestInProgress) return;
      isRequestInProgress = true;
      await axios
        .get(validUrl)
        .then(
          (res) => {
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
    getData();
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
