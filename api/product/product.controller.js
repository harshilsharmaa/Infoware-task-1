var db = require('../../models');

const User = db.user;
const Order = db.order;
const Product = db.product;



exports.allProducts = async(req,res)=>{

    try {

        const products = await Product.findAll({});

       return{
            message: "All products",
            success: true,
            data:{products},
            status: HTTP_STATUS.OK
       }
        
    } catch (error) {
        return{
            message: error.message,
            success: false,
            data:{},
            status: HTTP_STATUS.BAD_REQUEST
       }
    }
}

exports.addProduct = async(req,res)=>{
    try {

        const {name,price,color,size} = req.body;

        const newProductData= {
            name,
            price,
            color,
            size,
        }

        if(req.body.available){
            newProductData.available = req.body.available;
        }

        const newProduct = await Product.create(newProductData);


       return{
            message: "Product added successfully",
            success: true,
            data:{newProduct},
            status: HTTP_STATUS.CREATED
       }
        
        
    } catch (error) {
        return{
            message: error.message,
            success: false,
            data:{},
            status: HTTP_STATUS.BAD_REQUEST
       }
    }
}

exports.addExistingProduct = async(req,res)=>{
    try {

        const product = await Product.findOne({where:{product_id:req.params.id}});
        if(!product){
            return{
                message: "Product not found",
                success: false,
                data:{},
                status: HTTP_STATUS.BAD_REQUEST
            }
        }

        const quantity = req.body.quantity;

        product.available = (product.available + quantity);
        await product.save();

        return{
            message: "Product added successfully",
            success: true,
            data:{product},
            status: HTTP_STATUS.CREATED
        }
        
        
    } catch (error) {
        return{
            message: error.message,
            success: false,
            data:{},
            status: HTTP_STATUS.BAD_REQUEST
        }
    }
}


exports.buyProduct = async(req,res)=>{
    try {

        const quantity = req.body.quantity;

        const productId = req.params.id;
       
        const product = await Product.findOne({_id:req.params.id});
        if(!product){
            return{
                message: "Product not found",
                success: false,
                data:{},
                status: HTTP_STATUS.BAD_REQUEST
            }
        }

        if(product.available === 0){
            return{
                message: "Product is out of stock",
                success: false,
                data:{},
                status: HTTP_STATUS.BAD_REQUEST
            }
        }

        if(product.available < quantity){
            return{
                message: "Product is out of stock",
                success: false,
                data:{},
                status: HTTP_STATUS.BAD_REQUEST
            }
        }     

         const newOrderData = {
            user_id: req.user.user_id,
            product_id: productId,
            price: product.price,
            totalAmount: product.price * quantity,
            quantity
        }

        const order = await Order.create(newOrderData);

        product.available = (product.available - quantity);

        await product.save();

        return{
            message: "Product bought successfully",
            success: true,
            data:{order},
            status: HTTP_STATUS.CREATED
        }
        
    } catch (error) {
        return{
            message: error.message,
            success: false,
            data:{},
            status: HTTP_STATUS.BAD_REQUEST
        }
    }
}