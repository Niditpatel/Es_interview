const mongoose = require('mongoose');

const Joi = require('joi');
const jwt = require('jsonwebtoken');

require('dotenv').config({path:'config.env'})

// user schema 
const UserSchema = new mongoose.Schema({
    name:{type :String, required: true},
    email:{type :String, required: true, unique: true},
    password:{type :String, required: true},
},{timestamps: true});

// validate user
function validateUser(user) {

        const JoiSchema = Joi.object({
            name: Joi.string().min(2).required(),
            email:Joi.string().email().required(),
            password:Joi.string().required().min(4)
        });

        return JoiSchema.validateAsync(user);
}

// generate validatation token
UserSchema.methods.generateVarificationToken = function(){
    user = this;
    const verificationToken = jwt.sign({
        id:user?.id?.valueOf()
    },process.env.SERECT_KEY,{algorithm:'HS256'}
);

return verificationToken;
}


//model 
const User = mongoose.model('user',UserSchema);

module.exports = {User,validateUser};