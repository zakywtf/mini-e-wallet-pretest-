let mongoose = require('mongoose')

const user_balance = mongoose.Schema({
    user_id:{type: Schema.Types.ObjectId, autopopulate:{ select: 'username level' }, ref:'users'},
    balance: { type: Number, default:0},
    balance_achieve: {type:Number, default:0}
})

module.exports = mongoose.model('user_balance', user_balance);