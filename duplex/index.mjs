import { Duplex, Transform } from "node:stream";

const server = Duplex({
  objectMode: true,
  write(chunk, enc, callback) {
    console.log(`[writable] saving`, chunk);
    callback();
  },
  read() {
    const everySecond = (intervalContext) => {
      this.counter = this.counter ?? 0;
      if (this.counter++ <= 5) {
        this.push(`My name is Nikhil [${this.counter}]`);
        return;
      }

      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(function () {
      everySecond(this);
    });
  },
});

server.write("[duplex] key this is writable");

server.push("[duplex] hey this is also a readable");

const transformToUppercase = Transform({
  objectMode: true,
  transform(chunk, enc, callback) {
    callback(null, chunk.toUpperCase());
  },
});

server.pipe(transformToUppercase).pipe(server);
