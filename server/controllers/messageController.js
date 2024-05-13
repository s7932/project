const User = require("../models/User")
const Message = require("../models/Message")
const createNewMsg = async (req, res) => {
    const { to, content } = req.body
    const _idUser = req.user._id

    if (!to|| !content) {
        return res.status(400).json({ message: 'Field is required' })
    }
    if (to === "all") {
        const users = await User.find({ roles: "user" })
        if (!users)
            return res.status(201).json({ message: 'There are not users' })
        users.forEach(async (user) => {
            const message = await Message.create({ from: _idUser, to: user._id, content })
            user.messages.push(message._id)
            await user.save()
        })
        return res.status(201).json({ message: 'New message to all users created' })
    }
    else {
        const user = await User.findOne({ username: to })
        if (!user)
            return res.status(400).json({ message: 'Invalid user' })
        const message = await Message.create({ from: _idUser, to: user._id, content })
        user.messages.push(message._id)
        await user.save()
        return res.status(201).json({ message: 'New message created' })
    }

}

const getSendMsg = async (req, res) => {
    const _idUser = req.user._id
    const messages = await Message.find({ from: _idUser }).sort({createdAt:-1}).lean()
    if (!messages?.length) {
        return res.status(201).json({ message: 'No send message found' })
    }
    res.json(messages)
}

const getGetMsg = async (req, res) => {
    const _idUser = req.user._id
    const messages = await Message.find({ to: _idUser }).sort({createdAt:-1}).lean()
    if (!messages?.length) {
        return res.status(201).json({ message: 'No get message found' })
    }
    res.json(messages)
}
const getCountNewMsg = async (req, res) => {
    const _idUser = req.user._id
    const messages = await Message.find({ to: _idUser, wasShow: false }).lean()
    if (!messages?.length) {
        return res.status(200).json({ count: 0 })
       
    }

    return res.json({ count: messages.length })
}
const updateShow = async (req, res) => {
    const { _id } = req.body
    const message = await Message.findById(_id)
    message.wasShow = !message.wasShow
    const updatedMessage = message.save()
    if (!updatedMessage)
        return res.status(400).json({ message: 'unSuccess ' })
    return res.status(201).json({ message: 'Successed changing the show' })

}
const deleteMsg = async (req, res) => {
   const {_id}=req.params
   const message = await Message.findById(_id)
   const result = await message.deleteOne()

   const reply = `Msg ID ${result._id} deleted`
   res.json(reply)
}





module.exports = { createNewMsg, getSendMsg, getGetMsg, getCountNewMsg, updateShow,deleteMsg }