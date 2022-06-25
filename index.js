
require("dotenv").config();

const   express    = require('express'),
        mongoose   = require("mongoose"),
        Grid       = require("gridfs-stream"),
        cors       = require("cors"),
        jwt        = require("jsonwebtoken"),
        port       = process.env.PORT || 8000;
        app        = express();

const { setMongooseConnection }  = require("./utils/connections");
      
// Initial Set up
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
setMongooseConnection();

let gridFileSystemObj;
const conn = mongoose.connection;
conn.once("open", () => {
    gridFileSystemObj=Grid(conn.db, mongoose.mongo);
    gridFileSystemObj.collection("photos");
})

// Routers
const imageRouter = require("./routes/image");
const authRouter = require("./routes/auth");

app.use("/file", imageRouter);
app.use("/api", authRouter);



// Image get, delete routes
app.get('/file/:filename', async(req, res) => {
    try{
        const file = await gridFileSystemObj.files.findOne({filename:req.params.filename});
        const readStream = gridFileSystemObj.createReadStream(file.filename);
        readStream.pipe(res);
        res.send("file found")
    }catch(error){
        res.send("File Not found")
    }
})

app.delete("/file/:filename", async(req, res) => {
    try{
        await gridFileSystemObj.files.deleteOne({filename:req.params.filename})
        res.send("Deleted Successfully")
    }catch(err) {
        console.log(err) 
        res.send("Failed to delete")
    }
})


// Server Listening
app.listen(port, (err) => {
    if(err){
        console.error(`Facing Error ${err}`)
    }
    console.info(`Server Running on port ${port}`)
});


