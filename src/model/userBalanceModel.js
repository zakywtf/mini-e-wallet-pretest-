import Models from '../classes/classModel';
import user_balance from '../schema/user_balance';

class userBalanceModel extends Models{
    constructor(){
        super(user_balance)
    }

    async saveInitBalance(user_id){
        const doc = await this.model.create({
            user_id
        })
        await doc.save()
        return doc;
    }

}

module.exports=userBalanceModel