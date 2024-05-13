const express=require("express")
const router=express.Router()
const messageController=require('../controllers/messageController')
const verifyJWT=require('../middleware/verifyJWT')

router.get("/",verifyJWT,messageController.getCountNewMsg)
router.get("/send",verifyJWT,messageController.getSendMsg)
router.get("/get",verifyJWT,messageController.getGetMsg)
router.post("/",verifyJWT,messageController.createNewMsg)
router.put("/",verifyJWT,messageController.updateShow)
router.delete("/:_id",verifyJWT,messageController.deleteMsg)
module.exports=router