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

/**
 * Async function responsible for initializing the server functions.
 *
 * `initAllRoutes` initializes all the routes defined for the apis
 * 
 * `connectToDB` Connects to mongodb server & takes connection string as input
 * 
 * 
 */

export const init = async () => {
  /**
   * initialize routes
  */
  initAllRoutes(server);
  /**
   * connect to db
  */
  await connectToDB(DB_CONFIG.MONGODB_CONNECTION_STRING)
  /**
   * Start the Server & log each request & response
  */
  try {
    /**
    * This event is fired whenever the server returns a response and we can use it to log request & response properties
    * @event
    */
    server.events.on("response", (request : Request) => {
      console.log(request.payload);
      console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.path} --> ${request.response}`);
    });
    /**
     * Start the server
    */
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  } catch (e) {
    console.error("Error running server", e);
  }
};

/**
* This event is fired whenever server couldn't handle an exceptions and we log it to know the reason
* @event
*/
process.on("unhandledRejection", (reason, p) => {
  console.log("UnhandledRejection", p, "reason:", reason);
});

/**
 * call the initialize function  whenever this file is imported for testing purposes
*/
init().then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  },
);
export { server };
