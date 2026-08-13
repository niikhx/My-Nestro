'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  IconSearch,
  IconShoppingBag,
  IconUser,
  IconMenu2,
  IconX,
} from '@tabler/icons-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Store', href: '/store' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Checkout', href: '/checkout' },

]

import { useSelector, useDispatch } from 'react-redux'
import { emptyCart, lsToCart } from '@/redux/features/cartSlice'
import { client } from '@/utils/helper'
import { useRouter } from 'next/navigation'

const iconBtn =
  'w-9 h-9 rounded-full flex items-center justify-center text-[#444444] hover:bg-[#F0EBE3] transition-all'

export default function Header({ user = null }) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartItems = useSelector((store) => store.cart?.items)
  console.log(cartItems)
  const dispatcher = useDispatch();
  useEffect(
    () => {
      dispatcher(lsToCart());
    },
    []
  )


  async function logoutHanlder() {
    const response = await client("user/logout");
    dispatcher(emptyCart())
    // Refresh server components
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-[300] bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#E8E0D5] h-[58px] flex items-center justify-between px-4 md:px-8">

      {/* Logo */}
      <Link href="/" className="text-[16px] font-medium tracking-[0.12em] uppercase text-[#1E1E1E] flex-shrink-0">
        NESTRO<span className="text-[#8B5E3C]">.</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[11px] tracking-[0.06em] rounded-md px-3 py-1.5 transition-colors ${pathname === link.href
              ? 'bg-[#F0EBE3] text-[#8B5E3C]'
              : 'text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8B5E3C]'
              }`}
          >
            {link.label}
          </Link>
        ))}

        {
          user !== null ?
            <button
              onClick={logoutHanlder}
              className="text-[11px] tracking-[0.06em] rounded-md px-3 py-1.5 transition-colors bg-black text-white hover:bg-gray-800"
            >
              Logout
            </button>
            :
            <Link
              href="signin"
              className={`text-[11px] tracking-[0.06em] rounded-md px-3 py-1.5 transition-colors ${pathname === "signin"
                ? 'bg-[#F0EBE3] text-[#8B5E3C]'
                : 'text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8B5E3C]'
                }`}
            >
              Sign In
            </Link>

        }


      </nav>

      {/* Desktop Right Icons */}
      <div className="hidden md:flex items-center gap-1">
        <button aria-label="Search" className={iconBtn}>
          <IconSearch size={18} stroke={1.8} />
        </button>


        <Link href="/cart" aria-label="Cart" className={`relative ${iconBtn}`}>
          <IconShoppingBag size={18} stroke={1.8} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B5E3C] text-white text-[10px] rounded-full flex items-center justify-center leading-none">
            {cartItems?.length || 0}
          </span>
        </Link>

        <Link
          href="/signin"
          aria-label="Profile"
          className="w-9 h-9 rounded-full border flex gap-4 border-[#C6A27E] flex items-center justify-center text-[#8B5E3C] hover:bg-[#C6A27E] hover:text-white transition-all"
        >
          <IconUser size={18} stroke={1.8} />
        
        </Link>
        <span className='text-sm text-gray-500 font-bold'>{user?.name || ""}</span>

      </div>

      {/* Mobile: icons + hamburger */}
      <div className="flex md:hidden items-center gap-0.5">
        <button aria-label="Search" className={iconBtn}>
          <IconSearch size={18} stroke={1.8} />
        </button>

        <Link href="/cart" aria-label="Cart" className={`relative ${iconBtn}`}>
          <IconShoppingBag size={18} stroke={1.8} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B5E3C] text-white text-[10px] rounded-full flex items-center justify-center leading-none">
            {cartItems?.length || 0}
          </span>
        </Link>


        <Link
          href="/signin"
          aria-label="Profile"
          className="w-9 h-9 rounded-full border border-[#C6A27E] flex items-center justify-center text-[#8B5E3C] hover:bg-[#C6A27E] hover:text-white transition-all"
        >
          <IconUser size={18} stroke={1.8} />
          <span className='text-sm text-gray-500 font-bold'>{user?.name || ""}</span>
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((p) => !p)}
          className={`${iconBtn} ml-0.5`}
        >
          {menuOpen ? <IconX size={18} stroke={1.8} /> : <IconMenu2 size={18} stroke={1.8} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-[58px] left-0 right-0 bg-[#FAFAF9] border-b border-[#E8E0D5] flex flex-col px-4 py-3 gap-1 md:hidden z-[299]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[12px] tracking-[0.06em] rounded-md px-3 py-2 w-full transition-colors ${pathname === link.href
                ? 'bg-[#F0EBE3] text-[#8B5E3C]'
                : 'text-[#6B7280] hover:bg-[#F0EBE3] hover:text-[#8B5E3C]'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}