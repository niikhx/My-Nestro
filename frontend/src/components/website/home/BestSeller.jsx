import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCart'; // अपना सही पाथ चेक कर लें
import { fetchProduct } from '@/utils/api';

export default async function BestSellers() {
  // 1. Easy Approach: डायरेक्ट API फंक्शन से bestSeller: true पास करके डेटा फेच करें
  const res = await fetchProduct({ bestSeller: true, status: true });
  const products = res?.data || [];

  return (
    <section className="w-full px-4 sm:px-6 pt-8">

      {/* Heading Section */}
      <div className="uppercase tracking-widest text-[10px] sm:text-[12px] text-[#8b5e3c]">
        Handpicked for you
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-medium">
          Best Sellers
        </h2>

        <Link
          href="/store"
          className="w-fit text-[11px] text-[#8B5E3C] border-b border-[#C8A27A] hover:text-[#C8A27A] transition-colors duration-200"
        >
          View All
        </Link>
      </div>

      {/* Fully Responsive Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10 font-medium">
            No Best Seller Products Found
          </div>
        ) : (
          // 2. आपके ProductCard कंपोनेंट का यूज़ करके डेटा मैप किया
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

    </section>
  );
}