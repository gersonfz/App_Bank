import { UserDocument } from "./types.utils";

export const createUserResponse = (user: UserDocument) => {
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};
