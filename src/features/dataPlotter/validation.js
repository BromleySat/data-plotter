export function isLocalIp(ip) {
  return true;
}

function isCIDR(ip) {
  //if it has a slash at the end and the number it is cidr range otherwise false, number needs to be a valid cidr number
  return true;
}

// function multipleEntries(str) {
//   let newStr;
//   let strArray = str.split(",");
//   console.log(strArray);
//   for (let i = 0; i < strArray.length; i++) {
//     strArray[i] = strArray[i] + ",";
//     if (strArray[strArray.length - 1].includes(",")) {
//       newStr = strArray[strArray.length - 1].replace(",", "");
//     }
//     return false;
//   }
// }

export function validateInput(input) {
  const specialChars = /[`!@#$%^&*()_+\=\[\]{};'"\\|<>\?~]/;
  const validDomain =
    /^((http|https):\/\/)?([a-zA-Z0-9_][-_a-zA-Z0-9]{0,62}\.)+([a-zA-Z0-9\/]+([a-zA-Z0-9]){1,10})$/g;
  if (specialChars.test(input)) {
    return false;
  }

  if (input.length > 100) {
    return false;
  }
  if (input.length <= 10) {
    return false;
  }

  if (validDomain.test(input)) {
    return true;
  }
  if (!input.includes(",")) {
    return false;
  }
  if (/\s/.test(input)) {
    return true;
  }

  if (!validDomain.test(input)) {
    return false;
  }
  // if (multipleEntries(input)) {
  //   return true;
  // }
  // If is a cidr range extract the first part of it which is everything before the slash,
  // If not local Ip return false
  return true;
}

export function getApiList(input) {
  return ["http://localhost:3080/random-data"];
}
