var db = require('../../models');

const User = db.user;
const Order = db.order;
const Product = db.product;
const jwt = require('jsonwebtoken');


exports.register = async(req, res)=>{

    try {

        const {name, email, password, mobile} = req.body;

        const user = await User.findOne({where:{email}});
        if(user){
            return {
                message: "User already exists",
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                data : {}
            }
        }

        const userData = {
            name,
            email,
            password,
            mobile,
        }

        const newUser = await User.create(userData);

        const token = jwt.sign({_id: newUser.user_id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {});

        return {
            message: "User created successfully",
            status: HTTP_STATUS.CREATED,
            success: true,
            data : {newUser}
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

exports.login = async(req, res)=>{
    try {
        
        const {email, password} = req.body;

        const newUser = await User.findOne({where:{email}});
        if(!newUser){
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const isMatch = async function(password){
            return await bcrypt.compare(password, newUser.password);
        }

        if(!isMatch){
            return {
                message: "Invalid credentials",
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                data : {}
            }
        }


        const token = jwt.sign({_id: newUser.user_id}, process.env.JWT_SECRET, {expiresIn: '7d'});


        res.cookie('token', token, {});

        return {
            message: "User loggedin successfully",
            status: HTTP_STATUS.OK,
            success: true,
            data : {newUser}
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

exports.myProfile = async(req,res)=>{
    try {
        
        const user = await User.findOne({user_id: req.user.id, 
            include: [{
                model: Order,
            }]
        });

        return {
            message: "Profile",
            status: HTTP_STATUS.OK,
            success: true,
            data : {user}
        }
        
    } catch (error) {
        return {
            message: "NOT FOUND",
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            data : {}
        }
    }
}

exports.updateProfile = async(req,res)=>{
    try {

        const user = await User.findOne(req.user.id);
    
        if(req.body.name){
            user.name = req.body.name;
        }
        if(req.body.mobile){
            user.mobile = req.body.mobile;
        }

        await user.save();

        return {
            message: "Profile updated successfully",
            status: HTTP_STATUS.OK,
            success: true,
            data : {user}
        }

    } catch (error) {
        return {
            message: "NOT FOUND",
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            data : {}
        }
    }
}

exports.deleteProfile = async(req,res)=>{
    try {

        const user = await User.findOne(req.user.id);

        await user.destroy();



        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            message: "User deleted successfully",
            success: true
        });


        
    } catch (error) {
        return {
            message: "NOT FOUND",
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            data : {}
        }
    }
}


exports.logout = async(req,res)=>{
    try {
        
        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {
        return {
            message: "NOT FOUND",
            status: HTTP_STATUS.BAD_REQUEST,
            success: false,
            data : {}
        }
    }
}