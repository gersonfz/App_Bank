import mongoose, { Schema } from "mongoose";
import { TransferDocument } from "../../../utils/types.utils";

export default class TransferContainer {
    #model;

    constructor(collection: string, transferSchema: Schema) {
        this.#model = mongoose.model<TransferDocument>(collection, transferSchema);
    }

    async getTransferById(transferId: string) {
        return await this.#model.findById(transferId);
    }

    async getTransfersBySender(senderId: string) {
        return await this.#model.find({ sender: senderId });
    }

    async getTransfersByRecipient(recipientId: string) {
        return await this.#model.find({ recipient: recipientId });
    }
}