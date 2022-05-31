function randomString(length: number): string {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// const deviceId = randomString(23);

const columnCount = getRandomIntInclusive(3, 5);
const columnNames: Array<String> = [];

for (let i = 0; i < columnCount; i++) {
  columnNames.push(randomString(6));
}

export function getRandomData(): any {
  let response: any = {};

  for (let column of columnNames) {
    response[column.toUpperCase()] = getRandomIntInclusive(-290, 585);
  }

  return response;
}
