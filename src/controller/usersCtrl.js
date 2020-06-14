import {controller} from '../classes/classController';
import m from '../model/userModel'
import {processTopup} from '../lib/masterCache';
import  handleRequest  from "../lib/ctrlHandler";

let model = new m()
let rtr = controller(model)

rtr.post('/topup/:bankId',(req,res)=>{
    handleRequest(req, res, async (body)=>{
        model.setUdata()
        const userId=res.locals.udata.payload.id
        const {bankId}=req.params
        var ip = '114.79.47.189';
        
        return await processTopup(bankId, body.topup, body.tipe, ip, req.useragent, userId)
    });
})

module.exports = rtr