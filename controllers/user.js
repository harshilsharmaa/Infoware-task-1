const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

exports.register = async(req, res)=>{

    try {

        const {name, email, password, mobile} = req.body;

        const user = await User.findOne({where:{email}});
        if(user){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const userData = {
            name,
            email,
            password,
            mobile,
        }

        const newUser = await User.create(userData);

        const token = jwt.sign({_id: newUser.user_id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {}).status(201).json({
            message: "User registered successfully",
            success: true,
            newUser
        });

        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
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
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }


        const token = jwt.sign({_id: newUser.user_id}, process.env.JWT_SECRET, {expiresIn: '7d'});


        res.cookie('token', token, {}).status(200).json({
            message: "User logged in successfully",
            success: true,
            token,
            newUser
        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.myProfile = async(req,res)=>{
    try {
        
        const user = await User.findOne({user_id: req.user.id, 
            include: [{
                model: Order,
            }]
        });

        res.status(200).json({
            message: "My profile",
            success: true,
            user
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
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

        res.status(200).json({
            message: "User updated successfully",
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
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
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.logout = async(req,res)=>{
    try {
        
        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}