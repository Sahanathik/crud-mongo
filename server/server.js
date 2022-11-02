import express from 'express';
import dotenv from 'dotenv';
import v1 from './v1/index.js';
import bodyParser from 'body-parser';


dotenv.config()

const app = express();

app.use(express.static('uploads/products'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/v1', v1)

let port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})


