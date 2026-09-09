import CartModel from "../models/cart.model.js";
import { sendServerError } from "../utils/response.js";

const cartProjection = "name salePrice discount originalPrice thumbnail image images";

const getCart = async (req, res) => {
  try {
    const cart = await CartModel.find({ user_id: req.user._id }).populate(
      "product_id",
      cartProjection
    );

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return sendServerError(res, error);
  }
};

const syncCart = async (req, res) => {
  try {
    const { cart_item } = req.body;
    const user_id = req.user._id;

    if (!Array.isArray(cart_item)) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required",
      });
    }

    for (const cart_items of cart_item) {
      const quantity = Number(cart_items?.qty);
      if (!cart_items?.id || !Number.isInteger(quantity) || quantity < 1) continue;

      const cart = await CartModel.findOne({ user_id, product_id: cart_items.id });
      if (cart) {
        cart.quantity += quantity;
        await cart.save();
      }
      else {
        await CartModel.create({
          user_id: user_id,
          product_id: cart_items.id,
          quantity
        })
      }
    }

    const latest_cart = await CartModel.find({ user_id }).populate("product_id", cartProjection);
    return res.send({
      latest_cart,
      success: true,
      message: ""
    })
  } catch (error) {
    return sendServerError(res)
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { product_id } = req.params;
    const deleted = await CartModel.findOneAndDelete({
      user_id: req.user._id,
      product_id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    return res.status(200).json({ success: true, message: "Cart item removed" });
  } catch (error) {
    return sendServerError(res, error);
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { product_id } = req.params;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive whole number",
      });
    }

    const cart = await CartModel.findOneAndUpdate(
      { user_id: req.user._id, product_id },
      { quantity },
      { new: true, runValidators: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated",
      quantity: cart.quantity,
    });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export { getCart, syncCart, updateCartQuantity, removeCartItem };


// 6a79a27bb1d7279c176a97be user id
// 6a4cdecbc212f362c74bb80b product id

// db.carts.insertOne({
//   product_id: ObjectId("6a4cdecbc212f362c74bb80b"),
//   quantity: 1,
//   user_id: ObjectId("6a79a27bb1d7279c176a97be"),
//   createdAt: new Date(),
//   updatedAt: new Date()
// })