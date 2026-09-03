import OrderModel from "../models/order.model.js";
const checkIdempotency = async (req, res, next) => {

  const key = req.header("Idempotency-Key");

  if (!key) {
    return res.status(400).json({
      success: false,
      message: "Idempotency key missing"
    });
  }

  const order = await OrderModel.findOne({
    user_id: req.user.id,
    idempotency_key: key
  });

  if (order) {
    return res.status(200).json({
      success: false,
      message: "Order already exists",
      order_id: order._id,
    });
  }

  req.idempotencyKey = key;

  next();
};


export default checkIdempotency;