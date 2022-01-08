import { Server } from "@hapi/hapi";

import { RecordsController } from ".";

/**
 * Record Routes class containing
 * 
 */
export class RecordRoutes {

  /**
     * 
     * received as parameter on constructor initalization
  */
  private server: Server;

  /**
     * prefix for the routes specific to this module
  */
  private route = "records/"

    /**
     * Controller which takes care of compute for api specific to this module
  */
  private controller: RecordsController;

  /**
     * ROUTE_PREFIX is defined in case this module goes through api upgrade
     * so instead of inheriting from constructor call we define it statically
  */
  private ROUTE_PREFIX: string;

  public constructor(server: Server, ROUTE_PREFIX: string) {
    this.server = server;
    this.ROUTE_PREFIX = ROUTE_PREFIX;
    this.controller = new RecordsController();
    this.initRoutes();
  }
  

/**
 * `initRoutes` which is called from `initAllRoutes` to initalizes routes specific to Records
 */
  private initRoutes(): void {
    
    this.server.route({
      method: "GET",
      path: `${this.ROUTE_PREFIX}${this.route}`,
      handler: this.controller.getRecords,
    });
}
}