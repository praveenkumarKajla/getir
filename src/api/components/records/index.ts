import {
  Request, ResponseObject, ResponseToolkit, Util as HapiUtil,
} from "@hapi/hapi";

import * as recordsDao from "@dao/records";
import { MultiRecordsPayload, RecordsResponse} from "@typeroot/records";

import { RECORD_ERRROS } from "@errors/records";

import validate from "./validate";
import { getResponseObject } from "@services/utils";
import { Constants } from "@config/constants";


export class RecordsController {
  getRecords = async (request: Request, h: ResponseToolkit)
  : Promise<RecordsResponse | ResponseObject> => {
    let payload = (request.query || {})
    let updatedPayload: MultiRecordsPayload
    try {
      updatedPayload = await validate.get.records.payload.validateAsync(payload) as MultiRecordsPayload;
      console.log(updatedPayload)
    }
    
    catch (error) { 
      return h.response({ message: error.message, payload }).code(400);
    }
    try {
      const records = await recordsDao.getRecordsBetweenDates(updatedPayload);
      return {...getResponseObject(Constants.SUCCESS_CODE, Constants.SUCCESS_MESSAGE), records};
    } catch (err) {
      console.log(err)
      return h.response(RECORD_ERRROS.RECORDS_NOT_FOUND).code(404);
    }
  }
}
