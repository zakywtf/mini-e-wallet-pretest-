let mongoose = require('mongoose')

const balance_bank = mongoose.Schema({
    balance: { type: Number, default:0},
    balance_achieve: {type:Number, default:0},
    code:String,
    enable:{type:Boolean, default:true},   

})

module.exports = mongoose.model('balance_bank', balance_bank);