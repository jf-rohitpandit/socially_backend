const loginSchema = {
    type: "object",
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            minLength: 6
        }
    },
    required: ['email', 'password'],
    additionalProperties: false
}


const signupSchema = {
    type : 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string',
            minLength: 6,
        },
        confirmPassword: {
            type: 'string',
            minLength: 6
        }
    },
    required: ['email', 'password','confirmPassword'],
    additionalProperties: false
}


module.exports = {
    loginSchema, 
    signupSchema
}