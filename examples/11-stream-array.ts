import { Readable } from "stream";

const data = Array.from({ length: 100 }, (_, index) => index);

const stream = Readable.from(data);

(async () => {
  for await (let number of stream) {
    console.log(number);
  }
})();
