import mongoose from 'mongoose';



export const connect =  async (MONGODB_CONNECTION_STRING: string) => {
  console.log(MONGODB_CONNECTION_STRING)
  try{
    const mongooseConnected = await mongoose.connect(MONGODB_CONNECTION_STRING)
    console.info(`Successfully connected to ${MONGODB_CONNECTION_STRING}`);
    return mongooseConnected.Connection
  } catch(err){
    console.error('Error connecting to database: ', err);
    throw new Error(`Error connecting to database: , ${err}`)
  }

};

mongoose.connection.on('disconnected', connect);
