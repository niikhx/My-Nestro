'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { client } from '@/utils/helper'
import { useDispatch } from 'react-redux'
import { emptyCart } from '@/redux/features/cartSlice'

export default function LogoutPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      toast.error('Email and password are required')
      return
    }

    setSubmitting(true)
    try {
      const response = await client.post('/user/logout-with-credentials', {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      })

      if (response.data?.success) {
        dispatch(emptyCart())
        toast.success(response.data.message || 'Account deleted successfully')
        router.replace('/')
        router.refresh()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to logout')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <section className="w-full max-w-md rounded-2xl border border-[#E8E0D5] bg-white p-8 shadow-sm">
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#8B5E3C]">Account Session</p>
          <h1 className="mt-3 text-2xl font-semibold text-[#1E1E1E]">Confirm Credentials</h1>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-[#6E655A]">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-[#D8CDBF] rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-[#6E655A]">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-[#D8CDBF] rounded-lg px-4 py-3 outline-none focus:border-[#8B5E3C]"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <button
              type="button"
              onClick={handleLogout}
              disabled={submitting}
              className="w-full rounded-lg bg-[#1E1E1E] px-4 py-3 text-sm font-medium text-white hover:bg-[#8B5E3C] transition"
            >
              {submitting ? 'Please wait...' : 'Logout & Delete Account'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}
