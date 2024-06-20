import { createReadStream, promises, statSync } from "node:fs";

const filename = "./big.file";

try {
  const file = await promises.readFile(filename);
} catch (err) {
  console.log("error: max 2GB reached...", err.message);
}

const { size } = statSync(filename);

console.log("file size", size / 1e9, "GB", "\n");

let chunkConsumed = 0;

const stream = createReadStream(filename)
  .once("data", (msg) => {
    console.log("on data length", msg.toString().length);
  })
  .once("readable", (_) => {
    console.log("read 11 chunk bytes", stream.read(11).toString());
    console.log("read 5 chunk bytes", stream.read(5).toString());

    chunkConsumed += 11 + 5;
    console.log(chunkConsumed, "chunkConsumed");
  })
  .on("readable", () => {
    let chunk;

    while (null !== (chunk = stream.read())) {
      chunkConsumed += chunk.length;
    }
  })
  .on("end", () => {
    console.log(`Read ${chunkConsumed / 1e9} Gbytes of data....`);
  });
