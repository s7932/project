const User = require("../models/User")
const Product = require("../models/Product")
const createNewProduct = async (req, res) => {
    const { name, price, description} = req.body
    const image = req.file.path; 
    if (!name || !price|| !image ) {
        return res.status(400).json({ message: 'Fields is required' })
    }
    if (price) {
        if (price != "basic" & price != "gold" & price != "premium") {
            return res.status(400).json({ message: 'Invalid price' })
        }
    }
    const product = await Product.create({ name, price, description, image })
    if (product) {
        return res.status(201).json({ message: 'New product created' })
    }
    else {
        return res.status(400).json({ message: 'Invalid product ' })
    }
}

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    res.json(products)
}
const updateProduct = async (req, res) => {
    const { _id, name, price, description} = req.body
    const image = req.file.path; 

    if (!_id) {
        return res.status(400).json({ message: 'Fields are required' })
    }
    if (price) {
        if (price != "basic" & price != "gold" & price != "premium") {
            return res.status(400).json({ message: 'Invalid price' })
        }
    }
    const product = await Product.findById(_id).exec()
    if (!product) {
        return res.status(400).json({ message: 'product not found' })
    }
    product.name = name
    product.price = price
    product.image = image
    product.description = description

    const updateProduct = await product.save()
    res.json(`'${updateProduct.name}' updated`)
}
const deleteProduct = async (req, res) => {

    const { _id } = req.params
    const product = await Product.findById(_id).exec()


    if (!product) {
        return res.status(400).json({ message: 'product not found' })
    }
    if (product.users.length > 0) {
        product.users.forEach(async (u) => {
            const user = await User.findById(u._id)
            if (user) {
                if (user.products) {
                    user.products = user.products.filter((prod) => prod._id != _id)
                    await user.save()
                }
            }

        })
    }

    const result = await product.deleteOne()
    const reply = `Product ID ${_id} deleted`


    res.json(reply)
}

const getProductById = async (req, res) => {
    const { _id } = req.params

    const product = await Product.findById(_id).lean()

    if (!product) {
        return res.status(400).json({ message: 'No product found' })
    }
    res.json(product)
}


const buyProduct = async (req, res) => {
    const { _idProduct } = req.body
    const _idUser = req.user._id
    // console.log(_idUser, _idProduct);
    const product = await Product.findById(_idProduct)
    if (!product) {
        return res.status(400).json({ message: 'No product found' })
    }
    product.users.push(_idUser)
    const updateProduct = await product.save()

    const user = await User.findById(_idUser)
    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }

    // console.log(user.products);

    const existProduct = user.products.find((prod) => prod._id == _idProduct)
    if (!existProduct)
        user.products.push({ _id: _idProduct, count: 1 })
    else {
        user.products = user.products.map((prod) => { if (prod._id == _idProduct) prod.count += 1; return prod })
    }

    const updateUser = await user.save()

    res.json(`'${updateUser.name}' buy ${updateProduct.name}`)
}
const cancelProduct = async (req, res) => {
    const { _idProduct } = req.body
    const _idUser = req.user._id
    const product = await Product.findById(_idProduct)
    if (!product) {
        return res.status(400).json({ message: 'No product found' })
    }
    product.users = product.users.filter(a => a != _idUser)
    const updateProduct = await product.save()

    const user = await User.findById(_idUser)
    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }

    user.products = user.products.filter(a => a._id != _idProduct)
    const updateUser = await user.save()
    res.json(`'${updateUser.name}' cancel ${updateProduct.name}`)
}
const decreaseProduct = async (req, res) => {
    const { _idProduct } = req.body
    const _idUser = req.user._id

    const user = await User.findById(_idUser)
    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }
    const existProduct = user.products.find((prod) => prod._id == _idProduct)
    if (existProduct.count > 1)
        user.products = user.products.map((prod) => { if (prod._id == _idProduct) prod.count -= 1; return prod })
    else {
        user.products = user.products.filter((prod) => prod._id != _idProduct)
        const product = await Product.findById(_idProduct)
        if (!product) {
            return res.status(400).json({ message: 'No product found' })
        }
        product.users = product.users.filter(a => a._id != _idUser)
        const updateProduct = await product.save()
    }
    const updateUser = await user.save()
    res.json(`'${updateUser.name}' ❤❤ `)
}
const countProduct = async (req, res) => {
    const { _idProduct } = req.params
    const _idUser = req.user._id

    const user = await User.findById(_idUser)
    if (!user) {
        return res.status(400).json({ message: 'No user found' })
    }
    const existProduct = user.products.find((prod) => prod._id == _idProduct)

    if (existProduct)
        return res.json({ count: existProduct.count })
    else
        return res.json({ count: 0 })
}
module.exports = { createNewProduct, getAllProducts, updateProduct, deleteProduct, getProductById, buyProduct, cancelProduct, decreaseProduct, countProduct }