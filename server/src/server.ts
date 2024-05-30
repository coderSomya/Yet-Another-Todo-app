import mongoose from 'mongoose';
import serverConfig from './config/serverConfig';

async function start(){

    await mongoose.connect(serverConfig.MONGODB_URI)
    console.log("connected to mongodb")
}


start();