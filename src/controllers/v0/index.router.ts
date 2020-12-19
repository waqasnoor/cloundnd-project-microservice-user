import { Router, Request, Response, NextFunction } from "express";
import { UserRouter } from "./users/routes/user.router";

const router: Router = Router();

router.use("/users", UserRouter);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send(`V0`);
  next();
});

export const IndexRouter: Router = router;
