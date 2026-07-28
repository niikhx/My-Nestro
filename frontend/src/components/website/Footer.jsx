import Link from "next/link";
import {
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-8 bg-[#1A0D02] text-[#A88B73]">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <h2 className="text-[18px] font-semibold tracking-widest text-[#F5E6D3] mb-3">
              NESTRO.
            </h2>

            <p className="text-sm leading-7 mb-8 max-w-md mx-auto lg:mx-0">
              Curated furniture for thoughtful homes.
              Crafted with intention, made to endure.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row w-full max-w-[500px] mx-auto lg:mx-0 overflow-hidden rounded-lg border border-[#4B382A]">

              <input
                type="email"
                placeholder="Your email address"
                className="
                  flex-1
                  bg-[#2B1A0F]
                  px-5 py-3
                  text-white
                  placeholder:text-gray-400
                  outline-none
                "
              />

              <button
                className="
                  sm:w-[150px]
                  py-3
                  cursor-pointer
                  bg-[#B07A4A]
                  text-white
                  font-medium
                  hover:bg-[#9a673b]
                  transition
                "
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Company */}
          <div className="text-center lg:text-left">
            <h3 className="text-xs tracking-[3px] uppercase text-[#D3A373] mb-6">
              Company
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Our Story
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Sustainability
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Showrooms
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center lg:text-left">
            <h3 className="text-xs tracking-[3px] uppercase text-[#D3A373] mb-6">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Track Order
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Returns & Exchange
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Assembly Help
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center lg:text-left">
            <h3 className="text-xs tracking-[3px] uppercase text-[#D3A373] mb-6">
              Follow Us
            </h3>

            <ul className="space-y-3 text-sm mb-6">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Instagram
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Pinterest
                </Link>
              </li>

              <li>
                <Link href="/" className="hover:text-white transition">
                  Houzz
                </Link>
              </li>
            </ul>

            <div className="flex justify-center lg:justify-start gap-4">
              <Link
                href="/"
                className="
                  w-10 h-10 rounded-full
                  border border-[#5C4737]
                  flex items-center justify-center
                  hover:border-white
                  hover:text-white
                  transition
                "
              >
                <FaInstagram />
              </Link>

              <Link
                href="/"
                className="
                  w-10 h-10 rounded-full
                  border border-[#5C4737]
                  flex items-center justify-center
                  hover:border-white
                  hover:text-white
                  transition
                "
              >
                <FaPinterestP />
              </Link>

              <Link
                href="/"
                className="
                  w-10 h-10 rounded-full
                  border border-[#5C4737]
                  flex items-center justify-center
                  hover:border-white
                  hover:text-white
                  transition
                "
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#3A281C] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

          <p className="text-xs">
            © 2026 Nestro. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
            <Link href="/" className="hover:text-white transition">
              Privacy
            </Link>

            <span>•</span>

            <Link href="/" className="hover:text-white transition">
              Terms
            </Link>

            <span>•</span>

            <Link href="/" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}