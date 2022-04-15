var db = require('../../models');

const User = db.user;


exports.addAdmin = async(req,res)=>{

    try {

        const user = await User.findOne({where:{user_id:req.params.id}});

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        if(user.admin){
            return {
                message: "Admin already exists",
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                data : {}
            }
        }



        user.admin = true;
        await user.save();

        return {
            message: "This User is now an admin",
            status: HTTP_STATUS.OK,
            success: true,
            data : {user}
        }

    } catch (error) {
        return {
            message: "Not Found",
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            data : {}
        }
    }
}