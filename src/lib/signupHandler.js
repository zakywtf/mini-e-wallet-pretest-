import bcrypt from 'bcryptjs'
import users from '../schema/users'
import userBalanceModel from '../model/userBalanceModel';

const USERBALANCE = new userBalanceModel()

const signup = async(body) => {
    const {username, password} = body
    body.password = bcrypt.hashSync(username+password+process.env.SALT, 10);
    body.level=2
    let userData = new users(body)
    // console.log(body);
    var data = await userData.save()
    console.log({data});
    await USERBALANCE.saveInitBalance(data.id)
    return true
}

module.exports ={
    signup
}