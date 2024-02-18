import User from "../user.schema";
import UserContainer from "./user/user.container";

const collection = 'user';

class UserMongoDB extends UserContainer {
    constructor(){ 
        super(collection, User)
    }
};

export default UserMongoDB;