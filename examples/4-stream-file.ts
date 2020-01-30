import express from "express";
import path from "path";
import { createReadStream } from "fs";

const app = express();

app.get("/csv", (req, res) => {
  const readStream = createReadStream(path.resolve(__dirname, "accountId.csv"));

  res.set("Content-Type", "text/plain");

  readStream.pipe(res);

  readStream.on("end", () => {
    res.end();
  });
});

app.listen(3000, () => {
  console.log("port listen on 3000");
});
