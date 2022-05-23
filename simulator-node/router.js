const d = require("./data/data");
const rd = require("./data/random-data");

module.exports = function (app) {
  app.get("/data", function (req, res) {
    const data = d.getData();
    res.send(data);
  });
  app.get("/random-data", function (req, res) {
    const randomData = rd.randomData();
    res.send(randomData);
  });
};
