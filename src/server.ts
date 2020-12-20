import cors from "cors";
import express, { NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

import { sequelize } from "./sequelize";

import bodyParser from "body-parser";
import { config } from "./config/config";
import { V0_USER_MODELS } from "./controllers/v0/model.index";
import { UserRouter } from "./controllers/v0/users/routes/user.router";
import { IndexRouter } from "./controllers/v0/index.router";

(async () => {
  await sequelize.addModels(V0_USER_MODELS);

  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;

  app.use(bodyParser.json());

  // app.use(
  //   cors({
  //     allowedHeaders: [
  //       "Origin",
  //       "X-Requested-With",
  //       "Content-Type",
  //       "Accept",
  //       "X-Access-Token",
  //       "Authorization",
  //     ],
  //     methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  //     origin: config.url,
  //   })
  // );
  app.use((req, _, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.use("/api/v0/", IndexRouter);

  // Root URI call
  app.get("/health", async (req, res) => {
    res.send("server is live");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running ${config.url}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
