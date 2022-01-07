import  { Document } from 'mongoose';

export interface IRecord extends Document {
    name: string;
    createdAt: Date,
    counts?: Array<Number>,
    totalCount?: number
}

export interface MultiRecordsPayload {
    startDate: Date;
    endDate: Date;
    minCount: Number;
    maxCount: Number;
}

export interface RecordsResponse {
    code: number;
    msg: string;
    records : Array<IRecord>
}