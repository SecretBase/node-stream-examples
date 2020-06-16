import path from "path";
import { createReadStream } from "fs";
import { createInterface } from "readline";

const main = async () => {
  const readStream = createReadStream(path.resolve(__dirname, "accountId.csv"));

  const rl = createInterface({
    input: readStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    console.log(line);
  }

  console.log("File processed");
};

main()
  .then(() => console.log("done"))
  .catch(console.error);
