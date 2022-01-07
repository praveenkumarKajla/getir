import { IRecord } from '@typeroot/records';
import mongoose, { Schema } from 'mongoose';


const RecordSchema: Schema = new Schema({
  key: String,
  createdAt: Date,
  counts: [ Number]
});

export default mongoose.model<IRecord>('records', RecordSchema);