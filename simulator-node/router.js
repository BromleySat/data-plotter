const d = require("./data/data");

module.exports = function (app) {
  app.get("/data", function (req, res) {
    const data = d.getData();
    res.send(data);
  });
};
