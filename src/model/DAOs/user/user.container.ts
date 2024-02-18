import mongoose, { Schema } from "mongoose";
import { RegistrationData } from "../../../utils/types.utils";


class UserContainer {

    #model;
    constructor(collection:string, userSchema:Schema) {
        this.#model = mongoose.model(collection, userSchema)
    };
    async register(item: RegistrationData) {
        const newDocument = new this.#model(item);
        return await newDocument.save();
    }

}

export default UserContainer;