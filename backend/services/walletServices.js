import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transactional.js";
import Decimal from "decimal.js";
import AppError from "../utils/appError.js";

const parseDecimal = value => parseFloat(value.toString());
 
/**
 * Creates a new wallet and initializes its balance with the specified amount.
 * @param {string} name The name of the wallet.
 * @param {number} balance The initial balance of the wallet.
 * @returns {Promise<Object>} The newly created wallet containing its id, name, balance and date.
 * @throws {AppError} Throws an error if the wallet could not be created.
 */
export const createWallet = async (name,balance) => {
    const session = await Wallet.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet.create([{name,balance}],{session});
        
        await Transaction.create([{
            walletId:wallet[0]._id,
            amount:new Decimal(balance),
            balance:new Decimal(balance),
            description:'Initial setup balance',
            type:'CREDIT',
        }],{session})
        await session.commitTransaction();

        return  {
            id:wallet[0]._id,
            name:wallet[0].name,
            balance:parseDecimal(wallet[0].balance),
            date:wallet[0].date
        }
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally{
        session.endSession();
    }
}

/**
 * Updates the balance of an existing wallet and records the transaction.
 * @param {string} walletId - The ID of the wallet to update.
 * @param {number} amount - The amount to adjust the wallet balance by. Positive for credit, negative for debit.
 * @param {string} description - A description of the transaction.
 * @returns {Promise<Object>} An object containing the updated balance and transaction ID.
 * @throws {AppError} Throws an error if the wallet is not found or if the resulting balance is insufficient.
 */

export const updateWalletBalance = async (walletId,amount,description) => {
    const session = await Wallet.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet.findById(walletId).session(session);
        if(!wallet) throw new AppError('Wallet not found',404);

        const currentBalance = new Decimal(wallet.balance.toString());
        const newBalance = currentBalance.plus(amount);
        if (newBalance.lessThan(0)) {
            throw new AppError('Insufficient balance', 400);
        }

        wallet.balance = newBalance.toFixed(4);
        await wallet.save({session});

        const transaction = await Transaction.create([{
            walletId:walletId,
            amount,
            balance:newBalance,
            description,
            type: amount >= 0 ? 'CREDIT' : 'DEBIT',
        }],{session});
        await session.commitTransaction();

        return {
        balance: parseDecimal(newBalance),
        transactionId: transaction[0]._id
        }
      
    } catch (error) {
        session.abortTransaction();
        throw error;
    }finally{
        session.endSession();
    }
    
}