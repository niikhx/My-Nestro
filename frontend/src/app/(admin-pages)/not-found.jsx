import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">

        {/* 404 Circle */}
        <div className="mx-auto w-40 h-40 rounded-full border-4 border-[#E8E2DA] bg-white flex items-center justify-center shadow-sm">
          <h1 className="text-6xl font-semibold text-[#8C6239]">
            404
          </h1>
        </div>

        {/* Label */}
        <p className="mt-8 text-sm tracking-[0.3em] uppercase text-[#8C6239]">
          Page Not Found
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-4xl font-medium text-[#1A1A1A]">
          This room doesn't exist
        </h2>

        {/* Description */}
        <p className="mt-4 text-[#666666] leading-relaxed max-w-lg mx-auto">
          The page you're looking for may have been moved,
          renamed, or is temporarily unavailable.
        </p>

        {/* Decorative Line */}
        <div className="w-24 h-[2px] bg-[#8C6239] mx-auto mt-8 opacity-40"></div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-8 h-12 inline-flex items-center justify-center bg-[#8C6239] text-white rounded-xl hover:opacity-90 transition"
          >
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 h-12 border border-[#D8D2CA] text-[#1A1A1A] rounded-xl hover:bg-white transition"
          >
            Go Back
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-12 text-xs tracking-[0.2em] uppercase text-[#999999]">
          Nestro • Luxury Furniture & Living
        </p>
      </div>
    </div>
  );
}