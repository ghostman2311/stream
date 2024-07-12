import { Transform } from "node:stream";

export default class CSVToNDJSON extends Transform {
  #delimeter = "";
  #headers = [];

  constructor({ delimeter = ",", headers }) {
    super();
    this.#delimeter = delimeter;
    this.#headers = headers;
  }

  _transform(chunk, enc, callback) {
    callback(null, chunk);
  }

  _final(callback) {
    callback();
  }
}
