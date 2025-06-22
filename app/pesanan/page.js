"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";

export default function PesananPage() {
  const { user, loading: loadingUser } = useAuth();
  const [pesanan, setPesanan] = useState([]);
  const [loadingPesanan, setLoadingPesanan] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) return;

    const fetchPesanan = async () => {
      setLoadingPesanan(true);
      try {
        const q = query(
          collection(db, "pesanan"),
          where("userId", "==", user.uid),
          orderBy("tanggal", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPesanan(data);
      } catch (error) {
        console.error("Gagal memuat pesanan:", error);
      } finally {
        setLoadingPesanan(false);
      }
    };

    fetchPesanan();
  }, [user]);

  if (loadingUser) {
    return <p className="text-center py-10 text-gray-500">Memuat pengguna...</p>;
  }

  if (!user) {
    return <p className="text-center py-10 text-gray-500">Harap login untuk melihat pesanan.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-rose-500 mb-6">Daftar Pesanan</h1>

      {loadingPesanan ? (
        <p className="text-gray-500">Memuat pesanan...</p>
      ) : pesanan.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan.</p>
      ) : (
        <div className="space-y-6">
          {pesanan.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-800">
                  Tanggal: {format(order.tanggal.toDate(), "dd MMM yyyy HH:mm")}
                </span>
                <span className="text-sm text-black font-semibold capitalize">
                  Status: {order.status}
                </span>
              </div>
              <ul className="divide-y text-sm">
                {order.produk.map((item, idx) => (
                  <li key={idx} className="py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <span className="text-black font-medium">{item.nama}</span>
                    </div>
                    <span className="text-rose-600 font-semibold">
                      Rp{item.harga.toLocaleString("id-ID")}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-right text-black font-bold">
                Total: Rp{order.total.toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
