require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { User } = require('../models/user');
const { HttpError, ctrlWrapper } = require("../helpers");
// const {SECRET_KEY} = process.env;


const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(user) {
        throw HttpError(409, "Email already exists / Такий емейл уже існує")
    } 
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({...req.body, password: hashPassword, token: ""});

    console.log("SECRET_KEY: ", process.env.SECRET_KEY);
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "23h" });

    newUser.token = token; // Assign the generated token to the user's token field

    await newUser.save();

    // await User.findByIdAndUpdate(id, { token });

    res.status(201).json({
        token,
        user: {
            email: newUser.email,
            name: newUser.name,
        }
    })
}

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})

    if(!user) {
        throw HttpError(401, "Email or password invalid/ Такого емейлу або паролю не існує")
    } 

    const passwordCompare = await bcrypt.compare(password, user.password)

    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid/ Такого емейлу або паролю не існує")
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
}

const getCurrent = async(req, res) => {
    const {email, name} = req.user;

    res.json({
        email, 
        name,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success / Ви успішно вийшли"
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}