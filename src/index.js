import xpress from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import { connectDb } from './config/db';


let app = xpress()
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
  var message = 'Hello World!'
  res.send(message);
})

connectDb().then(async () => {
    app.listen(process.env.PORT, '127.0.0.1', () =>
      console.log(`Server connet on port ${process.env.PORT}`),
    );
});