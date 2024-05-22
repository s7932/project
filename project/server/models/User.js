const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        lowercase:true,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true
    },
    phone:{
        type:String, 
        required:true
    },
    roles:{
        type:String, 
        enum:['manager','user'],
        default:'user'
    },
    products:{
        type:[{"_id":mongoose.Schema.Types.ObjectId,"count":Number}]
    },
    messages:{
        type:[mongoose.Schema.Types.ObjectId]
    }
    },{
        timestamps:true
    })
module.exports=mongoose.model('User',userSchema)






