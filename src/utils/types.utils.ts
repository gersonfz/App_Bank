import mongoose from "mongoose";

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