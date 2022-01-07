import { IRecord, MultiRecordsPayload} from "@typeroot/records";
import Record from "@models/record"
import { PipelineStage } from "mongoose";

export async function getRecordsBetweenDates(payloadData: MultiRecordsPayload): Promise<Array<IRecord>> {
  if(!(Object.prototype.toString.call(payloadData.startDate) === "[object Date]" && 
      Object.prototype.toString.call(payloadData.endDate) === "[object Date]")){
        throw new Error("Invalid Date format")
  }
  const startDate = payloadData.startDate
  const endDate = payloadData.endDate

  //  get records between startDate <-> endDate 
  //  & totalCount i.e. sum of counts array between minCount <-> maxCount
  const rangeFilters : PipelineStage.Match["$match"] = {
        "createdAt": {
            "$gte": startDate,
            "$lt": endDate
        },
        "totalCount": {
          "$gte": payloadData.minCount, // larger than the min count
          "$lt": payloadData.maxCount  // smaller than the max count
      }
}

// Projections to return the required columns & 
const projections: PipelineStage.Project["$project"] = {
        "_id": 0,
        "key": 1,
        "createdAt": 1,
        "totalCount": {
          $sum: "$counts"
      }
}

  return await Record.aggregate()
                .project(projections)
                .match(rangeFilters)
                .exec()
    .then((data: IRecord[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  getRecordsBetweenDates
};