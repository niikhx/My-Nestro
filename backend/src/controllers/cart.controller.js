import CartModel from "../models/cart.model.js";
import { sendServerError } from "../utils/response.js";

const syncCart = async (req, res) => {
  try {
    const { cart_item } = req.body;
    const user_id = req.user._id;

    if (!Array.isArray(cart_item) || cart_item.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required",
      });
    }

    for (let cart_items of cart_item) {
      if (!cart_items?.id || !Number(cart_items.qty)) continue;

      const cart = await CartModel.findOne({
        user_id: user_id,
        product_id: cart_items.id
      })
      if (cart) {
        cart.quantity += cart_items.qty
        await cart.save();
      }
      else {
        await CartModel.create({
          user_id: user_id,
          product_id: cart_items.id,
          quantity: cart_items.qty
        })
      }
    }

    const latest_cart = await CartModel.find({ user_id }).populate(
      "product_id",
      "name salePrice discount originalPrice thumbnail image images");
    return res.send({
      latest_cart,
      success: true,
      message: ""
    })
  } catch (error) {
    return sendServerError(res)
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

export { syncCart, updateCartQuantity };


// 6a79a27bb1d7279c176a97be user id
// 6a4cdecbc212f362c74bb80b product id

// db.carts.insertOne({
//   product_id: ObjectId("6a4cdecbc212f362c74bb80b"),
//   quantity: 1,
//   user_id: ObjectId("6a79a27bb1d7279c176a97be"),
//   createdAt: new Date(),
//   updatedAt: new Date()
// })