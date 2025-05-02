import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  walletId:{
    type:Schema.Types.ObjectId,
    ref:'Wallet',
    required:[true,'Wallet id is required']
  },
  amount:{
    type:Schema.Types.Decimal128,
    required:[true,'Amount is required'],
  },
  balance: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'Balance is required']
  },
  description: {
    type: String,
    required: [true, 'Transaction description is required']
  },
  type:{
    type:String,
    enum:['CREDIT','DEBIT'],
    required:[true,'Transaction type is required']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Transaction',transactionSchema)