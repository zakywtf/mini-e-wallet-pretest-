import Models from '../classes/classModel';
import user_balance from '../schema/user_balance';

class userBalanceModel extends Models{
    constructor(){
        super(user_balance)
    }

}

module.exports=userBalanceModel