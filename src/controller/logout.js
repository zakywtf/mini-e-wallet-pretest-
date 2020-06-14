import {Router} from 'express'
import {decode, deleteSession} from '../lib/sessionHandler';
import handleRequest from '../lib/ctrlHandler'

let router = Router()

router.route('/')
    .post(
        async (req,res) =>{
            handleRequest(req,res,async(body)=>{
                var dc = await decode(req.headers['token'])
                var udata = dc.payload.payload
                return await deleteSession(udata)
            })
        }
    )

module.exports=router