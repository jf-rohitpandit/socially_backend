const jwt = require("jsonwebtoken");
const {v4:uuid} = require('uuid')
const bcrypt = require('bcrypt')
const pool = require('../db')

const SALTROUND  = 10;

const createUser = async (email, password) => {
    try {

        let existingUserQuery = `select email from public."User" where email = '${email}'`;
        let existingUser = await pool.query(existingUserQuery);
        if(existingUser.rows?.length > 0){
            return {status: 409, message: "Email already registered!", body: []}
        }

        const id = uuid();
        const hashedPassword = await bcrypt.hash(password, SALTROUND);
        const createUserQuery = ` INSERT INTO public."User"
            (id, email, password)
            VALUES('${id}', '${email}', '${hashedPassword}'); `

        console.log("createUserQuery: ", createUserQuery)
        await pool.query(createUserQuery);
        let token = jwt.sign({id:id},process.env.JWT_SECRET)

        return {status: 201, message:"Signup successful", body:[token]}   
    } catch (error) {
        console.log("error in create user: ", error);
        return {status: 500, message: "Some internal error occured!", body: []}
    }
}


const loginUser = async (email, password)=>{
    try {

        let existingUserQuery = `select email, password from public."User" where email = '${email}'`;
        let existingUser = await pool.query(existingUserQuery);
        if(existingUser.rows?.length < 1){
            return {status: 400, message: "Invalid Email or password!", body: []}
        }

        existingUser = existingUser.rows[0];

        const id = uuid();
        const isPasswordSame = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordSame){
            return {status: 400, message: "Invalid Email or password!", body: []}
        }
        
        let token = jwt.sign({id:id},process.env.JWT_SECRET)

        return {status: 201, message:"Login successful", body:[token]}   
    } catch (error) {
        console.log("error in login user: ", error);
        return {status: 500, message: "Some internal error occured!", body: []}
    }
}


module.exports = {
    createUser,
    loginUser
}