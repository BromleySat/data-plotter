const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

module.exports = app;
