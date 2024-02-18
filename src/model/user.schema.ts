import { Schema } from "mongoose";

const User = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: { type: String, 
        required: true, 
        select: false },
}, { 
    versionKey: false,
    timestamps:true
});

export default User;