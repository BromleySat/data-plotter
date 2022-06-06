export const trimHttp = (urlList) => {
  if (!urlList) {
    return "";
  }
  const results = [];
  for (let url of urlList) {
    if (url.startsWith("http://")) {
      url = url.replace("http://", "");
      results.push(url);
    } else if (url.startsWith("https://")) {
      url = url.replace("https://", "");
      results.push(url);
    }
  }
  return results;
};
