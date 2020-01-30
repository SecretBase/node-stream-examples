import express from "express";
import path from "path";
import { pipeline, Transform, TransformCallback } from "stream";
import { createReadStream } from "fs";

const app = express();

class OddStarTransform extends Transform {
  _transform(chunk: Buffer, encoding: string, cb: TransformCallback) {
    cb(null, chunk.toString().replace(/[13579]/g, "*"));
  }
}

app.get("/csv", (req, res) => {
  const readStream = createReadStream(path.resolve(__dirname, "accountId.csv"));
  const oddStarTransform = new OddStarTransform();

  res.set("Content-Type", "text/plain");

  pipeline(readStream, oddStarTransform, res, error => {
    if (error) {
      console.error(error);
    }

    res.end();
  });
});

app.listen(3000, () => {
  console.log("port listen on 3000");
});
