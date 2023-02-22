import { useEffect } from "react";
import { storageSetItem } from "../helpers/storageSetItem";
import axios from "axios";

export const useFetchData = (
  validUrl,
  dataLocalStorageToggle,
  setDataLocalStorageToggle,
  data,
  setData
) => {
  console.log(data);
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
      await axios.get(validUrl).then(
        (res) => {
          res.data.time = new Date().getTime();
          res.data.currentTime = new Date().getTime();
          setData(res.data);
          if (dataLocalStorageToggle) {
            storageSetItem(`DATA FOR ${validUrl}`, JSON.stringify(data));
          } else {
            localStorage.removeItem(`DATA FOR ${validUrl}`);
          }
        },
        (error) => {
          console.log(error);
        }
      );
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
    }, 5000);
    return () => clearInterval(dataInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
};
