// use node 14 for this example
import path from "path";
import { createReadStream } from "fs";
import { Transform, TransformCallback, pipeline } from "stream";
import csvParse from "csv-parse";
import { promisify } from "util";

const pipe = promisify(pipeline);

const sleep = promisify(setTimeout);

class TrimTransform extends Transform {
  constructor() {
    super({
      objectMode: true,
    });
  }
  _transform(
    data: { accountId: string },
    encoding: string,
    cb: TransformCallback
  ) {
    cb(
      null,
      // @ts-ignore
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value.trim()])
      )
    );
  }
}

const main = async () => {
  const readStream = createReadStream(path.resolve(__dirname, "accountId.csv"));
  const csParser = csvParse({
    delimiter: ",",
    bom: true,
    columns: true,
  });

  const trimCsv = new TrimTransform();

  // typescript broken on async generators function
  // @ts-ignore
  await pipe(readStream, csParser, trimCsv, async function* (source) {
    const CHUNK_SIZE = 50;

    let chunk = [];

    for await (const data of source) {
      if (chunk.length === CHUNK_SIZE) {
        // flush the chunk
        console.dir(chunk);
        console.log("flush chunk");
        await sleep(100);
        chunk.length = 0;
      }

      chunk.push(data);
    }

    // flush the last chunk
    console.dir(chunk);
    console.log("flush the last chunk");
    chunk.length = 0;
  });
};

main()
  .then(() => console.log("done"))
  .catch((error) => {
    console.log("error happen");
    console.error(error);
    process.exit(1);
  });
