import axios from "axios";

export const useFetchValidUrls = async () => {
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
          setDevicesId(res.data.deviceId);
          setValidUrls(transformUrl(url, "/api/data"));
        }
      },
      (error) => {
        console.log("Error " + url);
      }
    );
  }
};
