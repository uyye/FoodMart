const { Op } = require("sequelize")
const {Product} = require("../models")
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLODINARYCLOUDNAME,
    api_key:process.env.CLODINARYAPIKEY,
    api_secret:process.env.CLODINARYAPISECRET
})

class ProductController{
    static async AllProduct(req, res, next){
        try {
            let option = {where:{}}
            const {page, sort, filter, search} = req.query

            if(sort){
                option.order =[["createdAt", "desc"]]
            }

            if(search){
                option.where.name = {[Op.iLike] : `%${search}%`}
            }

            if(filter){
                option.where.category = {[Op.eq]:filter}
            }

            if (page) {
                option.limit = 10
                option.offset =(page-1)* 10
            }

            const {count, rows} = await Product.findAndCountAll(option)
            res.status(200).json({totalItems:count, products:rows })
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async productById(req, res, next){
        try {
            const {id} = req.params
            if(!id){
                throw{name:"NotFound", status:404, message:`Product not found`}
            }
            const data = await Product.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error);
            
        }
    }

    static async addProduct(req, res,next){
        
        try {
            let createData

            const {name, category, description, price, stock} = req.body
            
            console.log(req.body, ">>>>>>");
            
            if(!req.file){
                throw{name:"BadRequest", status:400, message:"image file require"}
            }

            let base64 = Buffer.from(req.file.buffer).toString("base64")

            let dataUrl = `data:${req.file.mimetype};base64,${base64}`
            
            const response = await cloudinary.uploader.upload(dataUrl)
            const image = response.secure_url

            createData = await Product.create({
                name,
                category,
                description,
                price,
                stock,
                imageUrl:image
            })

            const result = {
                message:"Product add successfully",
                product:{
                    id:createData.id,
                    name:createData.name
                }
            }

            res.status(201).json(result)
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    static async deleteProduct(req, res, next){
        try {
            const {id} = req.params
            const data = await Product.findByPk(id)

            if(!data){
                throw{name:"NotFound", status:404, message:"Product not found"}
            }

            await await Product.destroy({
                where:{id}
            })

            res.status(200).json({message:"Delete product Successfully"})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async updateProduct(req, res, next){
        try {
            const {id} = req.params
            const {name, category, description, price, stock} = req.body
            
            const product = await Product.findByPk(id)

            if(!product){
                throw{name:"NotFound", status:404, message:"Product not found"}
            }

            let image = product.imageUrl

            if(req.file){
                let base64 = Buffer.from(req.file.buffer).toString("base64")
                let dataUrl = `data:${req.file.mimetype};base64,${base64}`

                const response = await cloudinary.uploader.upload(dataUrl)
                image = response.secure_url
            }

            

            await product.update({
                name,
                category,
                description,
                price,
                stock,
                imageUrl:image
            })

            console.log(product, "CEK DATA AFTER EDIT");
            
            res.status(200).json({
                message:"Product updated successfully",
                product:{
                    id:product.id,
                    name:product.name
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

module.exports = ProductController