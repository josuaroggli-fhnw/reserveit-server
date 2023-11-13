import { Router, Request, Response } from "express";
import { getAllUsers } from "../database/db.service";


export function registerAuthRoutes(app: Router) {
  app.post("/api/auth", (req: Request, res: Response) => {
    const { username } = req.body;
    const users = getAllUsers();
  
    const user = users.find((user) => user.username === username);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user);
  });
}
