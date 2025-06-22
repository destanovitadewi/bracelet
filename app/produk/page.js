"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useKeranjang } from "@/app/contexts/KeranjangContext";

export default function KatalogPage() {
  const [produk, setProduk] = useState([]);
  const { tambahKeKeranjang } = useKeranjang();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "produk"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProduk(data);
    });
    return () => unsub();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-rose-500 mb-6">Katalog Gelang</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produk.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.gambar} alt={item.nama} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.nama}</h3>
              <p className="text-rose-500 font-medium">{item.harga}</p>
              <button
                className="mt-3 w-full bg-rose-500 hover:bg-rose-600 text-white text-sm py-2 rounded-lg transition"
                onClick={() => tambahKeKeranjang(item)}
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
