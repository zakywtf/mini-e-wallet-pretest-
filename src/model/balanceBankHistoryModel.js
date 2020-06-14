import Models from '../classes/classModel';
import balance_bank_history from '../schema/balance_bank_history';

class balanceBankHistoryModel extends Models{
    constructor(){
        super(balance_bank_history)
    }

}

module.exports=balanceBankHistoryModel