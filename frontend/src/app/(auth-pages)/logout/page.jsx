// 'use client'

// import React, { useState } from 'react';
// import { FiX as CloseIcon, FiLogOut as LogOutIcon } from 'react-icons/fi';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { emptyCart } from '@/redux/features/cartSlice';
// import { client } from '@/utils/helper.js';

// export default function Logout() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);

//   const handleCancel = () => {
//     router.back();
//   };

//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       await client.get("user/logout");
//     } catch (error) {
//       console.error("Logout Error:", error);
//     } finally {
//       dispatch(emptyCart());
//       setLoading(false);
//       router.push("/");
//       router.refresh();
//     }
//   };

//   return (
//     <div className="fixed inset-0 min-h-screen bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//       <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">

//         {/* Close Button Icon */}
//         <button
//           onClick={handleCancel}
//           className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
//         >
//           <CloseIcon size={18} />
//         </button>

//         {/* Modal Header */}
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-500/10 text-rose-400 mb-4 border border-rose-500/20">
//             <LogOutIcon size={22} />
//           </div>
//           <h3 className="text-lg font-bold text-white">Confirm Logout</h3>
//           <p className="text-xs text-slate-400 mt-2">
//             Are you sure you want to log out? You will need to enter your credentials again to access your account.
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="mt-6 flex gap-3">
//           <button
//             type="button"
//             onClick={handleCancel}
//             disabled={loading}
//             className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleLogout}
//             disabled={loading}
//             className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/30 transition-colors disabled:opacity-50"
//           >
//             {loading ? "Logging out..." : "Logout"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }