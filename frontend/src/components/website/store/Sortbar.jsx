'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "newest"
  );

  useEffect(() => {
    const currentSort = searchParams.get("sort");

    if (currentSort === sortBy) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortBy);

    router.push(`/store?${params.toString()}`);
  }, [sortBy, searchParams, router]);

  return (
    <div className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[11px] text-[#6B7280] hidden sm:block">
          Sort:
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-[#E8E0D5] rounded-md px-3 py-1.5 text-[12px] text-[#1E1E1E] bg-white outline-none cursor-pointer focus:border-[#C6A27E] transition-colors"
        >
          <option value="featured">Featured</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}