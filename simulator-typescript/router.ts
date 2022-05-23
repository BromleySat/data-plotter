import { getData } from "./data/data";
import { getRandomData } from "./data/random-data";

import { Application, Request, Response } from "express";

function Routes(app: Application) {
  app.get("/data", function (req: Request, res: Response) {
    const data = getData();
    res.send(data);
  });

  app.get("/random-data", function (req: Request, res: Response) {
    const randomData = getRandomData();
    res.send(randomData);
  });
}

export default Routes;
