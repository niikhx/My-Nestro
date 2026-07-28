"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState, use, useEffect } from "react";
import { client } from "@/utils/helper";

import {
  FiSave,
  FiTag
} from "react-icons/fi";

import { fetchProductById } from "@/utils/api";
export default function AddCategoryUI({ params }) {
  const [formData, setFormData] = useState([]);
  const { prod_id } = use(params);
  const router = useRouter();

  // Fetch category
  useEffect(() => {
    const getProduct = async () => {

      try {
        const response = await fetchProductById(prod_id);
        if (!response.success) {
          throw new Error("Prod not found" || response.message);
        }
        const data = response.data;
        setFormData(data || [])

      } catch (err) {
        toast.error(
          err.message || "Failed to load category"
        );
      }
    }
    getProduct();
  }, [prod_id]);


  async function submitHandler(e) {
    e.preventDefault();


    try {
      const form = new FormData();

      for (const image of e.target.images.files) {
        form.append("images", image)
      }

      const response = await client.post(`product/add-images/${prod_id}`, form)
      if (response.data.success) {
        toast.success(response.data.massage);

      }

    }
    
    catch (error) {
      toast.error(
        error.response?.data?.message || "Internal server error"
      )

    }
    router.push("/admin/product")
  }



  return (

    <div className="min-h-screen bg-[#f6f7fb] p-6">

      <div className="max-w-4xl mx-auto">


        <div className="mb-5">

          <h1 className="text-2xl font-bold text-[#27335f]">
            Add Images
          </h1>

          <p className="text-sm text-gray-500">
            Create new product images
          </p>

        </div>



        <form onSubmit={submitHandler} className="bg-white rounded-2xl shadow border overflow-hidden">


          <div className="bg-[#3b497e] text-white p-5 flex gap-3 items-center">

            <FiTag />

            <h2 className="font-semibold">
              Product Details
            </h2>

          </div>


          <div className="p-6 space-y-5">

            <div>

              <label className="text-sm font-medium">
                Image
              </label>

              <input
                type="file"
                multiple
                name="images"
                className="input bg-gray-50"
              />

            </div>
            <div className="flex gap-10">
              {
                formData?.images?.map((img, index) => {
                  return <img src={img} key={index} width="50" height="50" />
                })
              }


            </div>




            <div className="flex justify-end gap-3 pt-3">



              <button className="flex gap-2 items-center bg-[#3b497e] text-white px-5 py-2 rounded-xl">

                <FiSave />

                Save

              </button>


            </div>



          </div>



        </form>


      </div>


    </div>

  )
}