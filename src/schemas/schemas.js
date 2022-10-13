import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().required()
});

export { signUpSchema };