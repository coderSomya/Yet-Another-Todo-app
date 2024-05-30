import mongoose from 'mongoose';
import serverConfig from './config/serverConfig';
import { ApolloServer } from 'apollo-server';
import typeDefs from './typedefs';
import resolvers from './resolvers';


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

async function start(){

    await mongoose.connect(serverConfig.MONGODB_URI)
    console.log("connected to mongodb..")
    const {url} = await server.listen();
    console.log(`graphql server is up too on ${url}`);
}


start();