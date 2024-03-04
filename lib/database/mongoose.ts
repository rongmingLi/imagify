import mongoose,{Mongoose} from 'mongoose'

const MONGOOSE_URL = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/image-ai'

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = {conn: null, promise: null}
}

export const connectToDatabase = async () => {
    if(cached.conn){
        return cached.conn;
    }
    if(!MONGOOSE_URL){
        throw new Error('MONGOOSE_URL is not defined')
    }
    if(!cached.promise){
        const options = {
            dbName: process.env.MONGOOSE_DB_NAME,
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGOOSE_URL, options).then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}