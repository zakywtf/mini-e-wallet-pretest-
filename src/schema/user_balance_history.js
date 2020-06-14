let mongoose = require('mongoose')
let Schema = mongoose.Schema
const user_balance_history = mongoose.Schema({
    user_balance_id:{type: Schema.Types.ObjectId, autopopulate:true, ref:'user_balance'},
    balance_before: { type: Number, default:0},
    balance_after: {type:Number, default:0},
    activity:String,
    tipe:{type:String, enum:['credit', 'debit']},
    ip:String,
    location:String,
    user_agent:String,
    author:String
})
user_balance_history.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('user_balance_history', user_balance_history);