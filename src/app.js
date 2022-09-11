const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config()


const auth = require('./routes/auth.router')

const PORT  = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req, res)=>{
    return res.status(200).json({message:"welcome", body:[]})
})

app.use('/auth', auth)

app.listen(PORT, ()=>{
    console.log("app listening at port: ", PORT)
})

