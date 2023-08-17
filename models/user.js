const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true, // Якщо емейл такий уже існує
        require: true,
    },
    password: {
        type: String,
        minlength: 8,
        require: true,
    },
    // accessToken: {
    //     type: String,
    // },
    // refreshToken: {
    //     type: String,
    // },
    // token: {
    //     type: String,
    //     default: "",
    // }
    token: String,
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
});
  
const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
});

// const refreshSchema = Joi.object({
//     refreshToken: Joi.string().required(),
// });

const sendHelpEmailSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required().messages({
      "string.pattern.base": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    message: Joi.string().min(10).required().messages({
      "string.min": "Please, explain your problem in more detail",
      "any.required": "Describe your problem",
    }),
});

const schemas = {
    registerSchema,
    loginSchema,
    // refreshSchema,
    sendHelpEmailSchema,
};

const User = model("user", userSchema)

module.exports = {
    User,
    schemas,
};