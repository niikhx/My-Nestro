'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PriceRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL se initial values nikalna taaki reload par data gayab na ho
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("min") || "",
    max: searchParams.get("max") || ""
  });

  // Agar URL externally badle (jaise clear all se), toh inputs ko sync rakhne ke liye
  useEffect(() => {
    setPriceRange({
      min: searchParams.get("min") || "",
      max: searchParams.get("max") || ""
    });
  }, [searchParams]);

  function PriceHandler() {
    const params = new URLSearchParams(searchParams.toString());

    // Min price handle karna
    if (priceRange.min) {
      params.set("min", priceRange.min);
    } else {
      params.delete("min");
    }

    // Max price handle karna
    if (priceRange.max) {
      params.set("max", priceRange.max);
    } else {
      params.delete("max");
    }

    router.push(`/store?${params.toString()}`);
  }

  function clearFilter() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("min")
    params.delete("max");
    router.push(`/store?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <p className="text-[10px] tracking-[0.12em] uppercase text-[#6B7280] font-medium">
        Price Range
      </p>

      {/* Inputs aur Button */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceRange.min}
            placeholder="Min"
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full border border-[#E8E0D5] rounded-md px-2 py-1.5 text-[12px] text-[#1E1E1E] placeholder-[#aaa] outline-none focus:border-[#C6A27E] transition-colors"
          />

          <span className="text-xs text-[#6B7280]">–</span>

          <input
            type="number"
            value={priceRange.max}
            placeholder="Max"
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full border border-[#E8E0D5] rounded-md px-2 py-1.5 text-[12px] text-[#1E1E1E] placeholder-[#aaa] outline-none focus:border-[#C6A27E] transition-colors"
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={PriceHandler}
          type="button"
          className="w-full mt-1 bg-[#1E1E1E] hover:bg-[#C6A27E] text-white text-[12px] font-medium py-1.5 px-3 rounded-md transition-colors"
        >
          Apply Price
        </button>
        <button
          onClick={clearFilter}
          type="button"
          className="w-full mt-1 bg-[#1E1E1E] hover:bg-[#C6A27E] text-white text-[12px] font-medium py-1.5 px-3 rounded-md transition-colors"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
}