import ActionDropdown from "@/components/admin/ActionDropdown";
import StatusBtn from "@/components/admin/StatusBtn";
import { fetchCategory } from "@/utils/api.js";
import Link from "next/link";

export default async function ProductTable() {
  const category = await fetchCategory();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b flex justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <h2 className="text-xl font-semibold text-white">
          <Link href={'/admin/category/add'}>
            <button className="bg-amber-800 px-4 py-2 rounded-2xl hover:cursor-pointer">
              Category Add
            </button>
          </Link>
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-4">S.No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Thumbnail</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {category.data.map((cat, index) => (
              <tr
                key={cat._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{cat.name}</td>
                <td className="px-6 py-4">{cat.slug}</td>

                {/* Aapka original image code jaisa tha waisa hi hai */}
                <td className="px-6 py-4">
                  <span className="px-6 py-2 rounded-full text-sm">
                    <img src={cat.image} width={50} height={50} alt="add image" />
                  </span>
                </td>

                {/* FIX: Sirf in dono ko <td> tags ke andar daala hai */}
                <td className="px-6 py-4">
                  <StatusBtn status={cat.status} path={`/category/status-update/${cat._id}`} />
                </td>
                <td className="px-6 py-4 text-center">
                  <ActionDropdown id={cat._id} module={`/category`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}