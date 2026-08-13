'use client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/features/cartSlice'

export default function CartButton({ product }) {
  const disPatcher = useDispatch()

  function cartHandler() {
    console.log("Product object on Add to Cart:", product);
    disPatcher(addToCart({
      id: product._id,
      name: product.name,
      salePrice: product.salePrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      thumbnail: product.thumbnail || product.image || product.images?.[0] || product.img || "",
      qty: 1
    }))
  }

  return (
    <div>
      <button
        onClick={cartHandler}
        className='w-full mt-auto bg-[#2C2016] text-[#D6BFA7] text-[11px] tracking-widest uppercase py-2.5 rounded-lg font-medium transition-colors duration-300 hover:bg-[#8B5E3C] hover:text-white flex items-center justify-center gap-2'
      >
        {/* Shopping Cart Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Add to Cart
      </button>
    </div>
  )
}
