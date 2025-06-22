"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useKeranjang } from "../contexts/KeranjangContext";
import { useAuth } from "../contexts/AuthContext";

export default function KeranjangPage() {
  const { keranjang, hapusDariKeranjang, kosongkanKeranjang } = useKeranjang();
  const { user } = useAuth();
  const [dipilih, setDipilih] = useState([]);

  const handleCheckbox = (id) => {
    setDipilih((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleCheckout = async () => {
    const itemDipilih = keranjang.filter((item) => dipilih.includes(item.id));

    if (itemDipilih.length === 0) {
      alert("Pilih produk terlebih dahulu!");
      return;
    }

    if (!user || !user.uid) {
      alert("Harus login terlebih dahulu!");
      return;
    }

    try {
      await addDoc(collection(db, "pesanan"), {
        userId: user.uid, // ✅ WAJIB ADA
        produk: itemDipilih,
        total: itemDipilih.reduce((total, item) => total + Number(item.harga), 0),
        tanggal: Timestamp.now(),
        status: "proses",
      });

      kosongkanKeranjang();
      setDipilih([]);
      alert("Checkout berhasil!");
    } catch (error) {
      console.error("Gagal checkout:", error);
      alert("Terjadi kesalahan saat checkout.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-rose-500 mb-6">Keranjang</h1>
      {keranjang.length === 0 ? (
        <p className="text-gray-500">Keranjang kosong.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {keranjang.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={dipilih.includes(item.id)}
                    onChange={() => handleCheckbox(item.id)}
                  />
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.nama}</h2>
                    <p className="text-sm text-rose-500">Rp{item.harga}</p>
                  </div>
                </div>
                <button
                  onClick={() => hapusDariKeranjang(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-6 bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
