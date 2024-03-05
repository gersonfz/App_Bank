import mongoose, { Schema } from "mongoose";
import { TransferDocument } from "../../../utils/types.utils";
import UserDB from '../app.daos';


export default class TransferContainer {
    #model;
    constructor(collection: string, transferSchema: Schema) {
        this.#model = mongoose.model<TransferDocument>(collection, transferSchema);
    }

    async save(transfer: TransferDocument) {
        const userDB = UserDB.getUserDB();
        const { sender, recipient, amount } = transfer;
        // Obtener el usuario remitente
        const senderId: string = sender.toString();
        const senderUser = await userDB.userById(senderId);
        if (senderUser) {
                // Obtener el usuario destinatario
                const recipientUser = await this.#model.findById(recipient);

                //  Restar el monto del balance del remitente y sumarlo al balance del destinatario                 
                senderUser.balance -= amount;
                if (recipientUser) {
                    recipientUser.balance += amount;
                    await recipientUser.save(); // Guardar cambios en el balance del destinatario
                    await senderUser.save(); // Guardar cambios en el balance del remitente
                }
                return await this.#model.create(transfer);
        } else {
            throw new Error('Usuario remitente no encontrado')
        }
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