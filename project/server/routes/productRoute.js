const express=require("express")
const router=express.Router()
const Product=require('../models/Product')
const verifyJWT=require('../middleware/verifyJWT')
const multer = require("multer")
const productController=require('../controllers/productController')

const upload = multer({ dest: './public/upload/' })

router.get("/",productController.getAllProducts)
router.get("/:_id",productController.getProductById)
router.post("/",upload.single('image'),productController.createNewProduct)
router.put("/",upload.single('image'),productController.updateProduct)
router.put("/buy",verifyJWT,productController.buyProduct)
router.put("/cancel",verifyJWT,productController.cancelProduct)
router.put("/decrease",verifyJWT,productController.decreaseProduct)
router.get("/count/:_idProduct",verifyJWT,productController.countProduct)
router.delete("/:_id",productController.deleteProduct)
module.exports=router