var db = require('../../models');

const User = db.user;
const Order = db.order;
const Product = db.product;
const jwt = require('jsonwebtoken');

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

        return {
            success: true,
            data: {},
            messages: "All orders",
            status: HTTP_STATUS.OK,
          };
        
    } catch (error) {
        return {
            success: false,
            data: {},
            messages: error.message,
            status: HTTP_STATUS.BAD_REQUEST,
          };
    }
}

exports.myOrders = async(req,res)=>{
    try {

        const user = await User.findById(req.user.id);
        if(!user){
           return{
                message: "User not found",
                status: HTTP_STATUS.BAD_REQUEST,
                success: false,
                data : {}
           }
        }

        const orders = await Order.find({user: user._id}).populate('product');

        return {
            message: "My orders",
            status: HTTP_STATUS.OK,
            success: true,
            data : {orders}
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


exports.orderById = async(req,res)=>{

    try {

        const order = await Order.findOne({where:{order_id:req.params.id}});

        return{
            message: "order by id",
            status: HTTP_STATUS.OK,
            success: true,
            data : {order}
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

exports.orderByUserId = async(req,res)=>{

    try {

        const user = await User.findOne({where:{user_id:req.params.id}});
        if(!user){
              return{
                 message: "User not found",
                 status: HTTP_STATUS.BAD_REQUEST,
                 success: false,
                 data : {}
              }
        }

        const orders = await Order.findOne({where:{user_id: user.user_id},
            include: [{
                model: Product,
            }]    
        });

        return{
            message: "order by user id",
            status: HTTP_STATUS.OK,
            success: true,
            data : {orders}
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