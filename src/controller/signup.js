import {Router} from 'express'
import {signup} from '../lib/signupHandler';
import handleRequest from '../lib/ctrlHandler'

let router = Router()

router.route('/')
    .post(
        async (req,res) =>{
            handleRequest(req,res,async(body)=>{
                return await signup(body)
            })
        }
    )

module.exports=router