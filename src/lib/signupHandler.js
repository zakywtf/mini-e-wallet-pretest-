import bcrypt from 'bcryptjs'
import users from '../schema/users'

const signup = async(body) => {
    const {username, password} = body
    body.password = bcrypt.hashSync(username+password+process.env.SALT, 10);
    body.level=2
    let userData = new users(body)
    // console.log(body);
    await userData.save()
    return true
}

module.exports ={
    signup
}