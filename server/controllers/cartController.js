const { Model } = require("sequelize")
const {Cart, CartItem, Product} = require("../models")

class CartController{
    static async  createCart(req, res, next){

        const {productId, quantity} = req.body

        try {
            const product = await Product.findByPk(productId)
            if(!product){
                throw{name:"NotFound", status:404, message:"Product not found"}
            } 
            if(product.stock < quantity){
                throw{name:"BadRequest", status:400, message:"Insufficient product stock"}
            }

            let cart = await Cart.findOne({where:{userId:req.user.id}})
            if(!cart){
               cart = await Cart.create({userId:req.user.id})
            }

            let cartItem = await CartItem.findOne({where:{cartId:cart.id, productId:productId}})
            if (!cartItem) {
                cartItem = await CartItem.create({
                  cartId:cart.id,
                  productId:productId,
                  quantity:quantity  
                })
            }else{
                cartItem.quantity += quantity
                await cartItem.save()
            }

            res.status(201).json({
                message:"Product successfully added to cart",
                cartItem
            })
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateCartQuantity(req, res, next){
        const {productId, quantity} = req.body
        try {
            const cart = await Cart.findOne({where:{userId:req.user.id}})
            if(!cart){
                throw{name:"NotFound", status:404, message:"cart not found"}
            }
            const cartItem = await CartItem.findOne({
                where:{cartId:cart.id, productId:productId}
            })

            if(!cartItem){
                throw{name:"NotFound", status:404, message:"cart not found"}
            }

            cartItem.quantity = quantity
            await cartItem.save()

            res.status(200).json({
                message:"update quantity successfully",
                cartItem
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async getUserCart(req, res, next){
        try {
            const data = await Cart.findOne({
                where:{userId:req.user.id},
                include:{
                    model:CartItem,
                    include:{model:Product}
                },
                order:[["id", "desc"]]
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = CartController