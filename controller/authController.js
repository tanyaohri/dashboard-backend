const { allKeysPresent } = require("../utils/controller");
const User = require("./../models/user");
const bcrypt = require('bcryptjs');
const { getAuthToken } = require("../utils/middleware");


const is_valid_auth_request = (req, res, next) =>{
    if(!allKeysPresent(req.body, ["email", "password"])){
        return res.json({
            code:400,
            status:"error",
            message:"Incomplete request [ Not enough params for request ]"
        });
    }
    next();
}   

const does_user_exists = (user) => {
    console.log(user, "Does user exists")
    return new Promise((resolve, reject) => {
        User.findOne({email:user.email}, (err , data) => {
            if(err){
                reject(false) 
            }
            if(data===null)
                reject(false)
            resolve(data)
            return 
        })
    })
}

const store_user = async(req, res) => {
    does_user_exists(req.body)
    .then(async (response) => {
        res.json({
            status:"ok",
            message:"User Already Exists !",
            data:response
        });
    })
    .catch((err) => {
        try{
            return bcrypt.hash(req.body.password, 12).then(async (hased_password) => {
                const user = await User.create({
                    email:req.body.email,
                    password:hased_password
                });
                return res.json({
                    status:"ok",
                    message:"User sucessfully registered",
                    data:user
                })
            })
        }catch(error){
            res.json({
                status:"error",
                message:"Problem while trying to create user !",
                data:error
            })
            return;
        }
    })
}



const check_user=async(req, res)=>{
    does_user_exists(req.body).then(async (response) => {
        console.log(response, "response")
        bcrypt.compare(req.body.password,response.password)
              .then(async(isMatched) => {
                if(isMatched){
                    return getAuthToken({
                        email:response.email,
                        password:response.password
                    }).then((result) => {
                        return res.json({
                            status:"success",
                            message:"Successfully Logged In",
                            data:response,
                            token:result
                          });
                    });
                   
                }
               
                 res.json({
                            status:"error",
                            message:"Invalid credentials"
                        })
              });
    }).catch((err) => {
        return res.json({
            status:"error",
            message:"Please Sign up first !"
        })
    })
}




module.exports = {
    store_user,
    is_valid_auth_request,
    check_user
}