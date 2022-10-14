import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

const urlSchema = Joi.object({
    url: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).required()
});

export { signUpSchema, loginSchema, urlSchema };