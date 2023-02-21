import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLocalIp, getApiList } from "../helpers/dataPlotter/validation";
import { storageSetItem } from "../helpers/storageSetItem";
import { setUrlList } from "../redux/textFieldSlice";

export const useNoApiConfigStored = () => {
  const dispatch = useDispatch();
  const localIp = isLocalIp(window.location.host);
  const noApiConfigStored = () => {
    if (localIp) {
      storageSetItem(
        "urlList",
        JSON.stringify(getApiList(window.location.host))
      );
      console.log(localStorage.getItem("urlList"));
      dispatch(setUrlList(getApiList(window.location.host)));
    }
  };
  useEffect(() => {
    noApiConfigStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
