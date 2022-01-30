import { Server as HttpServer } from "http";
import { Socket, Server, ServerOptions } from "socket.io";

export enum SocketEvents {
  CONNECTION_ERROR = "connect_error",
  DISCONNECT = "DISCONNECT",
  LOG = "LOG",
  ERROR = "ERROR",
}

export const initSockets = (
  httpServer: HttpServer,
  options?: ServerOptions
) => {
  const socketIo = new Server(httpServer, {
    pingInterval: 15000,
    pingTimeout: 30000,
    transports: ["websocket", "polling"],
    cors: {
      origin: "*",
      methods: ["*"],
    },
    ...options,
  });

  /**
   * This variable determines what parameter from query would be used
   * to assign the socket that's connecting to the frontend to a specific room.
   * If there's no id provided in the query, then the incoming socket goes to
   * thee general room.
   */
  const ID_ATTRIBUTE = "id";

  socketIo.listen(8000);
  socketIo.on("connection", (socket: Socket) => {
    let id = socket.handshake.query[ID_ATTRIBUTE] as string;

    if (!id) {
      id = "/"; // WebSockets default namespace
    }

    socket.join(id);

    // This is emmited so the frontend starts listening
    socketIo.to(id).emit("connection", {
      success: true,
    });

    socketIo.to(id).emit(SocketEvents.LOG, "Socket open and ready to emit");
  });

  return socketIo;
};
