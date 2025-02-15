import { randomUUID } from "node:crypto";
import net from "node:net";
import { Writable } from "node:stream";

const users = new Map();

const notifySubscribers = (socketId, data) => {
  [...users.values()]
    .filter((userSocket) => userSocket.id !== socketId)
    .forEach((userSocket) => userSocket.write(data));
};

const streamBroadcaster = (socket) => {
  return Writable({
    write(chunk, enc, cb) {
      const data = JSON.stringify({
        message: chunk.toString(),
        id: socket.id.slice(0, 4),
      });

      notifySubscribers(socket.id, data);

      cb(null, chunk);
    },
  });
};

const server = net.createServer((socket) => {
  socket.pipe(streamBroadcaster(socket));
});

server.listen(3000, () => {
  console.log(`server is running at 3000`);
});

server.on("connection", (socket) => {
  socket.id = randomUUID();
  console.log("new connection!", socket.id);
  users.set(socket.id, socket);
  socket.write(
    JSON.stringify({
      id: socket.id.slice(0, 4),
    })
  );

  socket.on("close", () => {
    console.log("disconnected!", socket.id);
    users.delete(socket.id);
  });
});
