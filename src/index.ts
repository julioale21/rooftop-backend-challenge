import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import { createConnection } from "typeorm";

import couponsRoutes from "./routes/coupons.routes";

const app = express();
createConnection();
const port = 8080;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes:
app.use(couponsRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
