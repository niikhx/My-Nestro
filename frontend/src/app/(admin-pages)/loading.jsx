export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center px-4">
      <div className="text-center">

        {/* Logo Loader */}
        <div className="relative mx-auto w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-[#E8E2DA]"></div>

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#8C6239] animate-spin"></div>

          <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-[#8C6239] text-xl font-semibold">
              N
            </span>
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="mt-8 text-3xl font-medium tracking-wide text-[#1A1A1A]">
          Nestro
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm tracking-[0.25em] uppercase text-[#8C6239]">
          Luxury Furniture & Living
        </p>

        {/* Loading Text */}
        <div className="mt-8 flex justify-center gap-2">
          <span className="w-2 h-2 bg-[#8C6239] rounded-full animate-bounce"></span>
          <span
            className="w-2 h-2 bg-[#8C6239] rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-2 h-2 bg-[#8C6239] rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>

        <p className="mt-5 text-[#666666] text-sm">
          Crafting your experience...
        </p>
      </div>
    </div>
  );
}