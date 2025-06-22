"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminNavbar from "../../components/AdminNavbar"; // pastikan file ini ada

export default function AdminProdukPage() {
  const [formProduk, setFormProduk] = useState({
    nama: "",
    harga: "",
    gambar: "",
    stok: "",
  });
  const [produkList, setProdukList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  // Ambil data produk dari Firestore
  const fetchProduk = async () => {
    const snapshot = await getDocs(collection(db, "produk"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProdukList(data);
  };

  useEffect(() => {
    if (isLoggedIn) fetchProduk();
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_USERNAME &&
      loginForm.password === ADMIN_PASSWORD
    ) {
      setIsLoggedIn(true);
    } else {
      alert("Username atau password salah!");
    }
  };

  const handleSubmitProduk = async (e) => {
    e.preventDefault();
    const { nama, harga, gambar, stok } = formProduk;

    if (!nama || !harga || !gambar || !stok) {
      alert("Semua field wajib diisi!");
      return;
    }

    const produkBaru = {
      nama,
      harga: Number(harga),
      gambar,
      stok: Number(stok),
    };

    if (editingId) {
      await updateDoc(doc(db, "produk", editingId), produkBaru);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "produk"), produkBaru);
    }

    setFormProduk({ nama: "", harga: "", gambar: "", stok: "" });
    fetchProduk();
  };

  const handleEdit = (produk) => {
    setFormProduk({
      nama: produk.nama,
      harga: produk.harga,
      gambar: produk.gambar,
      stok: produk.stok,
    });
    setEditingId(produk.id);
  };

  const handleHapus = async (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await deleteDoc(doc(db, "produk", id));
      fetchProduk();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-rose-600">Login Admin</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={loginForm.username}
            onChange={(e) =>
              setLoginForm({ ...loginForm, username: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar onLogout={() => setIsLoggedIn(false)} />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-rose-600">Kelola Produk</h1>

        <form onSubmit={handleSubmitProduk} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={formProduk.nama}
            onChange={(e) =>
              setFormProduk({ ...formProduk, nama: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Harga"
            value={formProduk.harga}
            onChange={(e) =>
              setFormProduk({ ...formProduk, harga: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Stok"
            value={formProduk.stok}
            onChange={(e) =>
              setFormProduk({ ...formProduk, stok: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="URL Gambar"
            value={formProduk.gambar}
            onChange={(e) =>
              setFormProduk({ ...formProduk, gambar: e.target.value })
            }
            className="p-2 border rounded"
          />
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-6 rounded w-full"
            >
              {editingId ? "Update Produk" : "Tambah Produk"}
            </button>
          </div>
        </form>

        <table className="w-full border text-sm">
          <thead className="bg-rose-100">
            <tr>
              <th className="border px-4 py-2">Gambar</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Stok</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produkList.map((produk) => (
              <tr key={produk.id}>
                <td className="border px-4 py-2">
                  <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">{produk.nama}</td>
                <td className="border px-4 py-2">Rp{produk.harga}</td>
                <td className="border px-4 py-2">{produk.stok}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(produk)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleHapus(produk.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
