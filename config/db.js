import { cache } from "react";
import mongoose from mongooose;

let cached = global.mongooose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false 
        }

        cached.promise = mongoose.conncet(`${process.env.MONGODB_URI}/Vanguard-ID-Systems`, opts).then( mongoose => {
            return mongoose
        })
    }

    cached.conn = await cached.promise
    
    return cached.conn
}

export default connectDB