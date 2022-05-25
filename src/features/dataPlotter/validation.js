export function isLocalIp(ip) {
  return true;
}

function isCIDR(ip) {
  //if it has a slash at the end and the number it is cidr range otherwise false, number needs to be a valid cidr number
  return true;
}

export function validateInput(input) {
  const specialChars = /[`!@#$%^&*()_+\=\[\]{};'"\\|<>\?~]/;
  const validDomain =
    /^((http|https):\/\/)?([a-zA-Z0-9_][-_a-zA-Z0-9]{0,62}\.)+([a-zA-Z0-9\/]+([a-zA-Z0-9]){1,10})$/g;
  const multipleEntries = input.split(", ");
  if (specialChars.test(input)) {
    return false;
  }
  if (validDomain.test(input)) {
    return true;
  }
  if (input.length > 100) {
    return false;
  }
  if (input.length > 1 && input.length <= 10) {
    return false;
  }
  if (input.length === 1) {
    return false;
  }
  if (/\s/.test(input)) {
    return true;
  }
  if (multipleEntries.length > 1) {
    return true;
  }
  // If is a cidr range extract the first part of it which is everything before the slash,
  // If not local Ip return false
  return true;
}

export function getApiList(input) {
  return ["http://localhost:3080/random-data"];
}
