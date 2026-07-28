import ProductCard from '@/components/ui/ProductCart';
import FilterSidebar from '@/components/website/store/FilterSideBar'
import Pagination from '@/components/website/store/Pagination';
import SortBar from '@/components/website/store/Sortbar';
import { fetchProduct } from '@/utils/api';
import React from 'react'
export default async function store({ searchParams }) {
  const params = await searchParams;
  const category = params.category || null;
  const room = params.room || null;
  const minPrice = params.min || null;
  const maxPrice = params.max || null;
  const stock = params.stock || null;
  const sort = params.sort || null;
  const page = params.page || 1;
  const products = await fetchProduct({ category,page, room, minPrice, maxPrice, stock, status: true, sort })
  return (
    <>
      <section className="mx-4 mt-20 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2C2016_0%,#3D2B1A_60%,#5A3D24_100%)] sm:mx-6 sm:mt-20">
        <div className="relative min-h-[300px] w-full overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_70%_50%,rgba(198,162,126,0.1)_0%,transparent_70%)]">

          {/* Glow Effects */}
          <div className="absolute right-0 top-0 h-full w-[125px] bg-[#b07a4d]/20 blur-[120px]" />

          {/* Main Container */}
          <div className="relative z-10 flex h-full flex-col items-center justify-between gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 lg:flex-row lg:px-16 lg:py-16">

            {/* LEFT SIDE */}
            <div className="flex w-full max-w-md flex-col items-center text-center lg:items-start lg:text-left">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d1b093]">
                New Collection — SS 2026
              </p>

              <h1 className="mb-4 leading-[1.2] tracking-[-0.02em] text-[#FAF7F4]">
                <span className="block text-[24px] font-medium sm:text-[30px] lg:text-[34px]">
                  Modern Living
                </span>

                <span className="mt-1 block text-[24px] font-light italic text-[#d6c1af] sm:text-[30px] lg:text-[34px]">
                  Collection
                </span>
              </h1>

              <p className="mb-6 max-w-full text-[13px] leading-[1.7] text-white/60 sm:max-w-[320px]">
                Timeless furniture crafted for elegant spaces.
                <br />
                Designed with intention, built to endure.
              </p>

              <button className="inline-flex items-center gap-2 rounded-sm bg-[#8b5e3c] px-6 py-3 text-[11px] font-medium tracking-[0.08em] text-[#FFF8F3] transition-colors duration-200 hover:bg-[#734d31]">
                Explore Collection
                <span className="text-sm">→</span>
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full items-center justify-center lg:w-auto">
              <svg
                viewBox="0 0 340 200"
                fill="none"
                className="h-auto w-[90%] max-w-[280px] sm:max-w-[340px]"
              >
                <rect
                  x="30"
                  y="120"
                  width="280"
                  height="55"
                  rx="8"
                  fill="#C6A27E"
                  opacity="0.18"
                />

                <rect
                  x="50"
                  y="95"
                  width="240"
                  height="80"
                  rx="12"
                  fill="#C6A27E"
                  opacity="0.22"
                />

                <rect
                  x="55"
                  y="75"
                  width="100"
                  height="50"
                  rx="10"
                  fill="#D6BFA7"
                  opacity="0.28"
                />

                <rect
                  x="185"
                  y="75"
                  width="100"
                  height="50"
                  rx="10"
                  fill="#D6BFA7"
                  opacity="0.28"
                />

                <rect
                  x="40"
                  y="85"
                  width="28"
                  height="90"
                  rx="8"
                  fill="#8B5E3C"
                  opacity="0.5"
                />

                <rect
                  x="272"
                  y="85"
                  width="28"
                  height="90"
                  rx="8"
                  fill="#8B5E3C"
                  opacity="0.5"
                />

                <rect
                  x="50"
                  y="105"
                  width="240"
                  height="65"
                  rx="10"
                  fill="#C6A27E"
                  opacity="0.32"
                />

                <rect
                  x="50"
                  y="168"
                  width="30"
                  height="14"
                  rx="4"
                  fill="#8B5E3C"
                  opacity="0.4"
                />

                <rect
                  x="260"
                  y="168"
                  width="30"
                  height="14"
                  rx="4"
                  fill="#8B5E3C"
                  opacity="0.4"
                />

                <ellipse
                  cx="170"
                  cy="185"
                  rx="130"
                  ry="6"
                  fill="#C6A27E"
                  opacity="0.1"
                />
              </svg>
            </div>

          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col lg:flex-row gap-5 px-4 sm:px-6 py-5 items-start">
          <FilterSidebar />
          <div className="flex-1 min-w-0 w-full lg:pl-5">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 lg:items-center lg:justify-between bg-white rounded-[10px] border-[0.5px] border-[#E8E0D5] px-4.5 py-4.5 mb-4.5">
              <span className="text-[12px] text-[#6B7280]">
                <strong className="text-[#1E1E1E] font-medium">128</strong>
                . products found
              </span>
              <div className='flex flex-wrap items-center gap-2'>
                <div className='flex flex-wrap items-center gap-2'>
                  <SortBar />
                </div>
              </div>
            </div>

            {/* product cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
              {
                products?.data.length === 0 ? (
                  <div className='font-medium text-lg'>
                    No Products
                  </div>
                ) :
                  products?.data.map((product) => {
                    return <ProductCard key={product._id} product={product} />
                  })
              }

              <div className='col-span-1 sm:col-span-2 xl:col-span-3 bg-[#2C2016] w-full rounded-[10px] px-4 sm:px-6 py-4.5 my-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
                <div >
                  <div className='text-[12px] text-[#D6BFA7] tracking-[0.06em]'>Limited Time Offer</div>
                  <div className='text-[16px] text-[#FAF7F4] font-normal my-1'>Free White Glove Delivery on orders above ₹75,000</div>
                </div>
                <button className='w-full sm:w-auto bg-[#8B5E3C] text-[#FFF8F3] text-[11px] px-4.5 py-2.25 rounded-sm tracking-[0.08em] cursor-pointer 
               border-0 whitespace-nowrap font-inherit'>Shop Now →</button>
              </div>
            </div>
            {/*  */}
            <Pagination pages={products?.pages || 1} />
          </div>
        </div>
      </section>
    </>
  )
}