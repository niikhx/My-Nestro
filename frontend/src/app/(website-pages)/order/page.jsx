import React from 'react';
import Link from 'next/link';
export default async function OrderPlacedPage({ searchParams }) {
  const { order_id } = await searchParams;
  return (
    <div className="min-h-screen bg-[#F5F0EA] px-4 py-10 text-[#1F1A17] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[32px] border border-[#E7D9CC] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F4EAE1] text-4xl shadow-inner shadow-[#E6D2BF]">
              ✓
            </div>

            <p className="text-[10px] tracking-[0.22em] uppercase text-[#8B5E3C]">
              Order Confirmed
            </p>
            <h1 className="mt-3 text-3xl font-medium text-[#1B120D] sm:text-4xl">
              Your order has been placed successfully
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#5F4D45]">
              Thank you for shopping with Nestro. We have received your order and are preparing it for dispatch.
            </p>

            <div className="mt-8 w-full max-w-2xl rounded-[28px] border border-[#E7D9CC] bg-[#F9F5F2] p-5 sm:p-6">
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 text-left shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B5E3C]">
                    Order ID
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#1B120D]">
                    {order_id}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 text-left shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B5E3C]">
                    Delivery
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#1B120D]">
                    5-7 days
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 text-left shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B5E3C]">
                    Payment
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#1B120D]">
                    Prepaid
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="flex h-[52px] items-center justify-center rounded-2xl bg-[#8B5E3C] px-6 text-base font-medium text-white shadow-md transition hover:bg-[#73492d]">
                Track Order
              </button>
              <Link href="/">
                <button className="flex h-[52px] items-center justify-center rounded-2xl border border-[#D8C5B3] bg-white px-6 text-base font-medium text-[#3B2B26] transition hover:bg-[#F8F2EE]">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
