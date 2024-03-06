import mongoose, { Schema } from "mongoose";
import { TransferDocument } from "../../../utils/types.utils";
import UserDB from '../app.daos';


export default class TransferContainer {
    #model;
    constructor(collection: string, transferSchema: Schema) {
        this.#model = mongoose.model<TransferDocument>(collection, transferSchema);
    }

    async save(transfer: TransferDocument) {
        const { sender, recipient, amount } = transfer;
        const userDB = UserDB.getUserDB();
        const senderId: string = sender.toString();
        const senderUser = await userDB.userById(senderId);
        if (senderUser) {
            const recipientId: string = recipient.toString();            
            const recipientUser = await userDB.userById(recipientId);
            console.log(recipientUser);
            
            senderUser.balance -= amount;
            if (recipientUser) {
                console.log('hola');
                recipientUser.balance += amount;
                await recipientUser.save();
                await senderUser.save();
                transfer.status = 'success';
                return await this.#model.create(transfer);
            }
        } else {
            transfer.status = 'failed';
            throw new Error('Sender not found');
        }
        return;
    }

    async getTransferById(transferId: string) {
        console.log('hola');

        return await this.#model.findById(transferId);
    }

    async getTransfersBySender(senderId: string) {
        return await this.#model.find({ sender: senderId });
    }

    async getTransfersByRecipient(recipientId: string) {
        return await this.#model.find({ recipient: recipientId });
    }
}