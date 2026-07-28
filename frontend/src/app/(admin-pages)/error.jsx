"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">

        {/* Error Icon */}
        <div className="mx-auto w-28 h-28 rounded-full border-4 border-[#E8E2DA] bg-white flex items-center justify-center shadow-sm">
          <span className="text-5xl text-[#8C6239]">!</span>
        </div>

        {/* Error Code */}
        <p className="mt-8 text-sm tracking-[0.3em] uppercase text-[#8C6239]">
          Something Went Wrong
        </p>

        {/* Heading */}
        <h1 className="mt-3 text-4xl font-medium text-[#1A1A1A]">
          We couldn't load this page
        </h1>

        {/* Description */}
        <p className="mt-4 text-[#666666] leading-relaxed">
          An unexpected issue occurred while processing your request.
          Please try again. If the problem persists, contact support.
        </p>

        {/* Development Error (optional) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 p-4 bg-white border border-[#E8E2DA] rounded-xl text-left">
            <p className="text-sm text-red-500 break-all">
              {error?.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-8 h-12 bg-[#8C6239] text-white rounded-xl hover:opacity-90 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.href = "/"}
            className="px-8 h-12 border border-[#D8D2CA] text-[#1A1A1A] rounded-xl hover:bg-white transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}