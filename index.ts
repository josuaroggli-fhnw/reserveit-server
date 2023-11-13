import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { registerAuthRoutes } from "./controllers/auth.controller";
import { httpLogger } from "./infrastructure/logger";
import { registerReservationRoutes } from "./controllers/reservation.controller";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  httpLogger.info({
    method: req.method,
    url: req.url,
    body: req.body,
  });
  next();
});
const port = process.env.PORT ?? 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

registerAuthRoutes(app);
registerReservationRoutes(app);

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));
