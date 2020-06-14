import Models from '../classes/classModel';
import balance_bank_history from '../schema/balance_bank_history';

class balanceBankHistoryModel extends Models{
    constructor(){
        super(balance_bank_history)
    }

    async saveHistory(obj){
        const {balance_bank_id, balance_before, balance_after, activity, tipe, ip, location, user_agent, author}=obj
        var history = await this.model.create({
            balance_bank_id,
            balance_before,
            balance_after,
            activity,
            tipe,
            ip,
            location,
            user_agent,
            author
        })
        // console.log({history});
        
        return history
    }
}

module.exports=balanceBankHistoryModel