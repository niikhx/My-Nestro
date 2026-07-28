import React from 'react';
import { FiLogOut, FiX } from 'react-icons/fi';

export default function Logout() {
  return (
    <div className="min-h-screen bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">

        {/* Close Button Icon */}
        <button className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <FiX size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-500/10 text-rose-400 mb-4 border border-rose-500/20">
            <FiLogOut size={22} />
          </div>
          <h3 className="text-lg font-bold text-white">Confirm Logout</h3>
          <p className="text-xs text-slate-400 mt-2">
            Are you sure you want to log out? You will need to enter your credentials and OTP again to access back.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex-1 py-2.5 bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 py-2.5 bg-rose-600 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/30"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}