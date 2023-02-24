import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLocalIp, getApiList } from "../../helpers/dataPlotter/validation";
import { storageSetItem } from "../../helpers/storageSetItem";
import { setUrlList } from "../../redux/textBox/textBoxSlice";
import { transformUrl } from "../../helpers/transformUrl";
import { setDevicesId, setValidUrls } from "../../redux/textBox/textBoxSlice";
import axios from "axios";

export const useTextbox = () => {
  const { urlList, validUrls } = useSelector((state) => state.textBox);
  const dispatch = useDispatch();
  const localIp = isLocalIp(window.location.host);
  const noApiConfigStored = () => {
    if (localIp) {
      storageSetItem(
        "urlList",
        JSON.stringify(getApiList(window.location.host))
      );
      dispatch(setUrlList(getApiList(window.location.host)));
    }
  };

  const fetchValidUrls = async () => {
    if (!urlList) {
      return;
    }
    if (validUrls.length === urlList.length) {
      return;
    }
    for (const url of urlList) {
      if (validUrls.indexOf(transformUrl(url, "/api/data")) !== -1) {
        continue;
      }
      let transformedUrl = transformUrl(url, "/api/config");

      await axios.get(transformedUrl).then(
        (res) => {
          if (res.data.deviceId) {
            dispatch(setDevicesId(res.data.deviceId));
            dispatch(setValidUrls(transformUrl(url, "/api/data")));
          }
        },
        (error) => {
          console.log("Error " + url);
        }
      );
    }
  };
  useEffect(() => {
    noApiConfigStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchValidUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlList]);
};
