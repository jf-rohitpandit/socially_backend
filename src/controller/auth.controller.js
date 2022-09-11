const Ajv = require('ajv');
const addFormats = require('ajv-formats')
const { loginSchema, signupSchema } = require('../model/auth');
const { createUser }= require('../services/auth.service')

const ajv = new Ajv();
addFormats(ajv);
const loginValidator = ajv.compile(loginSchema);
const signupValidator = ajv.compile(signupSchema);


const loginController = async (req, res) => {
    let {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Email and Password are required!', body:[]})
    }
    
}

const signupController =  async (req, res)=>{

    const valid = signupValidator(req.body);
    if(!valid){
        return res.status(400).json({message: signupValidator.errors[0].message, body:[]})
    }

    const {password, confirmPassword, email} = req.body;

    if(password != confirmPassword){
        return res.status(401).json({message: 'Passwords did not match', body: []})
    }


    let {body, message, status} =  await createUser(email, password);
    return res.status(status).json({message, body})

}

module.exports = {
    loginController,
    signupController
}