// /components/AdminNavbar.js
"use client";

import Link from "next/link";

export default function AdminNavbar({ onLogout }) {
  return (
    <nav className="bg-rose-500 p-4 flex justify-between items-center text-white">
      <div className="space-x-4">
        <Link href="/admin/produk" className="hover:underline">
          Kelola Produk
        </Link>
        <Link href="/admin/pesanan" className="hover:underline">
          Lihat Pesanan
        </Link>
      </div>
      <button onClick={onLogout} className="bg-white text-rose-500 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
