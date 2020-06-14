import Models from '../classes/classModel';
import users from '../schema/users';

class userModel extends Models{
    constructor(){
        super(users)
    }

    async getAll(){
        var udata = this.udata.payload
        console.log({udata:this.udata.payload});
        
        // if(udata.role != this.role)throw Error('You do not have access!')
        return await this.model.find({},this.getProjection())
    }

    getProjection(){
        return 'username level'
    }
}

module.exports=userModel