import { NextFunction, Request, Response } from "express";

class TransferController {
    async transferMoney (_req: Request, res: Response, next: NextFunction) {
        try {
            res.send('Hola, soy TransferMoney')
        } catch (error) {

            return next(error)
        }
    }
    async getBalance (_req: Request, res: Response, next: NextFunction) {
            try {
                res.send('Hola, soy getBalance')
            } catch (error) {

                return next(error)
            }
    }
    async getWallet (_req: Request, res: Response, next: NextFunction) {
            try {
                res.send('Hola, soy getWallet')

            } catch (error) {

                return next(error)
            }
    }
    async withdrawMoney (_req: Request, res: Response, next: NextFunction) {
            try {
                res.send('Hola, soy withdrawMoney')

            } catch (error) {

                return next(error)
            }
    }
    async getTransferHistory (_req: Request, res: Response, next: NextFunction) {
            try {
                res.send('Hola, soy getTransferHistory')

            } catch (error) {

                return next(error)
            }
    }
    async depositMoney (_req: Request, res: Response, next: NextFunction){
        try {
            res.send('Hola, soy deposit Money')
        } catch (error) {
            return next(error)
        }
    }
}

export default new TransferController();