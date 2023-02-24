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

interface Data {
  temperatureC: number;
  temperatureF: number;
  voltage: number;
  waterLevel: number;
}

export function getData(): Data {
  return {
    temperatureC: getRandomIntInclusive(-60, 60),
    temperatureF: getRandomIntInclusive(-75, 3),
    voltage: getRandomIntInclusive(0, 240),
    waterLevel: getRandomIntInclusive(0, 150),
  };
}
