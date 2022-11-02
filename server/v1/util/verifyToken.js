import jwt from "jsonwebtoken";

const verifyToken = (req,res,next) =>{
    try {
        const authHeader = req.headers.token;
        console.log("authheader", authHeader)
        if(authHeader){
            jwt.verify(authHeader,process.env.SECRET_KEY, (err, user) =>{
                if(err) res.status(401).json('Token is not valid');
                req.user = user;
                console.log(req.user)
                next();
            })
        } else {
            return res.status(401).json("You are not authenticated")
        }
    } catch (error) {
        console.log(error)
    }
   
};


const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        console.log(req)
        try {
            if(req.user.isAdmin){
                next();
            } else {
                res.status(403).json("You are not allowed to do the action!!")
            }
        } catch (error) {
           console.log(error) 
        }
       
    })
}

const verifyTokenAndAdmin = (req, res, next) =>{

    try {
        verifyToken(req, res, ()=>{
            console.log("user",req.user)
            if(req.user.isAdmin){
                next();
            } else {
                res.status(403).json("You are not allowed to do the action!!")
            }
             
        }) 
    } catch (error) {
        console.log(error)
    }
    
}

export default {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}