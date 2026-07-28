"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "sonner";
import { client } from "@/utils/helper";

export default function SignUp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await client.post("/user/register", formData);

      if (response.data.success) {
        toast.success(response.data.massage);
        router.push(`/otpverify?email=${formData.email}`)
        setFormData({
          name: "",
          email: "",
          password: "",
        });

      }
    } catch (error) {
      toast.error(
        error.response?.data?.massage || "Internal Server Error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Join us today
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Name
            </label>

            <div className="flex items-center border rounded-lg px-3 focus-within:border-black">
              <FaUser className="text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                placeholder="Enter your name"
                required
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <div className="flex items-center border rounded-lg px-3 focus-within:border-black">
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                required
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="flex items-center border rounded-lg px-3 focus-within:border-black">
              <FaLock className="text-gray-400" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Enter your password"
                required
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}