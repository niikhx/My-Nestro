
import { RiImageAddFill } from "react-icons/ri";
import ActionDropdown from "@/components/admin/ActionDropdown";
import StatusBtn from "@/components/admin/StatusBtn";
import { fetchProduct } from "@/utils/api.js";
import Link from "next/link";

export default async function ProductTable() {
  const product = await fetchProduct();

  // स्पेलिंग को 'message' में सुधारा
 

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <Link href={'/admin/product/add'}>
          <button className="bg-amber-800 text-white px-4 py-2 rounded-2xl hover:cursor-pointer text-sm font-medium">
            Product Add
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-4">S.No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Price | Discount</th>
              <th className="px-6 py-4">Thumbnail</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Add Images</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {product.data && product.data.map((pro, index) => (
              <tr
                key={pro._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{pro.name}</td>

                {/* API के अनुसार 'salePrice' की जगह 'sale' का इस्तेमाल किया */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  ₹{pro.salePrice} | {pro.discount}% Off
                </td>

                <td className="px-6 py-4">
                  <img
                    src={pro.thumbnail || "/placeholder.jpg"}
                    width={50}
                    height={50}
                    alt={pro.name}
                    className="object-cover rounded-md border"
                  />
                </td>

                <td className="px-6 py-4">
                  <StatusBtn status={pro.status} path={`/product/status-update/${pro._id}`} />
                </td>

                <td className="px-6 py-4">
                  <Link href={`/admin/product/add-images/${pro._id}`}>
                    <RiImageAddFill className="text-2xl ml-8" />
                  </Link>
                </td>

                <td className="px-6 py-4 text-center">
                  <ActionDropdown id={pro._id} module={`/product`} />
                </td>
              </tr>
            ))}

            {/* अगर कोई प्रोडक्ट न हो तो खाली रो दिखाना */}
            {(!product.data || product.data.length === 0) && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No Products Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}