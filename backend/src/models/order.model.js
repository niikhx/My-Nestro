import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product_details: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      pincode: { type: String, required: true },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, default: "India" }
    },
    payment_mode: {
      type: Number,
      enum: [0, 1],
      default: 0,
      // 0: Prepaid, 1: Postpaid
    },
    razorpay_order_id: {
      type: String,
      default: null
    },
    razorpay_transaction_id: {
      type: String,
      default: null
    },
    total_amount: {
      type: Number,
      required: true,
    },
    order_status: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      default: 0,
      // 0: Placed, 1: Packed, 2: Dispatched, 3: Shipped, 4: At your nearest store,
      // 5: out of delivery, 6: delivered, 7: return initiated, 8: returned, 9: refunded
    },
    payment_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
      // 0: pending, 1: done
    },
    idempotency_key: {
      type: String,
      required: true,
      unique: true
    },
    order_logs: [
      {
        status: Number,
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.index(
  {
    user_id: 1,
    idempotency_key: 1,
  },
  {
    unique: true,
  },
)


// Order document ko save karne se pehle ye function chalega
// orderSchema.pre("save", function (next) {

//   // Check karta hai ki "order_status" ki value change hui hai ya nahi
//   if (this.isModified("order_status")) {

//     // Agar order_status change hua hai,
//     // to order_logs array me ek naya log add karo
//     this.order_logs.push({

//       // Current order ka status log me save karo
//       status: this.order_status,

//       // Status change hone ka message banao
//       // ${this.order_status} ki jagah current status ki value aa jayegi
//       message: `Order status changed to ${this.order_status}`,
//     });
//   }

//   // Middleware ka kaam complete hone ke baad
//   // next() Mongoose ko batata hai ki ab next step par jao
//   next();
// });

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;