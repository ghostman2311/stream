import { describe, it, expect, jest } from "@jest/globals";
import CSVToNDJSON from "../../src/stream-components/csvtondjson";

describe("CSV to NDJSON test suite", () => {
  it("given a csv string it should return a ndjson string", () => {
    const csvString = `id,name,address\n01,erick,address01\n`;
    const csvToJson = new CSVToNDJSON({
      delimeter: ",",
      headers: ["id", "name", "address"],
    });
    const expected = {
      id: "01",
      name: "erick",
      address: "address01",
    };

    csvToJson.on("data", fn);
    csvToJson.write(csvString);
    csvToJson.end();
  });
  it.todo(
    "it should work with strings that doesnt contains breaklines at the end"
  );
  it.todo(
    "it should work with files that has breaklines in the beginning of the string"
  );
});
