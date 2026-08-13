"use client";

import { client } from '@/utils/helper';
import { toast } from 'sonner';
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCategoryById } from "@/utils/api";

export default function EditCategory({ params }) {
  const { category_id } = use(params);
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState("");
  const [initialData, setInitialData] = useState(null); // Reset ke liye original data store karne ke liye
  const [formdata, setFormdata] = useState({
    name: "",
    slug: "",
    image: null
  });

  // Get category data by id
  useEffect(() => {
    const getData = async () => {
      const { data, success } = await fetchCategoryById(category_id);

      if (success) {
        const loadedData = {
          name: data?.name || "",
          slug: data?.slug || "",
          image: data?.image || null, // Yeh initially string (URL) ho sakta hai
        };
        setFormdata(loadedData);
        setInitialData(loadedData); // Copy saved for reset
        setImagePreview(data?.image || "");
      }
    };

    if (category_id) {
      getData();
    }
  }, [category_id]);

  // Clean up Object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
    const image = e.target.files[0];
    if (!image) return;

    setFormdata({ ...formdata, image });
    setImagePreview(URL.createObjectURL(image));
  }

  function submitHandler(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formdata.name);
    form.append("slug", formdata.slug);

    // Agar image naya file object hai tabhi bheinjiye, string URL backend par crash kar sakta hai
    if (formdata.image instanceof File) {
      form.append("image", formdata.image);
    }

    client.put(`category/edit/${category_id}`, form)
      .then((response) => {
        if (response.data.success) {
          // "message" fix kiya gaya
          toast.success(response.data.message || "Category updated successfully!");
          router.push("/admin/category");
        }
      })
      .catch((error) => {
        // "message" fix kiya gaya
        toast.error(error.response?.data?.message || 'Internal Server Error');
      });
  }

  function resetHandler() {
    if (initialData) {
      setFormdata(initialData);
      setImagePreview(initialData.image || "");
    }
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
            Edit Category
          </h1>

          <p className="mt-2 text-sm text-[#666666]">
            Edit your category to organize your products.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="p-8 space-y-6">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Edit Category Name
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

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Edit Image
            </label>

            <input
              type="file"
              name="image"
              onChange={imageHandler}
              accept="image/*" // Sirf images select karne dene ke liye
              className="w-full pt-4 h-14 px-4 border border-[#D8D2CA] rounded-xl outline-none transition-all duration-300 focus:border-[#8C6239]"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                className="w-24 h-24 mt-5 object-cover rounded-lg border border-[#D8D2CA]"
                alt="Category Preview"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-8 h-14 bg-[#8C6239] text-white rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
            >
              Edit Category
            </button>

            <button
              type="button"
              onClick={resetHandler}
              className="px-8 h-14 border border-[#D8D2CA] text-[#1A1A1A] rounded-xl hover:bg-[#F8F5F1] transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}