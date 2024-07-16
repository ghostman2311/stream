import { Transform } from "node:stream";

const BREAK_LINE_SYMBOL = "\n";
const INDEX_NOT_FOUND = -1;

export default class CSVToNDJSON extends Transform {
  #delimeter = "";
  #headers = [];
  #buffer = Buffer.alloc(0);

  constructor({ delimeter = ",", headers }) {
    super();
    this.#delimeter = delimeter;
    this.#headers = headers;
  }

  *#updateBuffer(chunk) {
    // it'll ensure if we got a chunk that is not completed
    // and doesn't have a breakline
    // will concat with previous read chunk
    // 1st time = 01
    // 2nd time = ,erick,address\n
    // try parsing and returning data!

    this.#buffer = Buffer.concat([this.#buffer, chunk]);
    let breaklineIndex = 0;
    while (breaklineIndex !== INDEX_NOT_FOUND) {
      breaklineIndex = this.#buffer.indexOf(Buffer.from(BREAK_LINE_SYMBOL));
      if (breaklineIndex === INDEX_NOT_FOUND) break;
      const lineToProcessIndex = breaklineIndex + BREAK_LINE_SYMBOL.length;
      const line = this.#buffer.subarray(0, lineToProcessIndex);
      const lineData = line.toString();


      this.#buffer = this.#buffer.subarray(lineToProcessIndex);
      if (lineData === BREAK_LINE_SYMBOL) continue;

      const NDJSONLine = [];
      const headers = Array.from(this.#headers);

      for (const item of lineData.split(this.#delimeter)) {
        const key = headers.shift();
        const value = item.replace(BREAK_LINE_SYMBOL, "");
        if (key === value) break;

        NDJSONLine.push(`"${key}":"${value}"`);
      }

      if (!NDJSONLine.length) continue;
      const ndJSONData = NDJSONLine.join(",");
      yield Buffer.from(
        "{".concat(ndJSONData).concat("}").concat(BREAK_LINE_SYMBOL)
      );
    }
  }

  _transform(chunk, enc, callback) {
    for (const item of this.#updateBuffer(chunk)) {
      this.push(item);
    }

    return callback();
  }

  _final(callback) {
    if (!this.#buffer.length) return callback();

    for (const item of this.#updateBuffer(Buffer.from(BREAK_LINE_SYMBOL))) {
      this.push(item);
    }
    callback();
  }
}
