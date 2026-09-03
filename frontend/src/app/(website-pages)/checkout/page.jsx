'use client';
import { emptyCart } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { client } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { v4 as uuidv4 } from "uuid"
const idempotencyKey = uuidv4(); // Generate a unique key for each request

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState(0);
  // idompotenci key 
  console.log("Idempotency Key:", idempotencyKey); // Log the key for debugging

  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState(0);
  const { error, isLoading, Razorpay } = useRazorpay();
  const dispatcher = useDispatch()
  const cartItem = useSelector((store) => store.cart);
  const addresses = [
    {
      fullName: "Nikhil Meena",
      mobile: "9876543210",
      pincode: "305001",
      addressLine: "Ajmer Road",
      city: "Ajmer",
      state: "Rajasthan",
      country: "India",
      isDefault: true
    },
    {
      fullName: "Nikhil Meena",
      mobile: "9876543210",
      pincode: "302001",
      addressLine: "MI Road",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      isDefault: false
    },
    {
      fullName: "Nikhil Meena",
      mobile: "9876543210",
      pincode: "110001",
      addressLine: "Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      isDefault: false
    }
  ];

  const checkOutHandler = () => {
    const data = {
      address: addresses[selectedAddress],
      payment_mode: paymentMethod,
      total_amount: cartItem.final_total + (paymentMethod == 1 ? 9 : 0)
    };

    client.post("/order/create", data,
      {
        headers: {
          "Idempotency-Key": idempotencyKey
        }
      }
    )
      .then((response) => {
        if (response.data.status) {
          dispatcher(emptyCart());
          localStorage.removeItem("cart");
          if (paymentMethod == 1) {
            router.push(`/order?order_id=${response.data.order_id}`);
          } else {
            const { order_id, razorpay_order_id } = response.data;
            // open payment popup
            paymentpopup(order_id, razorpay_order_id);
          }
        } else {
          toast.error(response.data.message||"Order Placed Already..")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const paymentpopup = (order_id, razorpay_order_id) => {
    try {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,// Amount in paise
        currency: "INR",
        name: "Nestro",
        order_id: razorpay_order_id, // Generate order_id on server
        handler: (response) => {
          //payment success api
          const razorpay_response = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }
          client.post("/order/verify-payment", { order_id, razorpay_response })
            .then((response) => {
              if (response.data.status) {
                dispatcher(emptyCart());
                localStorage.removeItem("cart");
                router.push(`/order?order_id=${response.data.order_id}`);
              } else {
                toast.error(response.data.message || "Payment Verification Failed. Please Try Again..")
              }
            })
            .catch((error) => {
              console.error("Error Verification Failed", error)
            })
        },
        theme: {
          color: "#2c2016",
        }
      };
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
      razorpayInstance.on("Payment Failed", (error) => {
        console.log(error)
      })
    } catch (error) {
      toast.error("failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0EA] text-[#1F1A17]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B5E3C]">
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-medium text-[#1B120D] sm:text-4xl">
            Complete your order
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <section className="rounded-[28px] border border-[#E7D9CC] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[20px] font-medium text-[#1B120D]">
                  Shipping Address
                </h2>
                <button className="text-[12px] font-medium text-[#8B5E3C]">
                  Edit
                </button>
              </div>

              <div className="grid gap-4">
                {
                  addresses?.map(
                    (address, index) => {
                      return (
                        <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-4">
                            <div onClick={
                              () => setSelectedAddress(index)
                            }>
                              <input type="radio" name={"address" + index} className="mr-2" checked={selectedAddress == index ? true : false} readOnly />
                              <label htmlFor={"address" + index}>
                                <b className="text-lg text-gray-800">{address.fullName}</b>

                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                  {address.addressLine}, {address.city}, {address.state},{" "}
                                  {address.country} - {address.pincode}.
                                </p>

                                <p className="mt-2 text-sm font-medium text-gray-700">
                                  Mobile: <span className="font-normal">{address.mobile}</span>
                                </p>
                              </label>

                            </div>

                            <span className="shrink-0 rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                              Address
                            </span>
                          </div>
                        </div>
                      )
                    }
                  )
                }

              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-[28px] border border-[#E7D9CC] bg-white p-5 shadow-sm sm:p-7">
              <h2 className="mb-5 text-[20px] font-medium text-[#1B120D]">
                Payment Method
              </h2>

              <div className="space-y-4">
                <div
                  onClick={() => setPaymentMethod(0)}
                  className={`flex cursor-pointer items-center gap-4  rounded-2xl border p-4 transition ${paymentMethod === 0 ? "border-[#8B5E3C] bg-[#F9F5F2]" : "border-[#E7D9CC] bg-white"
                    }`}
                >
                  <div className={`h-5 w-5 rounded-full border-[2px] border-[#8B5E3C] flex items-center justify-center`}>
                    {paymentMethod === 0 && <div className="h-2.5 w-2.5 rounded-full bg-[#8B5E3C]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[16px] text-[#1B120D]">Prepaid</p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod(1)}
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${paymentMethod === 1 ? "border-[#8B5E3C] bg-[#F9F5F2]" : "border-[#E7D9CC] bg-white"
                    }`}
                >
                  <div className={`h-5 w-5 rounded-full border-[2px] border-[#8B5E3C] flex items-center justify-center`}>
                    {paymentMethod === 1 && <div className="h-2.5 w-2.5 rounded-full bg-[#8B5E3C]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[16px] text-[#1B120D]">Pay On Delivery</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <aside className="rounded-[28px] border border-[#E7D9CC] bg-[#F8F4F0] p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B5E3C]">
                Your Cart
              </p>
              <h2 className="mt-2 text-[24px] font-medium text-[#1B120D]">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-[#E7D9CC] bg-white p-3">
                <div className="h-20 w-20 rounded-2xl bg-[#EFE4D9]" />
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-[#1B120D]">
                    Scandinavian Lounge Chair
                  </p>
                  <p className="mt-1 text-[12px] text-[#6F625D]">Walnut • Qty: 1</p>
                  <p className="mt-2 text-[14px] font-semibold text-[#8B5E3C]">
                    ₹42,000
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#E7D9CC] bg-white p-3">
                <div className="h-20 w-20 rounded-2xl bg-[#E9E0D8]" />
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-[#1B120D]">
                    Ash Wood Dining Table
                  </p>
                  <p className="mt-1 text-[12px] text-[#6F625D]">Natural Finish • Qty: 1</p>
                  <p className="mt-2 text-[14px] font-semibold text-[#8B5E3C]">
                    ₹1,18,000
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-[#E7D9CC] pt-5">
              <div className="flex items-center justify-between text-[14px] text-[#4C403B]">
                <span>Subtotal</span>
                <span>{cartItem.original_total}</span>
              </div>

              <div className="flex items-center justify-between text-[14px] text-[#4C403B]">
                <span>Discount</span>
                <span> {(cartItem.original_total) - (cartItem.final_total)}</span>
              </div>

              {
                paymentMethod == 1 && (
                  <div className="flex items-center justify-between text-[16px] text-red-400">
                    <span>Extra Fee</span>
                    <span> +9 ₹</span>
                  </div>
                )
              }


              <div className="flex items-center justify-between pt-2 text-[20px] font-semibold text-[#1B120D]">
                <span>Total</span>
                <span> {cartItem.final_total + (paymentMethod == 1 ? 9 : 0)}</span>
              </div>
            </div>

            <button onClick={checkOutHandler} className="mt-6 flex h-[62px] w-full items-center justify-center rounded-2xl bg-[#8B5E3C] text-[18px] font-medium text-white shadow-md transition hover:bg-[#73492d]">
              {
                paymentMethod == 0 ? "  Proceed to Pay" : "Place Order"
              }
            </button>

            <p className="mt-4 text-center text-[12px] text-[#7A6A61]">
              Secure checkout • Free returns within 7 days
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}