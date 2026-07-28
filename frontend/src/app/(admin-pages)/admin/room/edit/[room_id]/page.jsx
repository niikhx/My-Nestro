"use client";

import { client } from '@/utils/helper';
import { toast } from 'sonner';
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCategoryById, fetchRoomById } from "@/utils/api";

export default function EditCategory({ params }) {
  const { room_id } = use(params)
  const router = useRouter()
  useEffect(() => {
    const getData = async () => {
      const { data, success } = await fetchRoomById(room_id);
      if (success) {
        setFormdata({
          name: data?.name || "",
          slug: data?.slug || ""
        })
      }
    };

    if (room_id) {
      getData();
    }
  }, [room_id]);


  const [formdata, setFormdata] = useState({
    name: "",
    slug: ""
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


  function submitHandler(e) {

    e.preventDefault();
    client.put(`room/edit/${room_id}`, formdata).then(
      (response) => {
        if (response.data.success) {
          toast.success(response.data.massage)
          setFormdata({
            name: "",
            slug: ""
          });
        }
        router.push("/admin/room")
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
            Edit Room
          </h1>

          <p className="mt-2 text-sm text-[#666666]">
            Edit your room to organize your products.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="p-8 space-y-6">

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Edit Room Name
            </label>

            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={changeHandler}
              placeholder="Enter room name"
              className="w-full h-14 px-4 border border-[#D8D2CA] rounded-xl outline-none transition-all duration-300 focus:border-[#8C6239]"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
             Room Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formdata.slug}
              onChange={changeHandler}
              placeholder="room-slug"
              className="w-full h-14 px-4 border border-[#D8D2CA] rounded-xl outline-none transition-all duration-300 focus:border-[#8C6239]"
              required
            />

            <p className="mt-2 text-xs text-[#8A8A8A]">
              URL-friendly version of the room name.
            </p>
          </div>


          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="px-8 h-14 bg-[#8C6239] text-white rounded-xl font-medium hover:opacity-90 transition"
            >
              Edit Room
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