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
  const localhostRegex = /(localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)/;
  const httpRegex = /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/;
  const specialChars = /[`!@#$%^&*()_+=[\]{};'"\\|<>?~]/;
  const validDomain =
    /^((http|https|localhost):\/\/)?([a-zA-Z0-9_][-_a-zA-Z0-9]{0,62}\.)+([a-zA-Z0-9/]+([a-zA-Z0-9]){1,10})$/g;

  const inputIntoArray = input.split(",");

  for (let inp of inputIntoArray) {
    if (inp.startsWith("http://")) {
      inp = inp.replace("http://", "");
      if (inp.includes("/")) {
        console.log("slash 1");
        return false;
      }
    } else if (inp.startsWith("https://")) {
      inp = inp.replace("https://", "");
      if (inp.includes("/")) {
        console.log("slash 1");
        return false;
      }
    } else if (inp.includes("/")) {
      console.log("slash 2");
      return false;
    }
  }

  if (specialChars.test(input)) {
    console.log("special chars");
    return false;
  }

  if (input.length > 100) {
    console.log("length");
    return false;
  }
  if (input.length <= 10) {
    console.log("short");
    return false;
  }

  if (validDomain.test(input)) {
    return true;
  }

  if (localhostRegex.test(input) && !/\s/.test(input)) {
    return true;
  }

  if (httpRegex.test(input)) {
    return true;
  }

  if (/\s/.test(input)) {
    return true;
  }

  if (input.startsWith("localhost") || input.startsWith("http://localhost")) {
    return true;
  }

  if (!validDomain.test(input)) {
    console.log("valid domain");
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
    } else if (isLocalIp(inputArray[i])) {
      inputArray[i] = str + inputArray[i];
    } else {
      inputArray[i] = str2 + inputArray[i];
    }
  }

  return inputArray;
}
