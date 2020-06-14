import Models from '../classes/classModel';
import user_balance_history from '../schema/user_balance_history';

class userBalanceHistoryModel extends Models{
    constructor(){
        super(user_balance_history)
    }

}

module.exports=userBalanceHistoryModel