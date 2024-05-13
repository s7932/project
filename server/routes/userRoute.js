const express=require("express")
const router=express.Router()
const userController=require('../controllers/userController')
const verifyJWT=require('../middleware/verifyJWT')

router.get("/",userController.getAllUsers)
router.get("/:_id",userController.getUserById)
router.get("/api/getBasket",verifyJWT,userController.getBasket)
router.get("/api/getSumOfCard",verifyJWT,userController.totalCards)
router.post("/",userController.createNewUser)
router.delete("/",userController.deleteUser)
router.put("/",userController.updateUser)
router.put("/complete",verifyJWT,userController.CompletionPurchase)
module.exports=router