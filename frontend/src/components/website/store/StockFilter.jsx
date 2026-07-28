'use client'
import { useRouter, useSearchParams } from 'next/navigation'; // Sahi import yahan hai!
import React from 'react'

export default function InStockFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check karega ki URL mein stock=true hai ya nahi
  const isChecked = searchParams.get("stock") === "true";

  function stockHandler(e) {
    const params = new URLSearchParams(searchParams.toString());

    // Agar checkbox tick hua toh URL mein stock=true set hoga, nahi toh delete ho jayega
    if (e.target.checked) {
      params.set("stock", "inStock");
    } else {
      params.delete("stock");
    }

    router.push(`/store?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={stockHandler}
        className="w-4 h-4 rounded border-[#C6A27E] accent-[#8B5E3C]"
      />
      <span className="text-[12px] text-[#1E1E1E] group-hover:text-[#8B5E3C] transition-colors">
        In Stock Only
      </span>
    </label>
  );
}