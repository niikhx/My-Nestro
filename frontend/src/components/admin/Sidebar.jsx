"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  MdDashboard,
  MdMenu,
  MdCategory,
  MdInventory,
  MdReviews,
  MdSettings,
} from "react-icons/md";

import {
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaTags,
} from "react-icons/fa";

import { RiArrowDropDownLine } from "react-icons/ri";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuSections = [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: <MdDashboard size={20} />,
          path: "/admin",
        },
      ],
    },
    {
      title: "STORE",
      items: [
        {
          name: "Products",
          icon: <FaBox size={18} />,
          path: "/admin/product",
        },
        {
          name: "Categories",
          icon: <MdCategory size={18} />,
          path: "/admin/category",
        },
        {
          name: "Inventory",
          icon: <MdInventory size={18} />,
          path: "/admin/inventory",
        },
      ],
    },
    {
      title: "ORDERS",
      items: [
        {
          name: "Orders",
          icon: <FaShoppingCart size={18} />,
          path: "/admin/orders",
        },
      ],
    },
    {
      title: "CUSTOMERS",
      items: [
        {
          name: "Users",
          icon: <FaUsers size={18} />,
          path: "/admin/users",
        },
        {
          name: "Reviews",
          icon: <MdReviews size={18} />,
          path: "/admin/reviews",
        },
      ],
    },
    {
      title: "MARKETING",
      items: [
        {
          name: "Coupons",
          icon: <FaTags size={18} />,
          path: "/admin/coupons",
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          name: "Settings",
          icon: <MdSettings size={18} />,
          path: "/admin/settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={`
        h-screen
        sticky top-0 left-0
        bg-[#3b497e]
        text-white
        z-50
        shadow-xl
        transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-4">
        {isOpen && (
          <h2 className="text-xl font-bold tracking-wider">
            NESTRO
          </h2>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl cursor-pointer"
        >
          <MdMenu className="ml-2.5" />
        </button>
      </div>

      {/* Menu */}
      <div className="py-4">

        {menuSections.map((section, index) => (
          <div key={index} className="mb-6">

            {/* Section Title */}
            {isOpen && (
              <p className="px-5 mb-2 text-[11px] uppercase tracking-widest text-white/40">
                {section.title}
              </p>
            )}

            {/* Items */}
            {section.items.map((item, idx) => {
              const active = pathname === item.path;

              return (
                <Link
                  key={idx}
                  href={item.path}
                  title={!isOpen ? item.name : ""}
                  className={`
                    flex items-center
                    ${isOpen
                      ? "justify-between px-5"
                      : "justify-center"
                    }
                    py-3 mx-2 rounded-xl
                    transition-all duration-300

                    ${active
                      ? "bg-white/15 text-white"
                      : "hover:bg-white/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}

                    {isOpen && (
                      <span className="font-medium">
                        {item.name}
                      </span>
                    )}
                  </div>

                  {isOpen && (
                    <RiArrowDropDownLine className="text-2xl" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}

      </div>
    </aside>
  );
}