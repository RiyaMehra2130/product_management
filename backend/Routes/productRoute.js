const express=require("express")
const router=express.Router()
const {addProduct, getProduct,searchProduct,updateProduct,deleteProduct}=require('../Controller/productController')
const { route } = require("./Routes")

router.post('/add-product',addProduct)
router.get('/get-product',getProduct)
router.get('/search-product',searchProduct)
router.post('/update-product',updateProduct)
router.post('/delete-product',deleteProduct)
module.exports=router