const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next){
    console.log("Authenticate Token Called !!")
    console.log(req.headers);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(token===null || token === undefined)
        return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN
        , (err, user) => {
            if(err) 
                return res.sendStatus(403)
            req.user = user; 
            next()
        });

   
}

function getAuthToken(userObject){
    return jwt.sign(
        userObject,
        process.env.JWT_SECRET_ACCESS_TOKEN,
        {
            expiresIn:process.env.JWT_EXPIRE_TIME
        }
    )
}

module.exports = {
    authenticateToken,
    getAuthToken
}