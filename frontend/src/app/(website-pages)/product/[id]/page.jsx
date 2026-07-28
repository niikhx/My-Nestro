import React from 'react';
import { fetchProduct } from '@/utils/api'; // Single product API call ya general fetcher
import CartButton from '@/components/website/home/AddBtn';

export default async function ProductDetailPage({ params }) {
  const { id } = await params; // Next.js 15+ ke liye await zaroori hai

  // Aapki API ke hisab se product fetch karein
  const res = await fetchProduct({ id });
  const product = res?.data?.[0] || res?.data || null;

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Product not found!
      </div>
    );
  }

  const productImage = product.thumbnail || product.images?.[0] || "https://placehold.co/600x400";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="bg-[#F5F0EB] rounded-2xl overflow-hidden p-4">
          <img
            src={productImage}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest text-[#8B5E3C]">
            {product.categoryId?.name || "Furniture"}
          </span>
          <h1 className="text-3xl font-medium text-[#1E1E1E]">{product.name}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#1E1E1E]">
              ₹{product.salePrice?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.salePrice && (
              <span className="text-base text-gray-400 line-through">
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description || "High quality furniture piece crafted for your space."}
          </p>

          <div className="mt-4 w-full max-w-[200px]">
            <CartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}