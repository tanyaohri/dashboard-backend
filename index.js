require("dotenv").config();

const express = require('express'),
        app   = express();

const port  = process.env.PORT || 8000


app.listen(port, (err) => {
    if(err){
        console.error(`Facing Error ${err}`)
    }
    console.info(`Server Running on port ${port}`)
});


