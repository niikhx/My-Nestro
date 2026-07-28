"use client";

import axios from "axios";
import { toast } from 'sonner';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    name: "",
    slug: "",
    image: null
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    if (name === "name") {
      setFormdata({
        ...formdata,
        name: value,
        slug: value 
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value,
      });
    }
  }

  function imageHandler(e) {
    const image = e.target.files[0]
    setFormdata({ ...formdata, image })
  }

  function submitHandler(e) {

    e.preventDefault();
    const form = new FormData()
    form.append("name", formdata.name)
    form.append("slug", formdata.slug)
    form.append("image", formdata.image)
    axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "category/create", form).then(
      (response) => {
        if (response.data.success) {
          toast.success(response.data.massage)
          setFormdata({
            name: "",
            slug: "",
            image: null
          });
        }
        router.push("/admin/category")
      }
    ).catch(
      (error) => {
        toast.error(error.response.data.massage || 'Internal Server Error')
      }
    )
    console.log(formdata);


  }

  function resetHandler() {
    setFormdata({
      name: "",
      slug: "",
      image: null
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-[#E8E2DA] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="px-8 py-6 border-b border-[#E8E2DA]">
          <span className="text-xs tracking-[0.25em] uppercase text-[#8C6239]">
            Nestro Admin
          </span>

          <h1 className="mt-2 text-3xl font-medium text-[#1A1A1A]">
            Create Category
          </h1>

          <p className="mt-2 text-sm text-[#666666]">
            Add a new category to organize your products.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="p-8 space-y-6">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={changeHandler}
              placeholder="Enter category name"
              className="w-full h-14 px-4 border border-[#D8D2CA] rounded-xl outline-none transition-all duration-300 focus:border-[#8C6239]"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formdata.slug}
              onChange={changeHandler}
              placeholder="category-slug"
              className="w-full h-14 px-4 border border-[#D8D2CA] rounded-xl outline-none transition-all duration-300 focus:border-[#8C6239]"
              required
            />

            <p className="mt-2 text-xs text-[#8A8A8A]">
              URL-friendly version of the category name.
            </p>
          </div>

          {/* {image} */}

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Image Upload
            </label>

            <input
              type="file"
              name="image"
              onChange={imageHandler}
              placeholder="Enter category name"
              className="w-full pt-4 h-14 px-4 border border-[#D8D2CA] rounded-xl outline-none transition-all duration-300 focus:border-[#8C6239]"
              required
            />
            {
              formdata.image &&
              <img src={URL.createObjectURL(formdata.image)} className="w-25 h-25 m-5" alt="" />
            }
          </div>


          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-8 h-14 bg-[#8C6239] text-white rounded-xl font-medium hover:opacity-90 transition"
            >
              Save Category
            </button>

            <button
              type="button"
              onClick={resetHandler}
              className="px-8 h-14 border border-[#D8D2CA] text-[#1A1A1A] rounded-xl hover:bg-[#F8F5F1] transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}