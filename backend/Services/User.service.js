const {User} = require('../Models/User.model');

exports.FindByEmail = async (email)=>{
    const user = await User.find({email:email});
    return user;
}

exports.FindById = async(id)=>{
    const user = await User.findById(id);
    return user;
}

exports.CreateUser = async(user)=>{
    const newUser = await new User({...user}).save();
    return newUser;
}