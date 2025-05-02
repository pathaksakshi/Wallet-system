import Transaction from "../models/Transactional.js";


/**
 * Retrieves a list of transactions for a specified wallet.
 * 
 * @param {string} walletId - The ID of the wallet to retrieve transactions for.
 * @param {number} [skip=0] - The number of transactions to skip.
 * @param {number} [limit=10] - The maximum number of transactions to retrieve.
 * 
 * @returns {Promise<Object[]>} A promise resolving to an array of transaction objects, each containing the transaction ID, wallet ID, amount, balance, description, type, and date.
 * 
 * @throws {Error} Throws an error if the transactions cannot be retrieved.
 */
export const getTransactions = async (walletId,skip =0,limit =10) => {
    const transactions = await Transaction.find({walletId:walletId}).sort().skip(skip).limit(limit).lean();
return transactions.map((i)=>({
    id:i._id,
    walletId: i.walletId,
    amount: parseFloat(i.amount.toString()),
    balance: parseFloat(i.balance.toString()),
    description: i.description,
    type: i.type,
    date: i.date
}));
}