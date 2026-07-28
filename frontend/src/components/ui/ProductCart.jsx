import React from 'react'
import CartButton from '../website/home/AddBtn';


import Link from 'next/link';

export default function ProductCard({ product = {} }) {
  // 1. Destructuring: Product object se saari details nikal rahe hain aur default values set kar rahe hain
  const {
    thumbnail,
    images = [],
    name = "Untitled Product",
    salePrice = 0,
    originalPrice,
    discount = 0,
    categoryId
  } = product;

  // 2. Fallbacks: Agar thumbnail na ho toh pehli image ya placeholder use hoga
  const productImage = thumbnail || images[0] || "https://placehold.co/400x300?text=No+Image";

  // Category name nikalne ke liye fallback logic
  const productCategory = categoryId?.name || "Furniture";

  // 3. Cart Handler: Button click hone par yeh function chalega
  // const handleAddToCart = (e) => {
  //   e.stopPropagation(); // Card ke click event ko rokne ke liye
  //   alert(`${name} added to cart!`);
  // };

  return (

    <div className='group bg-white rounded-xl border-[#EDE5DA] border-[0.5px] overflow-hidden cursor-pointer relative transition-all duration-300 hover:-translate-y-2 hover:shadow-lg w-full flex flex-col'>

      {/* Image Section */}
      <div className='relative aspect-[4/3] overflow-hidden bg-[#F5F0EB] flex items-center justify-center'>
        <Link href={`/product/${product._id}`}>
          <img
            src={productImage}
            alt={name}
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        </Link>


        {/* Discount Badge: Tabhi dikhega jab discount 0 se bada ho */}
        {discount > 0 && (
          <div className='absolute top-2.5 left-2.5 bg-[#8B5E3C] text-white text-[9px] tracking-widest px-2 py-1 rounded-[3px] font-medium'>
            -{discount}%
          </div>
        )}

        {/* Hover Overlay: Hover karne par bottom se sliding animation ke sath aayega */}
        <div className='absolute bottom-0 left-0 right-0 bg-[rgba(44,32,22,0.88)] text-[#D6BFA7] text-[11px] tracking-widest text-center px-2.5 py-2 uppercase opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
          View Product
        </div>
      </div>

      {/* Details Section */}
      <div className='p-3.5 flex flex-col flex-grow'>
        {/* Category Name */}
        <div className='text-[10px] tracking-[0.14em] uppercase text-[#6B7280] mb-1'>
          {productCategory}
        </div>

        {/* Product Title */}
        <div className='text-[13px] text-[#1E1E1E] font-medium mb-2 leading-[1.35] line-clamp-1'>
          {name}
        </div>

        {/* Rating aur Price ki Row */}
        <div className='flex items-center justify-between mb-3.5'>
          {/* Star Ratings */}
          <div className='flex items-center gap-0.75'>
            <span className='text-[10px] text-[#C6A27E]'>★★★★★</span>
            <span className='text-[10px] text-[#6B7280]'>(0)</span>
          </div>

          {/* Pricing Details */}
          <div className='flex items-baseline gap-1.5'>
            <span className='text-[14px] font-medium text-[#1E1E1E]'>
              ₹{salePrice.toLocaleString('en-IN')}
            </span>
            {/* Cut off price tabhi dikhega jab originalPrice salePrice se jyada ho */}
            {originalPrice > salePrice && (
              <span className='text-[11px] text-[#6B7280] line-through'>
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button: mt-auto se button hamesha bottom me aligned rahega */}
        <CartButton product={product} />
      </div>
    </div>
  )
}