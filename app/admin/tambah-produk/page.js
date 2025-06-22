"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function TambahProdukPage() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [gambar, setGambar] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama || !harga || !stok || !gambar) {
      alert("Semua field wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "produk"), {
        nama,
        harga: Number(harga),
        stok: Number(stok),
        gambar,
      });

      alert("Produk berhasil ditambahkan!");
      router.push("/admin"); // kembali ke dashboard admin
    } catch (err) {
      console.error("Gagal tambah produk:", err);
      alert("Gagal menambahkan produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-rose-500 mb-6 text-center">Tambah Produk Baru</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
        <input
          type="text"
          placeholder="Nama Produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Link Gambar (URL)"
          value={gambar}
          onChange={(e) => setGambar(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600"
        >
          {loading ? "Menambahkan..." : "Tambah Produk"}
        </button>
      </form>
    </div>
  );
}
