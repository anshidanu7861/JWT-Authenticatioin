const userModel = require("../Models/userModel")
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60

const createToken = (id) =>{
    return jwt.sign({id},"jwt secret key", {
        expiresIn: maxAge
    })
}

const handleErrors = (error) => {
    let errors = { email: "", password: ""}

    if(error.code === 11000) {
        errors.email = "Email is already required";
        return errors;
    }

    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.register = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.create({ email, password });
        const token = createToken(user._id);

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        });
        res.status(201).json({user: user._id, created: true})
    }catch(err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors, created: false})
    }
}
module.exports.login = async(req, res, next) => {
   
}