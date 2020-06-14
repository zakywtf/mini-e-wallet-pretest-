let mongoose = require('mongoose')
let Schema = mongoose.Schema
const balance_bank_history = mongoose.Schema({
    balanc_bank_id:{type: Schema.Types.ObjectId, autopopulate:true, ref:'balance_bank'},
    balance_before: { type: Number, default:0},
    balance_after: {type:Number, default:0},
    activity:String,
    tipe:{type:String, enum:['credit', 'debit']},
    ip:String,
    location:String,
    user_agent:String,
    author:String
})
balance_bank_history.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('balance_bank_history',balance_bank_history);