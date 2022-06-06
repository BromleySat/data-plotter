export function transformUrl(url) {
  let str = "api/config";
  url = url.slice(0, url.indexOf("api"));
  url = url + str;
  return url;
}
