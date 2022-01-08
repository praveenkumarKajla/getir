import { Server } from "@hapi/hapi";

import { RecordRoutes } from "./components/records/routes";
import { SERVER_CONFIG } from "@config/server_config";

const { BASE_URL, API_VERSION } = SERVER_CONFIG;
const ROUTE_PREFIX_V1 = BASE_URL + API_VERSION;

/**
  * initialize all the server routes  and log the paths for debugging purposes
  * @param {Server} server 
*/
export function initAllRoutes(server: Server): void {
  const recordRoutes = new RecordRoutes(server, ROUTE_PREFIX_V1);
  const table = server.table();
  console.log(table.map(x => ({ method: x.method, path: x.path })));
}
