const d = require("./data/data");
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
};
