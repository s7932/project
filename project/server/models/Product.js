const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        index:true,
        
    },
    price:{
        type:String, 
        enum:['basic','gold','premium'],
        default:'basic'
    },
    users:{
        type:[mongoose.Schema.Types.ObjectId]
    },
    description:{
        type:String
    },
    image:{
        type:String,
        required:true
    }
    },{
        timestamps:true
    })
module.exports=mongoose.model('Product',productSchema)






