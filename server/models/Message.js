const mongoose=require('mongoose')
const messageSchema=new mongoose.Schema({
    from:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true
    },
    to:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true
    },
    wasShow:{
        type:Boolean,
        required:true,
        default:false
        
    },
    content:{
        type:String, 
        required:true
    },
    },{
        timestamps:true
    })
module.exports=mongoose.model('Message',messageSchema)






