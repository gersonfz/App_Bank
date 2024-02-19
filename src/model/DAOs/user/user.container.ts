import mongoose, { Schema } from "mongoose";
import { RegistrationData, UserDocument } from "../../../utils/types.utils";


class UserContainer {

    #model;
    constructor(collection:string, userSchema:Schema) {
        this.#model = mongoose.model<UserDocument>(collection, userSchema)
    };
    async register(item: RegistrationData) {
        const newUser = new this.#model(item);
        
        return await newUser.save();
    }
    async login(email:string) {
        const userFound = await this.#model.findOne({ email }).select('+password');        
        return userFound;
    }

}

export default UserContainer;