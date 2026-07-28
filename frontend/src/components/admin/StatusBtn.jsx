'use client'
import { client } from '@/utils/helper'
import React from 'react'
import { toast } from 'sonner';
import { GoDotFill } from 'react-icons/go';
import { useRouter } from 'next/navigation';

export default function StatusBtn({ status, path }) {
  const router = useRouter()

  function statusHandler() {
    client.patch(path)
      .then((response) => {
        if (response.data.success) {
          // Fixed spelling: message instead of massage
          toast.success(response.data.message || 'Status updated successfully!')
          router.refresh()
        }
      })
      .catch((error) => {
        // Fixed spelling: message instead of massage
        toast.error(error.response?.data?.message || 'Internal Server Error')
      })
  }

  return (
    <>
      {status ? (
        <button
          onClick={statusHandler}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border border-emerald-200 hover:bg-emerald-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
        >
          <GoDotFill className="w-3 h-3 text-emerald-500 animate-pulse" />
          Active
        </button>
      ) : (
        <button
          onClick={statusHandler}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1"
        >
          <GoDotFill className="w-3 h-3 text-slate-400" />
          Inactive
        </button>
      )}
    </>
  )
}