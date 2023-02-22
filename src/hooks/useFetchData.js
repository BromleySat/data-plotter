import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storageSetItem } from "../helpers/storageSetItem";
import axios from "axios";
import { setDataLocalStorageToggle } from "../redux/dataLocalStorageToggle/dataLocalStorageToggleSlice";
import { setData } from "../redux/dataSlice";

export const useFetchData = (validUrl) => {
  const { dataLocalStorageToggle } = useSelector(
    (state) => state.dataLocalStorageToggle
  );
  const { data } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const applyLocalStorageValues = () => {
    if (localStorage.getItem(`TOGGLE FOR ${validUrl}`) !== undefined) {
      dispatch(
        setDataLocalStorageToggle(
          JSON.parse(localStorage.getItem(`TOGGLE FOR ${validUrl}`))
        )
      );
    }
    if (localStorage.getItem(`DATA FOR ${validUrl}`) !== undefined) {
      dispatch(
        setData(JSON.parse(localStorage.getItem(`DATA FOR ${validUrl}`)))
      );
    }
  };

  const getData = async () => {
    if (validUrl) {
      await axios.get(validUrl).then(
        (res) => {
          res.data.time = new Date().getTime();
          res.data.currentTime = new Date().getTime();
          dispatch(setData(res.data));
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
};
