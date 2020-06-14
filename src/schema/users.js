let mongoose = require('mongoose')

const users = mongoose.Schema({
    username: { type: String, required: true,},
    password: {  type: String, required: true },
    level: String,
    createAt: {type:Date, default:Date.now}
})

users.index({username:1},{unique:true})

module.exports = mongoose.model('users', users);