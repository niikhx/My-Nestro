"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaShieldAlt } from "react-icons/fa";
import { toast } from "sonner";
import { client } from "@/utils/helper";

export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  function changeHandler(index, value) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Please enter 6 digit OTP");
    }

    try {
      setLoading(true);

      const response = await client.post("/user/verify-otp", {
        email,
        otp: Number(otpValue),
      });

      if (response.data.success) {
        toast.success(response.data.massage);
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.massage || "Internal Server Error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    try {
      const response = await client.post("/user/resend-otp", {
        email,
      });

      if (response.data.success) {
        toast.success(response.data.massage);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.massage || "Internal Server Error"
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center">
            <FaShieldAlt size={24} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={submitHandler}>
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  changeHandler(index, e.target.value)
                }
                className="w-12 h-12 border rounded-lg text-center text-xl outline-none focus:border-black"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Didn't receive code?

          <button
            onClick={resendOTP}
            className="ml-2 text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}