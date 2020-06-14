import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import useragent from 'express-useragent';

import {loadBalanceBank, loadUserBalance} from './lib/masterCache';

import { connectDb } from './config/db';
import authMiddleware from './lib/jwtAuthMiddleware';

import signup from './controller/signup'
import login from './controller/login';
import logout from './controller/logout';
import balanceBank from './controller/balanceBankCtrl';
import users from './controller/usersCtrl';

let app = express()
dotenv.config()
app.use(useragent.express());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  var message = 'Hello World!'
  res.send(message);
})


app.use('/auth/signup', signup)
app.use('/auth/login', login)
app.use('/auth/logout', logout)

app.use('/api/v1/', authMiddleware)
app.use('/api/v1/balance_bank', balanceBank)
app.use('/api/v1/users', users)


connectDb().then(async () => {
    app.listen(process.env.PORT, '127.0.0.1',loadBalanceBank(), loadUserBalance(), () =>
      console.log(`Server connet on port ${process.env.PORT}`),
    );
});