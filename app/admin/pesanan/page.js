// /app/admin/pesanan/page.js
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminPesananPage() {
  const [pesanan, setPesanan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPesanan = async () => {
    try {
      const q = query(collection(db, "pesanan"), orderBy("tanggal", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPesanan(data);
    } catch (err) {
      console.error("Gagal mengambil data pesanan:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPesanan();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-rose-600 mb-6">Semua Pesanan</h1>
        {loading ? (
          <p>Memuat data pesanan...</p>
        ) : pesanan.length === 0 ? (
          <p>Tidak ada pesanan.</p>
        ) : (
          <table className="w-full border border-gray-300 rounded">
            <thead className="bg-rose-100">
              <tr>
                <th className="border px-4 py-2">User ID</th>
                <th className="border px-4 py-2">Produk</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {pesanan.map((p) => (
                <tr key={p.id}>
                  <td className="border px-4 py-2">{p.userId}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc pl-4">
                      {p.produk?.map((item, i) => (
                        <li key={i}>{item.nama} - Rp{item.harga}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2">Rp{p.total}</td>
                  <td className="border px-4 py-2 capitalize">{p.status}</td>
                  <td className="border px-4 py-2">
                    {new Date(p.tanggal?.seconds * 1000).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
