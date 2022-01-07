import "module-alias/register";
import { Request, Server } from "@hapi/hapi";

import { SERVER_CONFIG } from "@config/server_config";
import { initAllRoutes } from "@api/routes";
import {connect as connectToDB} from "@services/db";
import { DB_CONFIG } from "@config/db_config";
import dotenv from "dotenv"

dotenv.config()

const { HOST, PORT } = SERVER_CONFIG;

const server: Server = new Server({
  port: PORT,
  host: HOST,
});

export const init = async () => {
  // initialize routes
  initAllRoutes(server);
  // connect to db
  await connectToDB(DB_CONFIG.MONGODB_CONNECTION_STRING)
  // start server
  try {
    server.events.on("response", (request : Request) => {
      console.log(request.payload);
      console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response}`);
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (e) {
    console.error("Error running server", e);
  }
};

process.on("unhandledRejection", (reason, p) => {
  console.log("UnhandledRejection", p, "reason:", reason);
});

init().then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  },
);
export { server };
