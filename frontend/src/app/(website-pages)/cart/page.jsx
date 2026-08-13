'use client'
import { decreaseQuantity, increaseQuantity, removeFromcart } from "@/redux/features/cartSlice.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
import { lsToCart } from "@/redux/features/cartSlice.js";


export default function CartPage() {
    const cartItem = useSelector((store) => store.cart);
    console.log("Cart Items in Redux:", cartItem.items)
    const { items } = useSelector((state) => state.cart);
    console.log("CART ITEMS IN REDUX:", items);
        const dispatcher = useDispatch()
    useEffect(() => {
        dispatcher(lsToCart()); // Page load hone par LocalStorage se sync
    }, [dispatcher]);

    if (!cartItem?.items || cartItem.items.length === 0) {
        return (
            <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100 py-10">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h2>
                <Link href="/">
                    <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-20 bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-5">

                <h1 className="text-3xl font-bold mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-5">

                        {
                            cartItem?.items.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow p-5 flex gap-5"
                                >

                                    {/* Image */}
                                    <img
                                        src={item.thumbnail || item.image || item.img||item.images}
                                        alt={""}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />

                                    {/* Details */}
                                    <div className="flex-1">

                                        <h2 className="text-xl font-semibold">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            Premium quality product
                                        </p>

                                        <div className="flex justify-between items-center mt-5">

                                            <div className="flex items-center gap-3">

                                                <button onClick={() => dispatcher(decreaseQuantity({ id: item.id }))} className="border px-3 py-1 rounded">
                                                    -
                                                </button>

                                                <span>
                                                    {item.qty}
                                                </span>


                                                <button onClick={() => dispatcher(increaseQuantity({ id: item.id }))} className="border px-3 py-1 rounded">
                                                    +
                                                </button>

                                            </div>

                                            <h3 className="text-xl font-bold">
                                                ₹{item.salePrice}
                                            </h3>

                                        </div>

                                    </div>

                                    <button onClick={() => dispatcher(removeFromcart({ id: item.id }))} className="text-red-500 font-medium">
                                        Remove
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                    {/* Summary */}

                    <div className="bg-white shadow rounded-xl p-6 h-fit">

                        <h2 className="text-2xl font-bold mb-5">
                            Order Summary
                        </h2>


                        <div className="space-y-4 text-gray-600">

                            <div className="flex justify-between">
                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹ {cartItem.original_total}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>
                                    saving
                                </span>

                                <span>
                                    ₹ {(cartItem.original_total) - (cartItem.final_total)}
                                </span>
                            </div>

                            <div className="border-t pt-4 flex justify-between text-black">

                                <span className="font-bold">
                                    Total
                                </span>
                                <span className="font-bold text-xl">
                                    ₹ {cartItem.final_total}
                                </span>
                            </div>
                        </div>
                        <Link href="/checkout">
                            <button
                                className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                            >
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}