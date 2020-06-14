import Models from '../classes/classModel';
import balance_bank from '../schema/balance_bank';

class balanceBankModel extends Models{
    constructor(){
        super(balance_bank)
    }

}

module.exports=balanceBankModel