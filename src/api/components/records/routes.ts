import { Server } from "@hapi/hapi";

import { RecordsController } from ".";

export class RecordRoutes {
  private server: Server;

  private route = "records/"

  private controller: RecordsController;

  private ROUTE_PREFIX: string;

  public constructor(server: Server, ROUTE_PREFIX: string) {
    this.server = server;
    this.ROUTE_PREFIX = ROUTE_PREFIX;
    this.controller = new RecordsController();
    this.initRoutes();
  }
  

  private initRoutes(): void {
    /**
     * getRecords return all records between two dates & sum of counts array b/w two numbers
    */
    this.server.route({
      method: "GET",
      path: `${this.ROUTE_PREFIX}${this.route}`,
      handler: this.controller.getRecords,
    });
}
}