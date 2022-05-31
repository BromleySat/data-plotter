function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// const deviceId = randomString(23);

const columnCount = getRandomIntInclusive(3, 5);
const columnNames = [];

for (let i = 0; i < columnCount; i++) {
  columnNames.push(randomString(6));
}

function randomData() {
  var response = {};

  for (let column of columnNames) {
    response[column.toUpperCase()] = getRandomIntInclusive(-290, 585);
  }

  return response;
}

module.exports = { randomData };
