import "reflect-metadata";
import { createConnection } from "typeorm";
import couponsRoutes from "./routes/coupons.routes";
import storesRoutes from "./routes/stores.routes";
import statsRoutes from "./routes/stats.routes";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const app = express();
createConnection();
const port = 8080;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes:
app.use(couponsRoutes);
app.use(storesRoutes);
app.use(statsRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
