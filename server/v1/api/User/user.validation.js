import joi from 'joi';

const userSchemaValidation = joi.object({
    name: joi.string().min(5).max(10).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(5).trim(true).required(),
    phoneNumber: joi.string().length(10).pattern(new RegExp(/^[0-9]+$/)).required(),
})

export default userSchemaValidation