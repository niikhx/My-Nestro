import crypto from "crypto";
import razorpay_instance from "../config/razorpay.js";
import CartModel from "../models/cart.model.js";
import OrderModel from "../models/order.model.js";
import TransactionModel from "../models/transaction.model.js";
import {
  sendCreated,
  sendNotFound,
  sendServerError,
  sendSuccess,
  sendBadRequest,
} from "../utils/response.js";

const create = async (req, res) => {
  try {
    const { address, payment_mode, total_amount } = req.body;
    const user_id = req.user._id;
    const idempotency_key = req.idempotencyKey
    // if (!user_id ||  !address || !total_amount) {
    // return sendBadRequest(res, "Missing required fields");
    // }

    const cart_data = await CartModel.find({ user_id }).populate(
      "product_id",
      "salePrice"
    )
    console.log(cart_data)

    const product_details = cart_data.map((cd) => {
      return {
        product_id: cd.product_id._id,
        price: cd.product_id.salePrice,
        quantity: cd.quantity
      }
    })

    const new_order = await OrderModel({
      user_id,
      address,
      payment_mode: payment_mode || 0,
      total_amount,
      product_details,
      idempotency_key
    });
    await new_order.save();

    if (payment_mode == 1) {//postpaid
      await CartModel.deleteMany({ user_id });
      res.send({
        message: "Order Placed SuccessFully",
        status: true,
        order_id: new_order._id,
      })
    } else {// prepaid
      const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: "order no: " + new_order._id
      }
      const razorpay_response =
        await razorpay_instance.orders.create(options);
      new_order.razorpay_order_id = razorpay_response.id;
      await new_order.save()
      res.send({
        razorpay_order_id: razorpay_response.id,
        order_id: new_order._id,
        status: true
      })
    }
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
};

const read = async (req, res) => {
  try {
    const query = req.query;
    const page = query.page || 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const skip = limit * (page - 1);

    const orders = await OrderModel.find()
      .skip(skip)
      .limit(limit)
      .populate("user_id", "name email phone")
      .populate("product_details.product_id", "name price thumbnail")
      .sort({ createdAt: -1 });

    const total = await OrderModel.countDocuments();

    return sendSuccess(res, {
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
};

const readById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id)
      .populate("user_id", "name email phone")
      .populate("product_details.product_id", "name price thumbnail");

    if (!order) {
      return sendNotFound(res, "Order not found");
    }

    return sendSuccess(res, { order });
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, remarks } = req.body;

    if (order_status === undefined) {
      return sendBadRequest(res, "order_status is required");
    }

    if (order_status < 0 || order_status > 9) {
      return sendBadRequest(res, "Invalid order_status");
    }

    const order = await OrderModel.findById(id);

    if (!order) {
      return sendNotFound(res, "Order not found");
    }

    order.order_status = order_status;
    order.order_logs.push({
      status: order_status,
      timestamp: new Date(),
      remarks: remarks || "",
    });

    await order.save();

    return sendSuccess(res, { order }, "Order status updated successfully");
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findByIdAndDelete(id);

    if (!order) {
      return sendNotFound(res, "Order not found");
    }

    return sendSuccess(res, {}, "Order deleted successfully");
  } catch (error) {
    console.log(error);
    return sendServerError(res);
  }
};


const verifyOrder = async (req, res) => {
  try {
    const { order_id, razorpay_response } = req.body;
    const user_id = req.user._id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = razorpay_response;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      const order = await OrderModel.findOne({ _id: order_id });

      order.razorpay_transaction_id = razorpay_payment_id;
      order.payment_status = 1;

      await order.save();

      const transsction = new TransactionModel({
        order_id: order._id,
        user_id,
        amount: order.total_amount,
        payment_mode: 0,
        payment_status: 1,
        razorpay_transaction_id: razorpay_payment_id,
      });

      await transsction.save();

      await CartModel.deleteMany({ user_id });

      return res.send({
        message: "Payment verified successfully",
        status: true,
        order_id: order._id,
      });
    } else {
      res.status(400).json({
        message: "Payment Verification Failed",
        status: false
      })
    }
  } catch (error) {
    return sendServerError(res);
  }
};



export { create, read, readById, updateStatus, deleteOrder, verifyOrder }