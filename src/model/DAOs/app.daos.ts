import UserContainer from './user/user.container';
import TransferContainer from './transfer/transfer.container';
import UserSchema from '../schema/user.schema';
import transferSchema from '../schema/transfer.schema';

class AppDAOs {
    private userDB: UserContainer;
    private transferDB: TransferContainer;

    private userCollection = 'user';
    private transferCollection = 'transfer';
    constructor() {
        this.userDB = new UserContainer(this.userCollection, UserSchema);
        this.transferDB = new TransferContainer(this.transferCollection, transferSchema);
    }

    getUserDB(): UserContainer {
        return this.userDB;
    }

    getTransferDB(): TransferContainer {
        return this.transferDB;
    }
}

export default new AppDAOs();
