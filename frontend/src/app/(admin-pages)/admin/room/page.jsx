import ActionDropdown from "@/components/admin/ActionDropdown";
import StatusBtn from "@/components/admin/StatusBtn";
import { fetchRoom } from "@/utils/api.js";
import Link from "next/link";

export default async function RoomTable() {
  const room = await fetchRoom();

  // "massage" ko "message" se fix kiya
  if (room.success === false) {
    throw new Error(room.message || "Internal Server Error");
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-5 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        {/* H2 tag se text-white aur unneeded styles hataye */}
        <Link href={'/admin/room/add'}>
          <button className="bg-amber-800 text-white px-4 py-2 rounded-2xl hover:cursor-pointer">
            Add Rooms
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-4">S.No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {room.data.map((item, index) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.slug}</td>

                {/* FIX: Components ko <td> tags ke andar wrap kiya */}
                <td className="px-6 py-4">
                  <StatusBtn status={item.status} path={`/room/status-update/${item._id}`} />
                </td>
                <td className="px-6 py-4 text-center">
                  <ActionDropdown id={item._id} module={`/room`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}