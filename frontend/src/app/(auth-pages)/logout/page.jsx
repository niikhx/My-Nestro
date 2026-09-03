'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { client } from '@/utils/helper'

export default function DeleteAccount() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setCredentials((previous) => ({ ...previous, [name]: value }))
  }

  async function handleDelete(event) {
    event.preventDefault()

    if (!confirmed) {
      toast.error('Please confirm that you want to delete your account')
      return
    }

    try {
      setLoading(true)
      const response = await client.post('/user/delete-account', credentials)

      if (!response.data.success) {
        toast.error(response.data.message || 'Unable to delete account')
        return
      }

      localStorage.removeItem('cart')
      toast.success('Your account has been deleted')
      router.push('/')
      router.refresh()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Email or password is incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <section className="w-full lg:w-[40%] bg-[#2C1A12] flex items-center justify-center px-6 md:px-10 py-12 lg:py-0">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-white tracking-[0.25em] text-[18px] font-medium mb-10 md:mb-16">
            NESTRO.
          </h2>

          <div className="flex justify-center mb-12">
            <div className="relative w-30 h-20">
              <div className="absolute bottom-0 left-0 right-0 h-16 rounded-lg bg-[#8F7259]/60" />
              <div className="absolute top-0 left-2 w-10 h-9 rounded-lg bg-[#B39A82]/40" />
              <div className="absolute top-0 right-2 w-10 h-9 rounded-lg bg-[#B39A82]/40" />
            </div>
          </div>

          <h1 className="text-white text-[28px] md:text-[30px] lg:text-[31px] leading-[1.15] font-medium">
            Your home, <span className="italic text-[#C69A72]">your choice</span>
          </h1>
          <p className="mt-2 text-[#B7A89A] text-[10px] md:text-[12px] leading-7">
            We are sorry to see you go. You can always create a new account later.
          </p>
        </div>
      </section>

      <section className="w-full lg:w-[60%] bg-[#FAF8F5] flex items-center justify-center px-6 py-10 lg:py-0">
        <div className="w-full max-w-sm py-8">
          <div className="flex items-center gap-6 border-b border-[#E4DDD5]">
            <span className="text-[12px] pb-4 text-[#8B5E3C] border-b-2 border-[#8B5E3C] font-medium">
              Delete account
            </span>
            <Link href="/" className="text-[12px] pb-4 text-[#7B7B7B] hover:text-[#8B5E3C] transition-colors">
              Stay Here
            </Link>
          </div>

          <div className="mt-4">
            <h2 className="text-[20px] font-medium text-[#111111]">Delete your account</h2>
            <p className="mt-2 text-[#6D6D6D] text-[11px]">
              Enter your account details to permanently remove your account.
            </p>
          </div>

          <form onSubmit={handleDelete} className="mt-4 space-y-3">
            <div>
              <label htmlFor="delete-email" className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                Email address
              </label>
              <input
                id="delete-email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="enter email"
                required
                className="w-full h-9 rounded-lg border border-[#D8D0C8] bg-white px-3 text-[13px] outline-none focus:border-[#8B5E3C]"
              />
            </div>

            <div>
              <label htmlFor="delete-password" className="block text-[11px] text-[#8C8275] mb-1 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="delete-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="enter password"
                  required
                  className="w-full h-9 rounded-lg border border-[#D8D0C8] bg-white px-3 pr-10 text-[13px] outline-none focus:border-[#8B5E3C]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8275] hover:text-[#8B5E3C]"
                >
                  {showPassword ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                </button>
              </div>
            </div>

            <label htmlFor="delete-confirmation" className="flex items-start gap-2 pt-1 cursor-pointer">
              <input
                id="delete-confirmation"
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 rounded accent-[#8B5E3C]"
              />
              <span className="text-[11px] leading-4 text-[#6E655A]">
                I understand that my account and saved data will be permanently deleted.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !confirmed}
              className="w-full h-10 rounded-lg bg-[#8B5E3C] text-white text-[13px] font-medium hover:opacity-95 transition mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Deleting account...' : 'Delete account'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-[12px] text-[#6E655A]">
              Changed your mind?{' '}
              <Link href="/" className="text-[#8B5E3C] font-medium hover:underline">
                Keep my account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
