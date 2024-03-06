import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/api.constants";
import TransferDB from '../model/DAOs/app.daos'
import { TransferDocument } from "../utils/types.utils";

const transferDB = TransferDB.getTransferDB();

class TransferController {
    async transferMoney(_req: Request, res: Response, next: NextFunction) {
        try {

            res.send('Hola, soy TransferMoney')
        } catch (error) {

            return next(error)
        }
    }
    async getBalance(_req: Request, res: Response, next: NextFunction) {
        try {
            res.send('Hola, soy getBalance')
        } catch (error) {

            return next(error)
        }
    }
    async getWallet(_req: Request, res: Response, next: NextFunction) {
        try {
            res.send('Hola, soy getWallet')

        } catch (error) {

            return next(error)
        }
    }
    async withdrawMoney(_req: Request, res: Response, next: NextFunction) {
        try {
            res.send('Hola, soy withdrawMoney')

        } catch (error) {

            return next(error)
        }
    }
    async getTransferHistory(_req: Request, res: Response, next: NextFunction) {
        try {
            res.send('Hola, soy getTransferHistory')

        } catch (error) {

            return next(error)
        }
    }
    async depositMoney(req: Request, res: Response, next: NextFunction) {
        try {
            const { sender, recipient, amount } = req.body;
            const transferData: TransferDocument = {
                sender: sender.toString(),
                recipient: recipient.toString(),
                amount: amount,
                status: 'pending',
                createdAt: new Date(),
                updateAt: new Date()
            }
            const transferID = await transferDB.save(transferData)
            console.log(transferID)
            res.status(HTTP_STATUS.OK).json({ message: 'Deposit successfully' })

        } catch (error) {
            return next(error)
        }
    }
}

export default new TransferController();