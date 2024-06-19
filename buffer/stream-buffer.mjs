import { readFile } from "fs/promises";

const data = (await readFile("./text.txt")).toString().split("\n");

const LINES_PER_ITERATION = 10;

const iteration = data.length / LINES_PER_ITERATION;

let page = 0;

for (let index = 1; index < iteration; index++) {
  const chunk = data.slice(page, (page += LINES_PER_ITERATION)).join("\n");

  const buffer = Buffer.from(chunk);

  const amountOfBytes = buffer.byteOffset;
  const bufferData = buffer.toString().split("\n");
  const amountOfLines = bufferData.length;

  console.log(
    "processing",
    bufferData,
    `lines: ${amountOfLines}`,
    `bytes: ${amountOfBytes}`
  );
}
