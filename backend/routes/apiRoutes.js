import express from "express";
import {
    setUpWallet,
    getWallet
} from "../controllers/walletController.js";
import { validateGetTransactions, validateTransaction, validateWalletParams, validateWalletSetup } from "../middlewares/validateRequest.js";
import { createTransaction, getTransactions } from "../controllers/transactionController.js";


const router = express.Router();

router.post('/setup',validateWalletSetup,setUpWallet);
router.get('/wallet/:id',validateWalletParams,getWallet);
router.post('/transactions/:walletId',validateTransaction,createTransaction);
router.get('/transactions',validateGetTransactions,getTransactions);

export default router;