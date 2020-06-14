import balanceBankModel from '../model/balanceBankModel';
import userBalance from '../model/userBalanceModel';

const BALANCEBANKMODEL = new balanceBankModel()
const USERBALANCE = new userBalance()

const BALANCEBANKLIST = {}
const USERBALANCELIST = {}

const loadBalanceBank = async() => {
    const data = await BALANCEBANKMODEL.getAll()
    await Promise.all(data.map((v)=>{
        console.log({v});
        BALANCEBANKLIST[`${v.id}`]=v._doc
    }))
}

const loadUserBalance = async() => {
    const data = await USERBALANCE.getAll()
    await Promise.all(data.map((v)=>{
        console.log({v});
        USERBALANCELIST[`${v.id}`]=v._doc
    }))
}

console.log({BALANCEBANKLIST, USERBALANCE});


module.exports={
    loadBalanceBank,
    loadUserBalance
}