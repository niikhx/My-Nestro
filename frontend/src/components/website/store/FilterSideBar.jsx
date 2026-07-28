import { fetchCategory, fetchRoom } from "@/utils/api.js";
import FilterSection from "./FilterSection";
import PriceRangeFilter from "./PriceFilter";
import InStockFilter from "./StockFilter";


const colorSwatches = {
  Ivory: '#F5F0E8',
  Walnut: '#7B4F2E',
  Ebony: '#2C1810',
  Slate: '#6B7280',
}

const filterGroups = {
  category: ['Sofas', 'Chairs', 'Tables', 'Storage', 'Bedroom'],
  room: ['Living Room', 'Dining Room', 'Bedroom', 'Office'],
  material: ['Solid Wood', 'Velvet', 'Linen', 'Marble'],
  color: ['Ivory', 'Walnut', 'Ebony', 'Slate'],
}

export default async function FilterSidebar() {
  const categories = await fetchCategory();
  const rooms = await fetchRoom()
  return (
    <aside className="bg-white border border-[#E8E0D5] rounded-xl p-6 sticky
     top-[72px] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-[#1E1E1E]">Filters</p>
        <button className="text-[11px] text-[#a08875] hover:underline">
          Clear All
        </button>
      </div>

   <div>
        {/* Category */}
       <FilterSection title="Browse By Rooms"
       data={rooms.data}
       queryKey="room"/>

        {/* Room */}
        <FilterSection title="Browse By Category"
          data={categories.data}
          queryKey="category" />
   </div>

      {/* Price Range */}
      <PriceRangeFilter />

      {/* In Stock */}
 <InStockFilter />
    </aside>
  )
}

function FilterGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] tracking-[0.12em] uppercase text-[#6B7280] font-medium">
        {label}
      </p>
      {children}
    </div>
  )
}

function CheckboxRow({ label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-[#C6A27E] accent-[#8B5E3C]"
      />
      <span className="text-[12px] text-[#1E1E1E] group-hover:text-[#8B5E3C] transition-colors">
        {label}
      </span>
    </label>
  )
}