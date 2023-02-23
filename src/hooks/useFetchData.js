import { useEffect } from "react";
import { storageSetItem } from "../helpers/storageSetItem";
import { dataRetention } from "../helpers/dataRetention/dataRetention";
import axios from "axios";
import moment from "moment";

export const useFetchData = (
  validUrl,
  dataLocalStorageToggle,
  setDataLocalStorageToggle,
  data,
  setData,
  refreshRate,
  dataRetentionValue,
  chartTimeWindowValue
) => {
  let isRequestInProgress = false;
  const applyLocalStorageValues = () => {
    if (localStorage.getItem(`TOGGLE FOR ${validUrl}`) !== null) {
      setDataLocalStorageToggle(
        JSON.parse(localStorage.getItem(`TOGGLE FOR ${validUrl}`))
      );
    }
    if (localStorage.getItem(`DATA FOR ${validUrl}`) !== null) {
      setData(JSON.parse(localStorage.getItem(`DATA FOR ${validUrl}`)));
    }
  };

  const getData = async () => {
    if (validUrl) {
      if (isRequestInProgress) return;
      isRequestInProgress = true;
      await axios
        .get(validUrl)
        .then(
          (res) => {
            const time = Number(BigInt(moment().valueOf()));
            res.data.time = time;
            const prevData = dataRetention(data, dataRetentionValue, time);
            setData(prevData, res.data);
            if (dataLocalStorageToggle) {
              storageSetItem(`DATA FOR ${validUrl}`, JSON.stringify(data));
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
    applyLocalStorageValues();
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
