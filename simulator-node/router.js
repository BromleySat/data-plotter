const d = require("./data/data");
const rd = require("./data/random-data");
const c = require("./data/config");

module.exports = function (app) {
  app.get("/api/config", function (req, res) {
    const config = c.getDeviceIdandVersion();
    res.send(config);
  });
  app.get("/api/data", function (req, res) {
    const data = d.getData();
    res.send(data);
  });
  app.get("/api/random-data", function (req, res) {
    const randomData = rd.randomData();
    res.send(randomData);
  });
};
