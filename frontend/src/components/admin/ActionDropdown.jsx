'use client'
import React from 'react';
import { toast } from 'sonner';
import { client } from '@/utils/helper';
import { useState } from 'react';
import { FiEye, FiEdit3, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function ActionDropdown({ id, module
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter()
  function deleteHandler() {
    client.delete(`${module}/delete/${id}`).then(
      (response) => {
        if (response.data.success) {
          toast.success(response.data.massage)
          router.refresh()
        }

      }).catch(
        (error) => {
          toast.error(error.response.data.massage || 'Internal Server Error')
        }
      )

  }
  return (
    <>

      <div className="flex items-center justify-center gap-2">
        {/* View Button */}
        <button
          onClick={() => setOpenDropdown(openDropdown === id ? null : id)} // Aapka original logic
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="View"
        >
          <FiEye className="w-5 h-5" />
        </button>

        {/* Edit Link & Button */}
        <Link href={`/admin${module}/edit/${id}`}>
          <button
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Edit"
          >
            <FiEdit3 className="w-5 h-5" />
          </button>
        </Link>

        {/* Delete Button */}
        <button
          onClick={deleteHandler} // Aapka original logic
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="Delete"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

    </>
  )
}