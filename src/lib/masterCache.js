import fetch from 'node-fetch';
import balanceBankModel from '../model/balanceBankModel';
import balanceBankHistoryModel from '../model/balanceBankHistoryModel';
import userBalance from '../model/userBalanceModel';
import userBalanceHistory from '../model/userBalanceHistoryModel';

const BALANCEBANKMODEL = new balanceBankModel()
const BALANCEBANKHISTORYMODEL = new balanceBankHistoryModel()
const USERBALANCE = new userBalance()
const USERBALANCEHISTORY = new userBalanceHistory()

const BALANCEBANKLIST = {}
const USERBALANCELIST = {}


const getData=async(url)=>await fetch(url).then(resp=>resp.json()).then(json=>json).catch(error=>error);

const getGeoLocation = async(ip, userAgent) => {
    try {
        return await getData(`https://ipapi.co/${ip}/json/`);
    } catch (error) {
        throw error;
    }
}

const loadBalanceBank = async() => {
    const data = await BALANCEBANKMODEL.getAll()
    await Promise.all(data.map((v)=>{
        BALANCEBANKLIST[`${v.id}`]=v._doc
    }))
}

const loadUserBalance = async() => {
    const datas = await USERBALANCE.getAll()
    await Promise.all(datas.map((v)=>{
        USERBALANCELIST[`${v._doc.user_id.id}`]={id:v.id, balance:v._doc.balance, balance_achieve:v._doc.balance_achieve}
    }))
}

const saveBalanceBank=async(id, balance)=>{
    let data = await BALANCEBANKMODEL.getById(id)
    // console.log({data});
    data.balance = balance
    data.save()
}

const updateUserBalanceTransfer=async(id, balance)=>{
    let data = await USERBALANCE.getById(id)
    // console.log({data});
    data.balance += balance
    data.save()
}

const updateUserBalanceTopup=async(userId, topup)=>{
    const user_balance = USERBALANCELIST[`${userId}`]
    if(user_balance){
        user_balance.balance += topup
        user_balance.balance_achieve += topup

        let data = await USERBALANCE.getById(user_balance.id)
        data.balance = user_balance.balance
        data.balance_achieve = user_balance.balance_achieve
        data.save()
    }

}

const processTopup=async(bankId, topup, tipe, ip, user_agent, userId)=>{
    const bank = BALANCEBANKLIST[`${bankId}`]

    if(bank){
        const min = topup * -1
        const balance_before = bank.balance
        bank.balance += min
        const balance_after = bank.balance
        const activity = "Topup"
        const location = await getGeoLocation(ip)

        await saveBalanceBank(bankId, bank.balance)
        await updateUserBalanceTopup(userId, topup)
        return await BALANCEBANKHISTORYMODEL.saveHistory(bankId, balance_before, balance_after, activity, tipe, ip, location.city, user_agent.source, user_agent.platform)
    }
}

const processTransfer=async(userId, transfer, tipe, ip, user_agent)=>{
    const user_balance = USERBALANCELIST[`${userId}`]

    if(user_balance){
        const min = transfer * -1
        const balance_before = user_balance.balance
        user_balance.balance += min
        const balance_after = user_balance.balance
        const activity = "Transfer"
        const location = await getGeoLocation(ip)
        const balanceId = user_balance.id

        await updateUserBalanceTransfer(balanceId, min)
        return await USERBALANCEHISTORY.saveHistory(balanceId, balance_before, balance_after, activity, tipe, ip, location.city, user_agent.source, user_agent.platform)
    }
}

console.log({BALANCEBANKLIST, USERBALANCELIST});


module.exports={
    loadBalanceBank,
    loadUserBalance,
    processTopup,
    processTransfer
}