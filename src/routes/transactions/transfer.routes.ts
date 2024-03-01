import { Router } from "express";
import { authRequired } from "../../middleware/validateToken.middleware";
import transferController from "../../controller/transfer.controller";

const financialRouter = Router();

financialRouter.post('/transfer', authRequired, transferController.transferMoney);
financialRouter.get('/balance', authRequired, transferController.getBalance);
financialRouter.get('/wallet', authRequired, transferController.getWallet);
financialRouter.post('/withdraw', authRequired, transferController.withdrawMoney);
financialRouter.get('/transfer-history', authRequired, transferController.getTransferHistory);
financialRouter.post('/deposit', authRequired, transferController.depositMoney);

export default financialRouter;