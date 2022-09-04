const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const PORT  = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    return res.status(200).json({message:"welcome", body:[]})
})


app.listen(PORT, ()=>{
    console.log("app listening at port: ", PORT)
})

