const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');


exports.isAdmin = async(req,res,next)=>{
    try{

        if(req.user.admin){
            next();
        }else{
            return res.status(401).json({
                message: "You are not an admin",
                success: false
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.isAuthenticated = async(req,res,next)=>{
    try {
        
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                message: "Please login first",
                success: false
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findOne({_id:decoded._id});
       
        next();

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

