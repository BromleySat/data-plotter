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

  return false;
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
  const specialCharactersRegex = /[`!@#$%^&*()_+=[\]{};'"\\|<>?~]/;
  const validDomainRegex =
    /^((http|https|localhost):\/\/)?([a-zA-Z0-9_][-_a-zA-Z0-9]{0,62}\.)+([a-zA-Z0-9/]+([a-zA-Z0-9]){1,10})$/g;

  const apiList = input.split(",");
  console.log(apiList);

  for (let api of apiList) {
    if (/\s/.test(api)) {
      api = api.replace(" ", "");
    }
    if (specialCharactersRegex.test(api)) {
      console.log("SPECIAL CHARACTERS");
      return false;
    }
    if (api.length === 0) {
      console.log("LENGTH TOO SHORT");
      return false;
    }
    if (api.startsWith("http://")) {
      api = api.replace("http://", "");
      if (api.includes("/")) {
        console.log("SLASH 0");
        return false;
      }
    }
    if (api.startsWith("https://")) {
      api = api.replace("https://", "");
      if (api.includes("/")) {
        console.log("SLASH 1");
        return false;
      }
    }
    if (api.includes("/")) {
      console.log("SLASH 2");
      return false;
    }
    // if (validDomainRegex.test(api) === false) {
    //   console.log("VALID DOMAIN");
    //   return false;
    // }
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
    inputArray[i] = inputArray[i].replace(" ", "");
    if (inputArray[i].includes("http://") || inputArray[i].includes("https://"))
      continue;
    if (inputArray[i].startsWith("localhost:3080")) {
      inputArray[i] = str + inputArray[i];
      continue;
    }
    if (isLocalIp(inputArray[i]) && !inputArray[i].includes("http")) {
      inputArray[i] = str + inputArray[i];
      continue;
    }
    if (!inputArray[i].includes("https")) inputArray[i] = str2 + inputArray[i];
  }

  return inputArray;
}
