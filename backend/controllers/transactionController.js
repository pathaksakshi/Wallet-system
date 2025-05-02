import AppError from "../utils/appError.js";
import * as TransactionServices from "../services/transactionServices.js";
import * as WalletService from "../services/walletServices.js";

/**
 * Creates a new transaction and updates the wallet balance accordingly.
 * 
 * @param {Object} req - The request object, containing the walletId in the params and the amount and description in the body.
 * @param {Object} res - The response object, used to return the updated wallet balance and transaction ID.
 * @param {Function} next - The next function in the middleware chain, used to pass control to the error handler.
 * 
 * @throws {AppError} Throws an error if the wallet is not found, if the transaction cannot be created, or if the balance is insufficient.
 */
export const createTransaction = async (req,res,next) => {
    try {
        const {walletId} = req.params;
        const {amount,description} = req.body;

        const result = await WalletService.updateWalletBalance(walletId,amount,description);
        res.status(200).json({
            balance: result.balance,
            transactionId: result.transactionId
          });
    } catch (error) {
        next(error)
    }
}

/**
 * Retrieves a list of transactions for a specified wallet.
 * 
 * @param {Object} req - The request object, containing query parameters for walletId, skip, and limit.
 * @param {Object} res - The response object, used to return the list of transactions.
 * @param {Function} next - The next function in the middleware chain, used to pass control to the error handler.
 * 
 * @returns {Promise<void>} A promise that resolves to a JSON response with the list of transactions.
 * 
 * @throws {AppError} Throws an error if the transaction retrieval fails.
 */
export const getTransactions = async (req,res,next) => {
    try {
        const {walletId,skip=0,limit=10} = req.query;
        const transactions = await TransactionServices.getTransactions(walletId,parseInt(skip),parseInt(limit));
        res.status(200).json(transactions);
    } catch (error) {
        next(error)
    }
}