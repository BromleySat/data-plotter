import express, { Application } from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import Routes from "./router";
import cors from "cors";

const app: Application = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
Routes(app);

const port = process.env.PORT || 3080;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
