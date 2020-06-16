import { Readable } from "stream";

const data = Readable.from(Array.from({ length: 1000 }, (_, index) => index));

data.on("data", async () => {
  throw new Error("Hi Hi");
});

data.on("error", console.error);

// (async () => {
//   try {
//     for await (let number of data) {
//       throw new Error("Hi Hi");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// })();

// Uncomment this line
// process.on("unhandledRejection", () => {
//   console.log("unhandledRejection");
//   process.exit(1);
// });
