'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { client } from '@/utils/helper'
import { useDispatch } from 'react-redux'
import { emptyCart } from '@/redux/features/cartSlice'

export default function LogoutPage() {
  const router = useRouter()
  const dispatcher = useDispatch()

  useEffect(() => {
    async function logout() {
      try {
        await client.post('/user/logout')
        toast.success('Logged out successfully')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to log out')
      } finally {
        dispatcher(emptyCart())
        router.replace('/')
        router.refresh()
      }
    }

    logout()
  }, [dispatcher, router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
      <p className="text-sm text-[#6E655A]">Logging out...</p>
    </main>
  )
}
