import { UserDocument } from "./types.utils";

export const createUserResponse = (user: UserDocument) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}