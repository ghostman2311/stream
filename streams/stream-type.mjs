import { Writable, Readable, Transform } from "node:stream";
import { randomUUID } from "node:crypto";
import { createWriteStream } from "node:fs";

const readable = Readable({
  read() {
    for (let i = 0; i < 1e6; i++) {
      const person = {
        id: randomUUID(),
        name: `Nikhil-${i}`,
      };

      const data = JSON.stringify(person);
      this.push(data);
    }
    this.push(null);
  },
});

const mapFields = Transform({
  transform(chunk, enc, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name.toUpperCase()}\n`;
    cb(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, enc, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    console.log(chunk.toString(), "chunk--------------->");
    cb(null, "id, name\n".concat(chunk));
  },
});

const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  .pipe(createWriteStream("my.csv"));

pipeline.on("end", () => console.log("task finished..."));
