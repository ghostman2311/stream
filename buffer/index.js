const buffer = Buffer.alloc(5);
buffer.fill("hi", 0, 2);

console.log({ buffer: buffer.toString() });

const msg = "Hi there!";
const anotherBuffer = Buffer.from(msg);

console.log(anotherBuffer.toString(), anotherBuffer, anotherBuffer.byteLength);
