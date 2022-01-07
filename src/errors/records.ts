import { IResponse } from ".";

export const RECORD_ERRROS: Record<string, IResponse> = {
  RECORDS_NOT_FOUND: {
    name: "RECORDS_NOT_FOUND",
    code: "RE001",
    message: "Error while looking for records",
  },
  
};