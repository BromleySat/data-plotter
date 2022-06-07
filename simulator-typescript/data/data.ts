function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function makeId(length: number): string {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// const deviceId = makeId(23);

const getDate = (): string => {
  var today = new Date();
  var time: string =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};

interface Data {
  date: string;
  temperatureC: number;
  temperatureF: number;
}

export function getData(): Data {
  return {
    date: getDate(),
    temperatureC: getRandomIntInclusive(300, 900),
    temperatureF: getRandomIntInclusive(-20, 55),
  };
}
