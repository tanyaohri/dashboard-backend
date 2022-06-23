require("dotenv").config();

const express       = require('express'),
        jwt         = require("jsonwebtoken"),
        app         = express();

app.use(express.json());

const port  = process.env.PORT || 8000
const jwt_secret_token = process.env.JWT_SECRET_ACCESS_TOKEN

const posts = [
    {
        username:"piyush",
        post:"post1"
    },
    {
        username:"tanya",
        post:"post2"
    }
]

app.get("/posts", (req, res) =>{
    res.json(posts)
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    console.log(req.body)
    if(username===undefined || username===null){
        res.send({
            message: "Please provide username"
        });
        return
    }
    const user = { name : username }
    const access_token = jwt.sign(user, jwt_secret_token);
    res.send({
        message:`Hey there ${username}`,
        accessToken : access_token
    })
})

app.post("/", (req, res) => {
    console.log("hi")
    console.log(req.body)
    res.send(req.body);
})



app.listen(port, (err) => {
    if(err){
        console.error(`Facing Error ${err}`)
    }
    console.info(`Server Running on port ${port}`)
});


