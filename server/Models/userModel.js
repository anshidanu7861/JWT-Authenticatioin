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
});

userSchema.pre("save", async function (next) {
    const salt = await bcript.genSalt()
    this.password = await bcript.hash(this.password, salt)
})

module.exports = mongoose.model("Users", userSchema)