import AppError from "../utils/appError.js";
import * as WalletServices from "../services/walletServices.js";  
import Wallet from "../models/Wallet.js";


/**
 * Sets up a new wallet.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function in the middleware chain.
 * @returns {Promise<void>} A promise resolving to the created wallet object.
 * @throws {AppError} Throws an error if the wallet could not be created.
 */
export const setUpWallet = async (req,res,next) => {
    try {
        const {name,balance} = req.body;
        const wallet = await WalletServices.createWallet(name,balance);
        res.status(200).json(wallet);
    } catch (error) {
        next(error)
    }
}

/**
 * Gets a wallet by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function in the middleware chain.
 * @returns {Promise<void>} A promise resolving to the wallet object.
 * @throws {AppError} Throws an error if the wallet is not found.
 */
export const getWallet = async (req,res,next) => {
    try {
        const wallet = await Wallet.findById(req.params.id);
        if(!wallet) throw new AppError('Wallet not found',404);
        res.status(200).json({
            id:wallet._id,
            name:wallet.name,
            balance:parseFloat(wallet.balance.toString()),
            createAt:wallet.createAt
        });
    } catch (error) {
        next(error)
    }
}