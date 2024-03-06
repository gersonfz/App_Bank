import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document, Schema } from "mongoose";

export interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;   
    address: Address;
    dateOfBirth: Date; 
    phoneNumber: string;
    
};

export interface EnvConfig {
    MONGO_URI: string;
    PORT: number;
    JWT_SECRET: string;
    SESSION_KEY: string;
};

export interface Payload {
    id: mongoose.Types.ObjectId;
};

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address: Address;
    balance: number;
    
    createdAt: Date;
    updatedAt: Date;
};


interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}


export interface TransferDocument {
    sender: Schema.Types.ObjectId;
    recipient: Schema.Types.ObjectId;
    amount: number;
    status: string;
    createdAt: Date;
    updateAt: Date;
}


export interface CustomRequest extends Request {
    user?: JwtPayload | null;
}; 