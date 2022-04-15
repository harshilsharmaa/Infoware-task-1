const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async(req,res,next)=>{
    try {
        
        const {token} = req.cookies;
        if(!token){
            return {
                message: "Please Login First",
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                data : {}
            }
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findOne({_id:decoded._id});
       
        next();

    } catch (error) {
        return {
            message: "NOT FOUND",
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            data : {}
        }
    }
}

