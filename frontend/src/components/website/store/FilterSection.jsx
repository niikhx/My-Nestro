'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import React from 'react'


export default function FilterSection({
  title,
  data = [],
  queryKey = ""
}) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const selectedValue = searchParams.get(queryKey)?.split(',') || [];
  function changeHandler(value) {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = params.get(queryKey)?.split(',') || [];
    let updatedValue = [...currentValue];
    if (currentValue.includes(value)) {
      updatedValue = currentValue.filter((v) => v !== value);
    }
    else {
      updatedValue.push(value)
    }
    if (updatedValue.length > 0) {
      params.set(queryKey, updatedValue.join(','));
    } else {
      params.delete(queryKey)
    }
    router.push(`/store?${params.toString()}`)
  }
  return (
    <section className='border-b border-stone-200 pb-7 last:border-none last:pb-0"'>
      <h3 className="mb-5 text-base font-semibold tracking-wide text-stone-900">
        {title}
      </h3>

      <div className="space-y-3">
        {data.map((item) => {
          const active = selectedValue.includes(item.slug)
          return (
            <label
              key={item._id}
              className="group flex cursor-pointer items-center justify-between rounded-lg border border-stone-200 bg-white px-3 py-3 transition hover:border-stone-300 hover:bg-stone-50"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => changeHandler(item.slug)}
                  className="h-4 w-4 rounded border-stone-300 accent-amber-700"
                />

                <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">
                  {item.name}
                </span>
              </div>
              <span className="text-xs text-stone-400">
                {item.count || 0}
              </span>
            </label>
          )
        })
        }

      </div>
    </section>
  )
}
