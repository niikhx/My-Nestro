'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegCircleUser, FaBars } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { lsToCart } from "@/redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  // Redux store se items extract kar rahe hain safe default value [] ke saath
  const cartItems = useSelector((store) => store.cart.items) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(lsToCart());
    setIsMounted(true);
  }, [dispatch]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-[1366px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <h2 className="text-[18px] tracking-widest font-medium text-[#1E1E1E]">
          NESTRO.
        </h2>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-[13px] text-gray-500 font-medium">
          <Link href="/" className="hover:bg-[#F0EBE3] hover:text-[#1E1E1E] transition-colors rounded-[8px] py-1.5 px-4">Home</Link>
          <Link href="/store" className="hover:bg-[#F0EBE3] hover:text-[#1E1E1E] transition-colors rounded-[8px] py-1.5 px-4">Store</Link>
          <Link href="/about" className="hover:bg-[#F0EBE3] hover:text-[#1E1E1E] transition-colors rounded-[8px] py-1.5 px-4">About</Link>
          <Link href="/contact" className="hover:bg-[#F0EBE3] hover:text-[#1E1E1E] transition-colors rounded-[8px] py-1.5 px-4">Contact</Link>
          <Link href="/checkout" className="hover:bg-[#F0EBE3] hover:text-[#1E1E1E] transition-colors rounded-[8px] py-1.5 px-4">Checkout</Link>
          <Link href="/sign" className="hover:bg-[#F0EBE3] hover:text-[#1E1E1E] transition-colors rounded-[8px] py-1.5 px-4">Sign In</Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-7 text-[18px] text-[#8B5E3C]">
          <button type="button" className="hover:opacity-80 transition-opacity">
            <IoIosSearch />
          </button>

          {/* Cart Icon With Dynamic Badge */}
          <Link href="/cart" className="relative hover:opacity-80 transition-opacity">
            <button type="button" className="relative hover:opacity-80 transition-opacity">
              <FaShoppingCart />

              {/* Hydration safe cart badge */}
              {isMounted && cartItems.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#daa882] text-[10px] text-white font-semibold">
                  {cartItems?.length || 0}
                </span>
              )}
            </button>
          </Link>

          <button type="button" className="hover:opacity-80 transition-opacity">
            <FaRegCircleUser />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button type="button" className="md:hidden text-xl text-[#8B5E3C]">
          <FaBars />
        </button>

      </div>
    </header>
  );
}