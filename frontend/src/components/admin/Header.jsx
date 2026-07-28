"use client";

import {
  FiSearch,
  FiMoon,
  FiBell,
  FiSettings,
  FiMaximize,
  FiShoppingCart,
} from "react-icons/fi";

import Image from "next/image";

export default function Header() {
  return (
    <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">

      {/* Left Side */}
      <div className="flex items-center flex-1">

        <div className="relative w-full max-w-[320px] hidden sm:block">
          <input
            type="text"
            placeholder="Search for Results..."
            className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-200 outline-none"
          />

          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center h-full">

        {/* Icons */}
        <button className="hidden md:flex w-[56px] h-[70px] border-l border-gray-200 items-center justify-center text-[#566a7f] hover:bg-gray-50 transition">
          <FiMoon size={18} />
        </button>

        <button className="hidden md:flex w-[56px] h-[70px] border-l border-gray-200 items-center justify-center text-[#566a7f] hover:bg-gray-50 transition relative">
          <FiShoppingCart size={18} />

          <span className="absolute right-0 top-4 right-4 w-3.5 h-3.5 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center">
            5
          </span>
        </button>

        <button className="hidden md:flex w-[56px] h-[70px] border-l border-gray-200 items-center justify-center text-[#566a7f] hover:bg-gray-50 transition">
          <FiBell size={18} />
        </button>

        <button className="hidden lg:flex w-[56px] h-[70px] border-l border-gray-200 items-center justify-center text-[#566a7f] hover:bg-gray-50 transition">
          <FiMaximize size={18} />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 h-full px-4 border-l border-gray-200">

          <div className="w-9 h-9 rounded-full overflow-hidden border">
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={36}
              height={36}
              className="object-cover"
            />
          </div>

          <div className="hidden lg:block">
            <h4 className="text-sm font-medium text-gray-700">
              Admin
            </h4>

            <p className="text-xs text-gray-400">
              Administrator
            </p>
          </div>
        </div>

        {/* Settings */}
        <button className="w-[56px] h-[70px] border-l border-gray-200 flex items-center justify-center text-[#566a7f] hover:bg-gray-50 transition">
          <FiSettings size={18} />
        </button>
      </div>
    </header>
  );
}