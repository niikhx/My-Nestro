"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { GiStarShuriken } from "react-icons/gi";
import { LuStar } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { client } from "@/utils/helper";
import { Carter_One, Niconne } from "next/font/google";

export default function AuthPage() {
  const lsCart = localStorage.getItem("cart")
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("auth") === "signin" ? "signin" : "signup";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sign In State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Input Change Handler for Sign In
  function handleSignInChange(e) {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Input Change Handler for Sign Up
  function handleSignUpChange(e) {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Submit Handler for Sign In
  async function handleSignInSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await client.post("/user/signin", signInData);

      if (response.data.success) {
        toast.success(response.data.message || "Login Successfully");
        setSignInData({ email: "", password: "" });
        let cart_item = []
        if (lsCart != null || lsCart != undefined) {
          cart_item != JSON.parse(lsCart).items
        }
        const cart_response = await client.post("/cart/sync-cart", {
          cart_item: cart_item,
          user_id: response.data.user_id
        });
        if (cart_response.data.success) {
          localStorage.removeItem("cart")
          const latest_cart = cart_response.data.latest_cart;
          let original_total = 0, final_total = 0;
          const new_cart = latest_cart.map((item) => {
            original_total += item.product_id.originalPrice * item.quantity;
            final_total += item.product_id.salePrice * item.quantity;
            return {
              id: item.product_id._id,
              name: item.product_id.name,
              salePrice: item.product_id.salePrice,
              discount: item.product_id.discount,
              originalPrice: item.product_id.originalPrice,
              qty: item.quantity,
              thumbnail: item.product_id.thumbnail,
            }
          });
          const cart_data = {
            items: new_cart,
            original_total,
            final_total,
          }
          localStorage.setItem("cart", JSON.stringify(cart_data))
        }
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Internal Server Error"
      );
    } finally {
      setLoading(false);
    }
  }

  // Submit Handler for Sign Up
  async function handleSignUpSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await client.post("/user/register", signUpData);

      if (response.data.success) {
        toast.success(response.data.message || "Account Created Successfully");
        router.push(`/otpverify?email=${signUpData.email}`);
        setSignUpData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Internal Server Error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE (Nestro Static Branding Section) */}
      <div className="w-full lg:w-[40%] bg-[#2C1A12] flex items-center justify-center px-6 md:px-10 py-12 lg:py-0">
        <div className="max-w-[480px] w-full text-center">
          {/* Logo */}
          <h2 className="text-white tracking-[0.25em] text-[18px] font-medium mb-10 md:mb-16">
            NESTRO.
          </h2>

          {/* Sofa Illustration */}
          <div className="flex justify-center mb-12">
            <div className="relative w-[120px] h-[90px]">
              <div className="absolute bottom-0 left-0 right-0 h-[70px] rounded-[10px] bg-[#8F7259]/60" />
              <div className="absolute top-0 left-[8px] w-[40px] h-[36px] rounded-[8px] bg-[#B39A82]/40" />
              <div className="absolute top-0 right-[8px] w-[40px] h-[36px] rounded-[8px] bg-[#B39A82]/40" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-white text-[28px] md:text-[30px] lg:text-[31px] leading-[1.15] font-medium">
            Your <span className="italic text-[#C69A72]">Dream Home</span><br />Starts Here
          </h1>

          {/* Description */}
          <p className="mt-2 text-[#B7A89A] text-[10px] md:text-[12px] leading-7">
            Join 12,000 homeowners who've transformed their living spaces with Nestro.
          </p>

          {/* Features */}
          <div className="mt-6 space-y-3 text-center">
            <div className="flex items-start gap-2 text-left">
              <div className="w-6 h-6 text-white rounded-lg bg-[#5A3D24] flex items-center justify-center shrink-0">
                <CiDeliveryTruck />
              </div>
              <p className="text-[#CFC2B6] text-[11px] md:text-[12px]">
                Free delivery + white glove assembly on all orders
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#5A3D24] flex text-white items-center justify-center shrink-0">
                <LuStar />
              </div>
              <p className="text-[#CFC2B6] text-[11px] md:text-[12px]">
                Earn reward points on every purchase
              </p>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-6 h-6 text-white rounded-lg bg-[#5A3D24] flex items-center justify-center shrink-0">
                <GiStarShuriken />
              </div>
              <p className="text-[#CFC2B6] text-[11px] md:text-[12px]">
                Members-only prices & early access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Dynamic Form Section) */}
      <div className="w-full lg:w-[60%] bg-[#FAF8F5] flex items-center justify-center px-6 py-10 lg:py-0">
        <div className="w-full max-w-[340px] py-8">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-6 border-b border-[#E4DDD5]">
            <Link
              href="?auth=signin"
              className={`text-[12px] pb-4 transition-all duration-200 ${activeTab === "signin"
                ? "text-[#8B5E3C] border-b-2 border-[#8B5E3C] font-medium"
                : "text-[#7B7B7B]"
                }`}
            >
              Sign in
            </Link>
            <Link
              href="?auth=signup"
              className={`text-[12px] pb-4 transition-all duration-200 ${activeTab === "signup"
                ? "text-[#8B5E3C] border-b-2 border-[#8B5E3C] font-medium"
                : "text-[#7B7B7B]"
                }`}
            >
              Create account
            </Link>
          </div>

          {/* ----------------- SIGN IN FORM ----------------- */}
          {activeTab === "signin" && (
            <div>
              <div className="mt-4">
                <h2 className="text-[20px] font-medium text-[#111111]">
                  Welcome back
                </h2>
                <p className="mt-2 text-[#6D6D6D] text-[11px]">
                  Sign in to your Nestro account to continue.
                </p>
              </div>

              <form onSubmit={handleSignInSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    placeholder="enter email"
                    required
                    className="w-full h-[35px] rounded-lg border border-[#D8D0C8] bg-white px-3 text-[13px] outline-none focus:border-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signInData.password}
                      onChange={handleSignInChange}
                      placeholder="enter password"
                      required
                      className="w-full h-[35px] rounded-lg border border-[#D8D0C8] bg-white px-3 pr-10 text-[13px] outline-none focus:border-[#8B5E3C]"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] text-[14px] cursor-pointer select-none"
                    >
                      👁
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="text-[#8B5E3C] text-[11px] hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[38px] rounded-lg bg-[#8B5E3C] text-white text-[13px] font-medium hover:opacity-95 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing In..." : "Sign in"}
                </button>
              </form>
            </div>
          )}

          {/* ----------------- CREATE ACCOUNT FORM ----------------- */}
          {activeTab === "signup" && (
            <div>
              <div className="mt-4">
                <h2 className="text-[20px] font-medium text-[#111111]">
                  Create account
                </h2>
                <p className="mt-2 text-[#6D6D6D] text-[11px]">
                  Join Nestro and start designing your dream home.
                </p>
              </div>

              <form onSubmit={handleSignUpSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    placeholder="Enter your name"
                    required
                    className="w-full h-[35px] rounded-lg border border-[#D8D0C8] bg-white px-3 text-[13px] outline-none focus:border-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    placeholder="Enter your email"
                    required
                    className="w-full h-[35px] rounded-lg border border-[#D8D0C8] bg-white px-3 text-[13px] outline-none focus:border-[#8B5E3C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      placeholder="Enter your password"
                      required
                      className="w-full h-[35px] rounded-lg border border-[#D8D0C8] bg-white px-3 pr-10 text-[13px] outline-none focus:border-[#8B5E3C]"
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] text-[14px] cursor-pointer select-none"
                    >
                      👁
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input type="checkbox" id="terms" defaultChecked className="w-3.5 h-3.5 mt-0.5 rounded accent-[#8B5E3C] cursor-pointer" />
                  <label htmlFor="terms" className="text-[11px] text-[#6E655A] cursor-pointer select-none">
                    I agree to the Terms of Service & Privacy Policy
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[38px] rounded-lg bg-[#8B5E3C] text-white text-[13px] font-medium hover:opacity-95 transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            </div>
          )}

          {/* Social Buttons */}
          <div>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#E4DDD5]" />
              <span className="text-[#8C8275] text-[11px]">
                {activeTab === "signin" ? "or continue with" : "or sign up with"}
              </span>
              <div className="flex-1 h-px bg-[#E4DDD5]" />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full h-[35px] rounded-lg border text-[#4A4A4A] border-[#D8D0C8] bg-white text-[12px] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              >
                <FcGoogle className="text-[16px]" /> Continue with Google
              </button>

              <button
                type="button"
                className="w-full h-[35px] rounded-lg border text-[#4A4A4A] border-[#D8D0C8] bg-white text-[12px] font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
              >
                <FaApple className="text-[16px] text-black" /> Continue with Apple
              </button>
            </div>
          </div>

          {/* Toggle Links */}
          <div className="mt-5 text-center">
            {activeTab === "signin" ? (
              <p className="text-[12px] text-[#6E655A]">
                Don't have an account?{" "}
                <Link
                  href="?auth=signup"
                  className="text-[#8B5E3C] font-medium hover:underline"
                >
                  Create one free
                </Link>
              </p>
            ) : (
              <p className="text-[12px] text-[#6E655A]">
                Already have an account?{" "}
                <Link
                  href="?auth=signin"
                  className="text-[#8B5E3C] font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}