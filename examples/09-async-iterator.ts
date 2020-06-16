import { promisify } from "util";
import { pipeline, Readable, Transform } from "stream";

const pipe = promisify(pipeline);

const sleep = promisify(setTimeout);

const data = Array.from({ length: 100 }, () => Math.ceil(Math.random() * 100));

console.dir(data);

const double = new Transform({
  transform: function (chunk: string, encoding: string, cb) {
    cb(null, `${parseInt(chunk, 10) * 2}\n`);
  },
});

const pullNumber = async function* () {
  for (const num of data) {
    await sleep(100);
    yield String(num);
  }
};

const main = async () => {
  const readStream = Readable.from(pullNumber());

  return pipe(readStream, double, process.stdout);
};

main()
  .then(() => console.log("done"))
  .catch(console.error);
