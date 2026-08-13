import CartModel from "../models/cart.model.js";
import { sendServerError } from "../utils/response.js";

const syncCart = async (req, res) => {
  try {
    const { user_id, cart_item } = req.body;
    console.log(user_id, cart_item)
    for (let cart_items of cart_item) {
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
    console.log(latest_cart)

    res.send({
      latest_cart,
      success: true,
      message: ""
    })
  } catch (error) {
    return sendServerError(res)
  }
};

export { syncCart };


// 6a79a27bb1d7279c176a97be user id
// 6a4cdecbc212f362c74bb80b product id

// db.carts.insertOne({
//   product_id: ObjectId("6a4cdecbc212f362c74bb80b"),
//   quantity: 1,
//   user_id: ObjectId("6a79a27bb1d7279c176a97be"),
//   createdAt: new Date(),
//   updatedAt: new Date()
// })