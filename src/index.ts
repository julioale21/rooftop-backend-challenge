import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
