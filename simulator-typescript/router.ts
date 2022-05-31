import { getData } from "./data/data";
import { getRandomData } from "./data/random-data";
import { getDeviceIdandVersion } from "./data/config";

import { Application, Request, Response } from "express";

function Routes(app: Application) {
  app.get("/api/config", function (req: Request, res: Response) {
    const config = getDeviceIdandVersion();
    res.send(config);
  });
  app.get("/api/data", function (req: Request, res: Response) {
    const data = getData();
    res.send(data);
  });

  app.get("/api/random-data", function (req: Request, res: Response) {
    const randomData = getRandomData();
    res.send(randomData);
  });
}

export default Routes;
