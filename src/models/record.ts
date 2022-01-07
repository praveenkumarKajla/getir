import { IRecord } from '@typeroot/records';
import mongoose, { Schema } from 'mongoose';

/**
 * Record Schema matching mongo columns
 * key : unique id per record
 * createdAt : time of record creation
 * counts : array of numbers
 */

const RecordSchema: Schema = new Schema({
  key: String,
  createdAt: Date,
  counts: [ Number]
});

export default mongoose.model<IRecord>('records', RecordSchema);