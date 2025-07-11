import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userName:{
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    },
})

const User = mongoose.model("User", UserSchema);
export default User;