import Models from '../classes/classModel';
import user_balance_history from '../schema/user_balance_history';

class userBalanceHistoryModel extends Models{
    constructor(){
        super(user_balance_history)
    }

    async saveHistory(user_balance_id, balance_before, balance_after, activity, tipe, ip, location, user_agent, author){
        var history = await this.model.create({
            user_balance_id,
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

module.exports=userBalanceHistoryModel