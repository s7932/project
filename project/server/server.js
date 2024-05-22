require("dotenv").config()
const express=require("express")
const cors=require("cors")
const path=require('path')
const { default: mongoose } = require("mongoose")

const corsOptions=require("./config/corsOptions")
const connectDB=require('./config/dbConn')

const PORT=process.env.PORT||1920

const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))


app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/upload/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});
app.use('/uploads', express.static(__dirname + '/public/upload'));


app.use("/api/auth",require("./routes/authRoute"))
app.use("/api/user",require("./routes/userRoute"))
app.use("/api/product",require("./routes/productRoute"))
app.use("/api/message",require("./routes/messageRoute"))

mongoose.connection.once('open',()=>{
    console.log('Connected')
    app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})
})
mongoose.connection.on('error',err=>{
    console.log(err)
})