const express = require('express')
const router = express.Router();

router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Email and Password are required!', body:[]})
    }

    
    
})