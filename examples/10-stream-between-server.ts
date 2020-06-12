import express from "express";
import { createReadStream } from "fs";
import { promisify } from "util";
import { pipeline, Readable } from "stream";
import path from "path";
import axios from "axios";

const pipe = promisify(pipeline);

const app = express();
const app2 = express();

app.get("/csv", async (req, res) => {
  const csv = createReadStream(path.join(__dirname, "./accountId.csv"));
  await pipe(csv, res);
});

app2.get("/csv", async (req, res) => {
  try {
    res.set("Content-Type", "text/plain");
    const response = await axios.get<Readable>("http://localhost:3000/csv", {
      responseType: "stream",
    });
    await pipe(response.data, res);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
});

app.listen(3000, () => {
  console.log("app listen on 3000");
});

app.on("error", console.error);

app2.listen(3001, () => {
  console.log("app listen on 3001");
});
