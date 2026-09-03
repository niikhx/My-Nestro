import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_mode: {
      type: Number,
      enum: [0, 1],
      required: true,
      // 0: Prepaid, 1: Pay on delivery
    },
    razorpay_order_id: {
      type: String,
      default: null,
    },
    razorpay_transaction_id: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    payment_status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
      // 0: Pending, 1: Done,2: failed, 3: refunded
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
