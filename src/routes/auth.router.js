
const express = require('express')
const router = express.Router();

const { createUser }= require('../services/auth.service')


router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Email and Password are required!', body:[]})
    }

    
    
})

router.post('/signup', async (req, res)=>{
    let {email, password, confirmPassword} = req.body;
    if(!email || !password || !confirmPassword){
        return res.status(400).json({message: 'Email, password and confirm-password are required', body:[]})
    }

    if(password != confirmPassword){
        return res.status(401).json({message: 'Passwords did not match', body: []})
    }

    let {body, message, status} =  await createUser(email, password);
    return res.status(status).json({message, body})

})


module.exports = router;