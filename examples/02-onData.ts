import { once } from "events";
import path from "path";
import { createReadStream } from "fs";

const main = async () => {
  const readStream = createReadStream(path.resolve(__dirname, "accountId.csv"));

  readStream.on("data", (buffer: Buffer) => {
    console.log(buffer.toString());
  });

  await once(readStream, "end");

  console.log("File processed");
};

main()
  .then(() => console.log("done"))
  .catch(console.error);
