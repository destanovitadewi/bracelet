"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useKeranjang } from "../contexts/KeranjangContext";
import { useRouter } from "next/navigation";

export default function KatalogPage() {
  const { tambahKeKeranjang } = useKeranjang();
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const produkRef = collection(db, "produk");
        const q = query(produkRef, limit(30)); // Ambil maksimal 30 produk
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduk(data);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduk();
  }, []);

  const handlePesanSekarang = (item) => {
    tambahKeKeranjang(item);
    router.push("/keranjang");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-rose-500 mb-6">Katalog Gelang</h1>

      {loading ? (
        <p className="text-center text-gray-500">Memuat produk...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produk.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{item.nama}</h3>
                <p className="text-rose-500 font-medium">Rp{item.harga}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Stok:{" "}
                  {item.stok > 0 ? item.stok : <span className="text-red-500">Habis</span>}
                </p>

                <div className="mt-4 flex flex-col gap-2 mt-auto">
                  <button
                    disabled={item.stok <= 0}
                    onClick={() => tambahKeKeranjang(item)}
                    className={`w-full text-white text-sm py-2 rounded-lg transition ${
                      item.stok <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-rose-500 hover:bg-rose-600"
                    }`}
                  >
                    {item.stok <= 0 ? "Stok Habis" : "Tambah ke Keranjang"}
                  </button>

                  {item.stok > 0 && (
                    <button
                      onClick={() => handlePesanSekarang(item)}
                      className="w-full text-sm py-2 rounded-lg border border-rose-500 text-rose-500 hover:bg-rose-50"
                    >
                      Pesan Sekarang
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
