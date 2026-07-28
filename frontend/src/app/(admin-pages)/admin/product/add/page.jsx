"use client";

import { client } from "@/utils/helper";
import { useEffect, useState } from "react";
import Select from 'react-select';
import { Editor } from 'primereact/editor';
import { FiSave, FiTag } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchRoom, fetchCategory } from "@/utils/api";

export default function AddCategoryPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wait, setWait] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    roomId: "", categoryId: "", name: "", slug: "",
    originalPrice: "", salePrice: "", discount: "",
    shortDescription: "", description: "", material: "",
    color: "", width: "", height: "", depth: "", weight: "",
    image: null
  });


  // Rooms aur Categories load karne ke liye
  useEffect(() => {
    async function loadData() {
      try {
        const [roomRes, catRes] = await Promise.all([fetchRoom(), fetchCategory()]);
        setRooms(roomRes.data || roomRes || []);
        setCategories(catRes.data || catRes || []);
      } catch (err) {
        toast.error("Failed to load rooms or categories");
      }
    }
    loadData();
  }, []);

  // Automatic Discount Calculate karne ke liye
  useEffect(() => {
    const original = Number(formData.originalPrice);
    const sale = Number(formData.salePrice);

    if (original > 0 && sale >= 0 && sale <= original) {
      const liveDiscount = Math.round(((original - sale) / original) * 100);
      if (formData.discount !== liveDiscount) {
        setFormData(prev => ({ ...prev, discount: liveDiscount }));
      }
    } else if (formData.discount !== "") {
      setFormData(prev => ({ ...prev, discount: "" }));
    }
  }, [formData.originalPrice, formData.salePrice]);

  // Memory free karne ke liye (Image Preview cleanup)
  useEffect(() => {
    return () => imagePreview && URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  // Normal text aur number inputs ke liye
  const handleChange = (e) => {
    setFormData(prev => ({
       ...prev, [e.target.name]: e.target.value
       }));
  };

  // Name likhte hi automatic Slug banane ke liye
  const handleNameChange = (value) => {
    const cleanSlug = value.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    setFormData(prev => (
      { 
        ...prev, name: value, slug: cleanSlug 
      }
    ));
  };

  // Image upload aur preview ke liye
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple Form Validation Checks
    if (!formData.name.trim()) return toast.error("Product Name is required");
    if (!formData.roomId) return toast.error("Please select a Room");
    if (!formData.categoryId) return toast.error("Please select a Category");
    if (!formData.image) return toast.error("Product Image is required");

    try {
      setWait(true);
      const sendData = new FormData();
      const numberFields = ["originalPrice", "salePrice", "discount", "width", "height", "depth", "weight"];

      // Pure data ko loop karke clean karne ka sabse asan tarika
      for (const key in formData) {
        const value = formData[key];

        if (value !== null && value !== "") {
          const finalValue = numberFields.includes(key) ? Number(value) : value;
          sendData.append(key, finalValue);
        }
      }

      const response = await client.post("product/create", sendData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        toast.success(response.data.message || "Product added successfully!");
        router.push("/admin/product");
      } else {
        toast.error(response.data?.message || "Failed to create product");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setWait(false);
    }
  };[formData.originalPrice, formData.salePrice];

  return (
    <div className="min-h-screen mx-auto bg-[#f7f8fd] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-[#eef0f8] shadow-md overflow-hidden">

        <div className="bg-[#3b497e] px-5 py-4 flex items-center gap-2 text-white">
          <FiTag size={18} />
          <h2 className="text-[15px] font-semibold">Product Add</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">

          {/* Name & Slug */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2a3460]">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2a3460]">Slug</label>
              <input
                type="text"
                value={formData.slug}
                readOnly
                className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3 bg-gray-50"
              />
            </div>
          </div>

          {/* Room & Category */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-[#2a3460]">Room *</label>
              <Select
                options={rooms.map(room => ({ value: room._id, label: room.name }))}
                onChange={(selected) => setFormData(prev => ({ ...prev, roomId: selected ? selected.value : "" }))}
                placeholder="Select Room"
                isClearable
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#2a3460]">Category *</label>
              <Select
                options={categories.map(category => ({ value: category._id, label: category.name }))}
                onChange={(selected) => setFormData(prev => ({ ...prev, categoryId: selected ? selected.value : "" }))}
                placeholder="Select Category"
                isClearable
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2a3460]">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                placeholder="Original Price"
                value={formData.originalPrice}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2a3460]">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                placeholder="Sale Price"
                value={formData.salePrice}
                onChange={handleChange}
                className="border rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2a3460]">Discount %</label>
              <input
                type="number"
                name="discount"
                placeholder="Discount %"
                value={formData.discount}
                readOnly
                className="border rounded-xl px-4 py-3 bg-gray-50"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2a3460]">Short Description</label>
            <Editor
              value={formData.shortDescription}
              onTextChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.htmlValue || "" }))}
              style={{ height: '120px' }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2a3460]">Full Description</label>
            <Editor
              value={formData.description}
              onTextChange={(e) => setFormData(prev => ({ ...prev, description: e.htmlValue || "" }))}
              style={{ height: '200px' }}
            />
          </div>

          {/* Specifications */}
          <div className="grid md:grid-cols-3 gap-5">
            <input
              type="text"
              name="material"
              placeholder="Material"
              value={formData.material}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (KG)"
              value={formData.weight}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
          </div>

          {/* Dimensions */}
          <div className="grid md:grid-cols-3 gap-5">
            <input
              type="number"
              name="width"
              placeholder="Width"
              value={formData.width}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
            <input
              type="number"
              name="depth"
              placeholder="Depth"
              value={formData.depth}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />
          </div>

          {/* Image */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2a3460]">Thumbnail *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="border-[1.5px] border-[#c3c9e3] rounded-xl px-4 py-3 text-sm text-[#3a3f5c]"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-28 h-28 object-cover rounded-xl border mt-2"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl border-[1.5px] border-[#c3c9e3] text-sm font-medium text-[#3a3f5c] hover:bg-[#f4f5fb]"
            >
              Cancel
            </button>

            {!wait ? (
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#3b497e] hover:bg-[#2a3460] text-white rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
              >
                <FiSave size={16} />
                Save Product
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="bg-gray-400 text-white px-5 py-2.5 rounded-xl cursor-not-allowed"
              >
                Uploading...
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}