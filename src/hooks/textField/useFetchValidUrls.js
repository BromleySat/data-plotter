import { useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { setDevicesId, setValidUrls } from "../../redux/textFieldSlice";
import { transformUrl } from "../../helpers/transformUrl";
import axios from "axios";

export const useFetchValidUrls = () => {
  const { urlList, validUrls } = useSelector((state) => state.textfield);
  const dispatch = useDispatch();

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
    fetchValidUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
