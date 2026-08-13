import {
  CiDeliveryTruck,
  CiCreditCard1,
  CiMedal,
  CiHeadphones,
} from "react-icons/ci";
import React from 'react';
import CategorySlider from "@website/home/Category";
import BestSellers from "@/components/website/home/BestSeller";
import ShopByRoom from "@/components/website/home/ShopByRoom";
export default function page() {
  const services = [
    {
      title: "Free Delivery",
      desc: "On orders above ₹50,000",
      icon: <CiDeliveryTruck className="text-3xl text-[#8B5E3C]" />,
    },
    {
      title: "Secure Payment",
      desc: "100% protected transactions",
      icon: <CiCreditCard1 className="text-3xl text-[#8B5E3C]" />,
    },
    {
      title: "Premium Quality",
      desc: "Crafted with finest wood",
      icon: <CiMedal className="text-3xl text-[#8B5E3C]" />,
    },
    {
      title: "24/7 Support",
      desc: "Always here to help you",
      icon: <CiHeadphones className="text-3xl text-[#8B5E3C]" />,
    },
  ];
 
  return (
    <>
      <section className="mx-6 my-5 bg-[#2C2016] rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between">

        {/* Content */}
        <div className="p-4 lg:p-10 z-10 w-full lg:w-1/2">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#C8A27A] mb-2">
            Summer Collection 2026
          </p>

          <h1 className="text-3xl lg:text-[42px] font-normal text-[#FAF7F4] leading-[1.15] tracking-[-0.03em] mb-2">
            Where Comfort
            <br />
            Meets <em className="italic text-[#D8B18A]">Craft</em>
          </h1>

          <p className="text-[13px] text-white/50 leading-[1.75] max-w-[340px] mb-7">
            Scandinavian-inspired furniture for modern living.
            Curated pieces that endure seasons.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 bg-[#B07A4A] text-white rounded-md">
              Show Collection
            </button>

            <button className="px-6 py-2 border border-[#B07A4A] text-[#B07A4A] rounded-md">
              View LookBook
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center rounded-4xl items-center">
          <img
            src="/images/Gaga.jpg"
            alt="Furniture"
            className="w-[280px] sm:w-[350px] lg:w-[500px] h-auto object-contain"
          />
        </div>

      </section>
      <section className="px-4 sm:px-6 pt-8">
        <div className="uppercase tracking-widest text-[10px] sm:text-[12px] text-[#8b5e3c]">
          Browse
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-5">
          <h2 className="text-xl sm:text-2xl font-medium">
            Shop by Category
          </h2>

          <button className="w-fit text-[11px] text-[#8B5E3C] border-b border-[#C8A27A]">
            View All
          </button>
        </div>
        <CategorySlider />
      </section>

      {/* Featured Products */}
      <section>
        <BestSellers />
      </section>
      {/* Landed space */}
      <section className="px-4 sm:px-6 pt-8">

        <div className="uppercase tracking-widest text-[10px] sm:text-[12px] text-[#8b5e3c]">
          New Arrivals
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-5">

          <h2 className="text-xl sm:text-2xl font-medium">
            Just Landed
          </h2>

          <button className="w-fit text-[11px] sm:text-xs text-[#8B5E3C] border-b border-[#C8A27A] hover:text-[#6d472b] transition-colors">
            View All
          </button>

        </div>

      </section>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 my-4">

        {/* Featured Card */}
        <div className="lg:col-span-6 bg-[#24150D] rounded-2xl p-8 relative min-h-[320px] overflow-hidden">

          <p className="text-[10px] tracking-[0.22em] uppercase text-[#C8A27A] mb-3">
            Featured
          </p>

          <h2 className="text-[20px] text-white leading-tight mb-2">
            Scandinavian
            <br />
            Dining Set
          </h2>

          <p className="text-white/50 text-sm mb-5">
            Ash wood + linen chairs. Set of 4.
          </p>

          <h3 className="text-[#E8C6A3] text-[18px] font-medium mb-10">
            ₹1,24,000
          </h3>

          <button className="bg-[#8B5E3C] text-white px-5 py-1 rounded-md text-sm hover:bg-[#73492c] transition mt-20">
            View in Store
          </button>

          {/* Furniture Image */}
         
        </div>

        {/* Middle Cards */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          <div className="rounded-2xl hover:-translate-y-0.5 transition-all overflow-hidden border border-gray-200 bg-white">
            <div className="h-24 bg-[#EFE8DF] flex items-center justify-center">
             
            </div>

            <div className="p-2">
              <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400">
                Bedroom
              </p>

              <h3 className="text-[14px]">
                Linen Wardrobe
              </h3>

              <div className="flex justify-between mt-1">
                <span className="text-[#C8A27A] text-xs">
                  ★★★★★
                </span>

                <span className="font-semibold text-[14px]">
                  ₹1,18,000
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl hover:-translate-y-0.5 transition-all overflow-hidden border border-gray-200 bg-white">
            <div className="h-24 bg-[#EFE8DF] flex items-center justify-center">
             
            </div>

            <div className="p-2">
              <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400">
                Media
              </p>

              <h3 className="text-[14px]">
                Walnut TV Console
              </h3>

              <div className="flex justify-between mt-1">
                <span className="text-[#C8A27A] text-xs">
                  ★★★★★
                </span>

                <span className="font-semibold text-[14px]">
                  ₹6,70,000
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {/* Offer */}
          <div className="bg-[#F5F0EB] border border-[#E5D8CC] rounded-2xl p-2">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B5E3C] mb-2">
              Offer
            </p>

            <h3 className="text-[16px] font-medium mb-1">
              First order 15% off
            </h3>

            <p className="text-[14px] text-gray-500 mb-4">
              Use code Nestro15 at checkout
            </p>

            <button className="font-semibold bg-[#8B5E3C] text-white px-4 py-1 rounded-md text-[12px]">
              Shope Now
            </button>
          </div>

          {/* Delivery */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex-1">
            <p className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mb-1">
              Free Delivery
            </p>

            <h3 className="text-[14px] font-medium">
              On orders above ₹50,000
            </h3>

            <p className="text-[12px] text-gray-500">
              White glove service. Assembly included.
            </p>

            <div className="text-3xl mt-6">
              <CiDeliveryTruck />
            </div>
          </div>

        </div>

      </section>
      <section className="px-4 sm:px-6 pt-8">
        <div className="uppercase tracking-widest text-[10px] sm:text-[12px] text-[#8b5e3c]">
          New Arrivals
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-5">

          <h2 className="text-xl sm:text-2xl font-medium">
            Just Landed
          </h2>

          <button className="w-fit text-[11px] sm:text-xs text-[#8B5E3C] border-b border-[#C8A27A] hover:text-[#6d472b] transition-colors">
            View All
          </button>

        </div>
  <ShopByRoom />
</section>
      
      {/* USP Section */}
      <section className="px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

          {services.map((item, index) => (
            <div
              key={index}
              className="
          bg-white border border-gray-200
          rounded-2xl p-4 sm:p-6
          text-center
          hover:shadow-lg
          hover:-translate-y-1
          transition-all duration-300
        "
            >
              {/* Icon */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="text-2xl sm:text-3xl">
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] sm:text-xs text-gray-500 leading-4 sm:leading-5">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 pt-8">

        {/* Heading */}
        <div className="mb-5">
          <div className="uppercase tracking-widest text-[10px] sm:text-[11px] text-[#8b5e3c]">
            What our customers say
          </div>

          <h2 className="text-xl sm:text-2xl font-medium">
            Loved by 12,000+ homes
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
          bg-white border border-gray-200
          rounded-2xl p-4 sm:p-5
          hover:shadow-lg
          hover:-translate-y-1
          transition-all duration-300
        "
            >
              {/* Rating */}
              <div className="text-[#C8A27A] text-sm mb-3">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-xs sm:text-sm italic text-gray-600 leading-6 mb-5">
                Beautiful craftsmanship and premium quality furniture.
                The design perfectly complements our home interior.
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="
            w-10 h-10 rounded-full
            bg-[#F0EBE3]
            flex items-center justify-center
            text-[#8B5E3C]
            font-semibold
          ">
                  NM
                </div>

                <div>
                  <h4 className="text-sm font-medium">
                    Niikhx
                  </h4>

                  <p className="text-xs text-gray-400">
                    Rajasthan, Tonk
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="mx-4 sm:mx-6 my-8 bg-[#1A0D02] rounded-2xl px-6 py-8 lg:px-10 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left Content */}
          <div className="text-center lg:text-left max-w-md">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#C8A27A] mb-2">
              Stay in the loop
            </p>

            <h3 className="text-2xl lg:text-3xl font-medium text-white mb-3">
              Design tips & new arrivals
            </h3>

            <p className="text-sm text-white/60 leading-6">
              Join 8,000+ subscribers who receive exclusive
              collections, offers and interior inspiration.
            </p>
          </div>

          {/* Subscribe Form */}
          <form className="w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row w-full lg:w-[450px]">
              <input
                type="email"
                placeholder="Your E-mail Address"
                className="
            flex-1
            bg-white/10
            border border-[#C8A27A]/40
            px-4 py-3
            text-white
            placeholder:text-white/40
            outline-none
            rounded-lg sm:rounded-r-none
            focus:border-[#C8A27A]
          "
              />

              <button
                className="
            mt-3 sm:mt-0
            bg-[#8B5E3C]
            hover:bg-[#72492d]
            text-white
            px-6 py-3
            rounded-lg sm:rounded-l-none
            transition-all duration-300
          "
              >
                Subscribe
              </button>
            </div>
          </form>

        </div>
      </section>
    </>
  )
}
