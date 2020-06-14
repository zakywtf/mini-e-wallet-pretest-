import jwt from 'jsonwebtoken'

const validateToken = async (req, res, next) => {
    const token = req.headers.token
    if (!token)
        return res.status(404).send({ error: 500, message: 'No token provided.' });
        try{
            res.locals.udata = jwt.verify(token,process.env.SECRET_KEY,{algorithms:"HS256"})
            
            next()
        } catch(err){
            return res.status(404).send({ error: 500, message: "Token Invalid" });
        }
}

module.exports = validateToken