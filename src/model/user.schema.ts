import { Schema } from "mongoose";
import { UserDocument } from "../utils/types.utils";

const User = new Schema<UserDocument>({
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