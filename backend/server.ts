/* eslint-disable */
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT || 3002;
const expressServer = express();
const router = express.Router();

import { Request, Response } from "express";
import { initSockets } from "./socket";

const httpServer = http.createServer(expressServer);
httpServer.listen(port, () =>
  console.log(`Test server listening on port ${port}`)
);

["SIGINT", "SIGTERM", "SIGHUP"].map((signal) => {
  process.on(signal, () => {
    console.log(`Interrupted with ${signal}`);
    process.exit(0);
  });
});

const socket = initSockets(httpServer);

console.log("Socket server running. Events: ", socket.eventNames());

router.get("/status", (_: Request, res: Response) => res.status(204));

// Express server setup
expressServer.use(cors());
expressServer.use(bodyParser.json());
expressServer.use("/api", router);
expressServer.set("port", port);
