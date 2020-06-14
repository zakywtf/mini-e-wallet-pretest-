import {Router} from 'express'
import handleRequest from '../lib/ctrlHandler'
import {sign} from '../lib/signer';
import useragent from 'express-useragent';

let router = Router()
router.use(useragent.express());

router.route('/')
    .post(
        async (req,res) =>{
            handleRequest(req,res,async(body)=>{
                // console.log({agent:req.useragent});
                return await sign(body,req.useragent)
            })
        }
    )

module.exports=router