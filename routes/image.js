const upload  = require("../controller/imageController"),
     express  = require("express"),
     router   = express.Router();


router.post("/upload", upload.single("file"), (req, res) => {
    if(req.file === undefined) 
        return res.send("Please select a file")
    const imgURL = `http://localhost:8000/file/${req.file.filename}`;
    return res.send(imgURL);
})

module.exports=router