export function isLocalIp(ip) {
  const regForClassA =
    /(10)(\.([2]([0-5][0-5]|[01234][6-9])|[1][0-9][0-9]|[1-9][0-9]|[0-9])){3}/g;
  const regForClassB =
    /(172)\.(1[6-9]|2[0-9]|3[0-1])(\.(2[0-4][0-9]|25[0-5]|[1][0-9][0-9]|[1-9][0-9]|[0-9])){2}/g;
  const regForClassC =
    /(192)\.(168)(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){2}/g;

  if (regForClassA.test(ip)) {
    return true;
  }
  if (regForClassB.test(ip)) {
    return true;
  }
  if (regForClassC.test(ip)) {
    return true;
  }
  if (!regForClassB.test(ip)) {
    return false;
  }
  if (!regForClassC.test(ip)) {
    return false;
  }
  return true;
}

// function isCIDR(ip) {
//   //if it has a slash at the end and the number it is cidr range otherwise false, number needs to be a valid cidr number
//   return true;
// }

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
  let str = "http://";
  let str2 = "https://";
  let inputArray = input.split(",");
  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] = inputArray[i].replace(/\s+/g, "");
    if (inputArray[i].startsWith("localhost") || /^\d/.test(inputArray[i])) {
      inputArray[i] = str + inputArray[i];
    } else if (inputArray[i].startsWith("https://")) {
      inputArray[i] = inputArray[i];
    } else if (inputArray[i].startsWith("http://")) {
      inputArray[i] = inputArray[i];
    } else {
      inputArray[i] = str2 + inputArray[i];
    }
  }

  return inputArray;
}
