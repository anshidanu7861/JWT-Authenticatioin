const user = require('../Models/userModel')
const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res, next)=> {
    const token = req.cookie.jwt;
    if(token) {
        jwt.verify(token, "jwt secret key", async (err, decodedToken) =>{
            if(err) {
                res.json({status: false})
                next()
            }else{
                const user = await user.findById(decodedToken.id);
                if(user) res.json({status: true, user: user.email})
                else res.json({status: false})
                next()
            }
        })
    }else{
        res.json({status: false})
    }
}