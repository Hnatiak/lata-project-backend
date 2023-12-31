// require('dotenv').config();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")
// const {User} = require('../models/user');
// const { HttpError, ctrlWrapper } = require("../helpers");
// const { nanoid } = require('nanoid');
// // const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env

// // const register = async(req, res) => {
// //     const {email, password} = req.body;
// //     const user = await User.findOne({email});

// //     if(user) {
// //         throw HttpError(409, "Email in use")
// //     }

// //     const hashPassword = await bcrypt.hash(password, 10);

// //     const newUser = await User.create({...req.body, password: hashPassword});

// //     res.status(201).json({
// //         name: newUser.name,
// //         email: newUser.email,
// //     })
// // }

// const register = async(req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({email})
//     if(user) {
//         throw HttpError(409, "Email already exists / Такий емейл уже існує")
//     } 
//     const hashPassword = await bcrypt.hash(password, 10)
//     const newUser = await User.create({...req.body, password: hashPassword, token: ""});

//     // console.log("SECRET_KEY: ", process.env.SECRET_KEY);
//     const token = jwt.sign({ id: newUser._id }, process.env.REFRESH_SECRET_KEY, { expiresIn: "23h" });

//     newUser.token = token; // Assign the generated token to the user's token field
//     await newUser.save();
//     // await User.findByIdAndUpdate(id, { token });
//     res.status(201).json({
//         token,
//         user: {
//             email: newUser.email,
//             name: newUser.name,
//         }
//     })
// }

// const login = async(req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({email})

//     if(!user) {
//         throw HttpError(401, "Email or password invalid/ Такого емейлу або паролю не існує")
//     } 

//     const passwordCompare = await bcrypt.compare(password, user.password)

//     if(!passwordCompare) {
//         throw HttpError(401, "Email or password invalid/ Такого емейлу або паролю не існує")
//     }

//     const payload = {
//         id: user._id,
//     }

//     const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: "2m"});
//     const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: "7d"});
//     await User.findByIdAndUpdate(user._id, {accessToken, refreshToken});

//     res.json({
//         accessToken,
//         refreshToken,
//         user: {
//             name: user.name,
//             email: user.email,
//         },
//     })
// }

// const refresh = async(req, res) => {
//     const {refreshToken: token} = req.body;

//     try {
//         const {id} = jwt.verify(token, process.env.REFRESH_SECRET_KEY)
//         const isExit = await User.findOne({ refreshToken: token });

//         if (!isExit) {
//             throw HttpError(403, "Token invalid")
//         }

//         const payload = {
//             id,
//         }
    
//         const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: "2m" });
//         const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d" });

//         res.json({
//             accessToken,
//             refreshToken,
//         })
//     } catch (error) {
//         throw HttpError(403, error.message)
//     }
// }

// const getCurrent = async(req, res) => {
//     const {email, name} = req.user;

//     res.json({
//         email,
//         name,
//     })
// }

// const logout = async(req, res) => {
//     const {_id} = req.user;
//     await User.findByIdAndUpdate(_id, {accessToken: "", refreshToken: "", token: "" });

//     res.json({
//         message: "Logout success / Ви успішно вийшли"
//     })
// }

// // const logout = async (req, res) => {
// //     const { _id } = req.user;
// //     await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
// //     res.status(204).json();
// // };

// // const googleAuth = async (req, res) => {
// //     const { _id: id, name } = req.user;
// //     const payload = {
// //       id,
// //     };
  
// //     const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
// //       expiresIn: "2m",
// //     });
// //     const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
// //       expiresIn: "7d",
// //     });
// //     await User.findByIdAndUpdate(id, { accessToken, refreshToken });

// //     res.redirect(
// //       `https://hnatiak.github.io/lata-project-frontend/?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${encodeURIComponent(name)}`
// //     );
// //   };
// const googleAuth = async (req, res) => {
//     const { _id: id } = req.user;
//     const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET_KEY, {
//         expiresIn: "2m",
//     });
//     const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_KEY, {
//         expiresIn: "7d",
//     });
//     await User.findByIdAndUpdate(id, { accessToken, refreshToken });

//     res.redirect(
//         // `https://hnatiak.github.io/lata-project-frontend/?accessToken=${accessToken}&refreshToken=${refreshToken}`
//         `http://localhost:3000/lata-project-frontend/?accessToken=${accessToken}&refreshToken=${refreshToken}`
//     );
// };

// module.exports = {
//     register: ctrlWrapper(register),
//     login: ctrlWrapper(login),
//     refresh: ctrlWrapper(refresh),
//     getCurrent: ctrlWrapper(getCurrent),
//     logout: ctrlWrapper(logout),
//     googleAuth: ctrlWrapper(googleAuth)
// }



require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {User} = require('../models/user');
const { HttpError, ctrlWrapper } = require("../helpers");

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

    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
        },
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

// const googleAuth = async (req, res) => {
//     const { _id: id, name } = req.user;
//     const payload = {
//       id,
//     };
  
//     const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
//       expiresIn: "2m",
//     });
//     const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
//       expiresIn: "7d",
//     });
//     await User.findByIdAndUpdate(id, { accessToken, refreshToken });

//     res.redirect(
//       `https://hnatiak.github.io/lata-project-frontend/?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${encodeURIComponent(name)}`
//     );
//   };
// const googleAuth = async (req, res) => {
//     const { _id: id } = req.user;
//     const accessToken = jwt.sign({ id }, process.env.ACCESS_SECRET_KEY, {
//         expiresIn: "2m",
//     });
//     const refreshToken = jwt.sign({ id }, process.env.REFRESH_SECRET_KEY, {
//         expiresIn: "7d",
//     });
//     await User.findByIdAndUpdate(id, { accessToken, refreshToken });

//     res.redirect(
//         // `https://hnatiak.github.io/lata-project-frontend/?accessToken=${accessToken}&refreshToken=${refreshToken}`
//         `http://localhost:3000/lata-project-frontend/?accessToken=${accessToken}&refreshToken=${refreshToken}`
//     );
// };

const googleAuth = async (req, res) => {
    const { _id: id } = req.user;
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, { token });

    res.redirect(
        `http://localhost:3000/lata-project-frontend/?accessToken=${token}`
    );
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    googleAuth: ctrlWrapper(googleAuth)
}