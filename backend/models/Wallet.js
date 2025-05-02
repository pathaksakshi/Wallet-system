import mongoose, { Schema } from "mongoose";
import Decimal from "decimal.js";

const walletSchema = new Schema({
   name:{
    type:String,
    required:[true,'Wallet name is required']
   },
   balance:{
    type:Schema.Types.Decimal128,
    required:[true,'Wallet balance is required'],
    // validate:{
    //     validator:value=> new Decimal(value.toString()).gt(0),
    //     message:'Balance must be greater than 0'
    // }
   },
   date:{type:Date,default:Date.now}
})

export default mongoose.model("Wallet", walletSchema);