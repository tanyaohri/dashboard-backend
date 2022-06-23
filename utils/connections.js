const {
    MongoClient,
    ServerApiVersion
} = require("mongodb");
const mongoose = require("mongoose");


const setMongoDBConnection = async() => {  
    
    const connectionParams = { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    }
    try{
        const client = new MongoClient(process.env.MONGO_URI, connectionParams);
        client.connect((err) => {
            if(err)
                console.log(err)
            resolve("MongoDB connection Working !!")
        });
    }
    catch(err){
        console.log(err);
    }   
}

const setMongooseConnection = async() => {
    try{
        await mongoose.connect(
            process.env.MONGO_URI,
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
            }
        )
        console.log("Connected Successfully to MongoDB !!")
    }catch(err) {
        console.log("Error while connecting to application")
    }
 
}

module.exports={
    setMongoDBConnection, 
    setMongooseConnection
}