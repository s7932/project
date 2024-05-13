const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Message = require("../models/Message")
const Product = require("../models/Product")
const User = require("../models/User")

const getAllUsers = async (req, res) => {
    const users = await User.find({}, { password: 0 }).lean()
    // if (!users?.length) {
    //     return res.status(400).json({ message: 'No users found' })
    // }
    res.json(users)
}
const updateUser = async (req, res) => {
    const { _id, name, email, phone, roles, products } = req.body
    if (!_id || !name) {
        return res.status(400).json({ message: 'Fields are required' })
    }
    for (let i = 0; i < email.length; i++) {
        if (email.indexOf(i) < 'a' || email.indexOf(i) > 'z') {
            return res.status(400).json({ message: 'Enter email in lower letters' })
        }
    }
    if (roles) {
        if (roles != "manager" & roles != "user") {
            return res.status(400).json({ message: 'Invalid roles' })
        }
    }

    const user = await User.findById({ _id }, { password: 0 }).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    user.name = name
    user.email = email
    user.phone = phone
    user.roles = roles
    user.products = products
    const updateUser = await user.save()
    res.json(`'${updateUser.name}' updated`)
}
const deleteUser = async (req, res) => {
    const { _id } = req.body
    const user = await User.findById(_id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    const messages = await Message.find({ to: _id });
    console.log(messages);
    messages.forEach(async (msg) => {
    await msg.deleteOne()

    })
    const messages2 = await Message.find({from: _id });
    console.log(messages2);
    messages2.forEach(async (msg) => {
    await msg.deleteOne()

    })

    const result = await user.deleteOne()

    const reply = `User' ${result.name}' ID ${result._id} deleted`
    res.json(reply)
}

const getUserById = async (req, res) => {
    const { _id } = req.params

    const user = await User.findById({ _id }, { password: 0 }).lean()

    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }
    res.json(user)
}
const getBasket = async (req, res) => {

    const user = await User.findById(req.user._id).lean()
    if (!user)
        return res.status(400).json("not found user")
    const products = user.products



    const prodList = await Promise.all(products.map(async (prod) => {

        const p = await Product.findById(prod._id).lean()
        return p
    }))

    res.json(prodList)

}



const createNewUser = async (req, res) => {
    const { username, password, name, email, phone, roles } = req.body

    if (!name || !username || !password || !phone) {

        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "The username is Duplicate:(" })
    }
    const hashpwd = await bcrypt.hash(password, 10)
    const userObject = { username, password: hashpwd, name, email, phone, roles }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({
            message: `Hello new user ${user.username}
        created` })
    }
    else {
        return res.status(400).json({ message: 'Invalid user received' })
    }

}


const totalCards = async (req, res) => {

    const user = await User.findById(req.user._id).lean()
    if (!user)
        return res.status(400).json("not found user")
    const products = user.products

    let counter = 0;
    let sum = 0;


    const prodList = await Promise.all(products.map(async (prod) => {
        counter += prod.count;
        const p = await Product.findById(prod._id).lean()
        if(p.price==="basic") sum+=prod.count*5; else if(p.price==="gold") sum+=prod.count*10;else sum+=prod.count*15;
        return p
    }))
    
    res.json({counter,sum})
}
const CompletionPurchase = async (req, res) => {

    const user = await User.findById(req.user._id)
    if (!user)
        return res.status(400).json("not found user")
    const lastProducts = user.products
    user.products=[];
    const updateUser = await user.save()
    res.json(`'${user.name}' updated`)
    
}

module.exports = { getAllUsers, updateUser, deleteUser, getUserById, getBasket, createNewUser, totalCards ,CompletionPurchase}