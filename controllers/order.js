const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.allOrders = async(req,res)=>{

    try {

        const orders = await Order.findAll({
            include: [{
                model: User,
                attributes: ['name','email','mobile']
            },
            {
                model: Product,
            }
        ]
        });

        res.status(200).json({
            message: "All orders",
            success: true,
            orders
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.myOrders = async(req,res)=>{
    try {

        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const orders = await Order.find({user: user._id}).populate('product');

        res.status(200).json({
            message: "My orders",
            success: true,
            orders
        })
        
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


exports.orderById = async(req,res)=>{

    try {

        const order = await Order.findOne({where:{order_id:req.params.id}});

        res.status(200).json({
            message: "order by id",
            success: true,
            order
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

exports.orderByUserId = async(req,res)=>{

    try {

        const user = await User.findOne({where:{user_id:req.params.id}});
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        const orders = await Order.findOne({where:{user_id: user.user_id},
            include: [{
                model: Product,
            }]    
        });

        res.status(200).json({
            message: "order by user id",
            success: true,
            orders
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}