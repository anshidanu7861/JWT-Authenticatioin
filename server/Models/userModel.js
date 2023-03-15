const mongoose = require('mongoose')
const bcript = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:[true, "Email is Required"],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    phone: {
        type: String,
        phone: [true, "Phone Number is Required"]
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcript.genSalt()
    this.password = await bcript.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcript.compare(password, user.password)
        if(auth) {
            return user;
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
}


module.exports = mongoose.model("Users", userSchema)