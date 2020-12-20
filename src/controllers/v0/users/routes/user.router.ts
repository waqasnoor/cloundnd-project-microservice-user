import { Router, Request, Response, NextFunction } from "express";

import { User } from "../models/User";
import { AuthRouter } from "./auth.router";

const router: Router = Router();

router.use("/auth", AuthRouter);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const item = await User.findByPk(id);
  res.send(item);
});

export const UserRouter: Router = router;
