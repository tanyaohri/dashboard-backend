const { authenticateToken } = require("./utils/middleware");

require("dotenv").config();

const express       = require('express'),
        jwt         = require("jsonwebtoken"),
        app         = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

app.get("/posts",authenticateToken ,(req, res) =>{
    res.json(posts.filter((post) => post.username === req.user.name ))
})

app.post("/login", (req, res) => {
   
   
    // console.log("Login called")
    // const username = req.body.username;
    // if(username===undefined || username===null){
    //     res.send({
    //         message: "Please provide username"
    //     });
    //     return
    // }
    // const user = { name : username }
    // const access_token = jwt.sign(user, jwt_secret_token);
    // res.send({
    //     message:`Hey there ${username}`,
    //     accessToken : access_token
    // })
    const username = req.body.username;

    if(username===undefined || username===null)
    {
        console.error("Username has not been provided");
        res.sendStatus(403);
        return; 
    }

    const user = {
        name:username
    }

    




})

app.listen(port, (err) => {
    if(err){
        console.error(`Facing Error ${err}`)
    }
    console.info(`Server Running on port ${port}`)
});


