function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getDate = () => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};

function getData() {
  return {
    date: getDate(),
    TemperatureC: getRandomIntInclusive(300, 900),
    TemperatureF: getRandomIntInclusive(0, 3),
    Voltage: getRandomIntInclusive(0, 240),
  };
}

module.exports = { getData };
