import Products from "../models/ProductModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {

    const {name , brand , category , description , price , countInStock} = req.body

    const image = req.file ? req.file.path : null

    const product = await Products.create({
        name,
        brand,
        category,
        description,
        price,
        countInStock,
        image
    })

    if(product){
        res.status(201).json(product)
    }
    
});


export {
    addProduct
}