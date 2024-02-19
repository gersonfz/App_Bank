import mongoose, { Document } from "mongoose";

export interface RegistrationData {
    username: string;
    email: string;
    password: string;
}

export interface EnvConfig {
    MONGO_URI: string,
    PORT: number;
    JWT_SECRET: string
}

export interface Payload {
    id: mongoose.Types.ObjectId
}

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}