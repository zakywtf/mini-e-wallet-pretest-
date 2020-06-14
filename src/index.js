import xpress from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { connectDb } from './config/db';

import signup from './controller/signup'
import login from './controller/login';

let app = xpress()
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  var message = 'Hello World!'
  res.send(message);
})


app.use('/auth/signup', signup)
app.use('/auth/login', login)

connectDb().then(async () => {
    app.listen(process.env.PORT, '127.0.0.1', () =>
      console.log(`Server connet on port ${process.env.PORT}`),
    );
});