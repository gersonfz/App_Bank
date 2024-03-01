import mongoose, { Model, Schema } from "mongoose";
import { RegistrationData, UserDocument } from "../../../utils/types.utils";

export default class UserContainer {
    private model: Model<UserDocument>;

    constructor(collection: string, userSchema: Schema) {
        this.model = mongoose.model<UserDocument>(collection, userSchema);
    }

    async register(item: RegistrationData) {
        const newUser = new this.model(item);
        return await newUser.save();
    }

    async login(email: string) {
        const userFound = await this.model.findOne({ email }).select('+password');
        return userFound;
    }

    async userById(_id: string) {
        const userFound = await this.model.findById(_id);
        return userFound;
    }
    async findByEmail(email: string) {
        return await this.model.findOne({ email });
    }
}