"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const KeranjangContext = createContext();

export const KeranjangProvider = ({ children }) => {
  const { user } = useAuth();
  const [keranjang, setKeranjang] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("keranjang");
    if (data) {
      setKeranjang(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

  const tambahKeKeranjang = (produk) => {
    setKeranjang((prev) => {
      const exists = prev.some((item) => item.id === produk.id);
      return exists ? prev : [...prev, produk];
    });
  };

  const hapusDariKeranjang = (id) => {
    setKeranjang((prev) => prev.filter((item) => item.id !== id));
  };

  const kosongkanKeranjang = () => {
    setKeranjang([]);
    localStorage.removeItem("keranjang");
  };

  const checkout = async () => {
    if (!user || !user.uid) {
      alert("Harus login terlebih dahulu");
      return;
    }

    try {
      // Validasi stok cukup
      for (const item of keranjang) {
        const produkRef = doc(db, "produk", item.id);
        const produkSnap = await getDoc(produkRef);

        if (!produkSnap.exists()) {
          alert(`Produk ${item.nama} tidak ditemukan`);
          return;
        }

        const produkData = produkSnap.data();

        if (produkData.stok === undefined) {
          alert(`Produk ${item.nama} belum memiliki stok`);
          return;
        }

        if (produkData.stok < 1) {
          alert(`Stok produk ${item.nama} habis`);
          return;
        }
      }

      // Kurangi stok
      for (const item of keranjang) {
        const produkRef = doc(db, "produk", item.id);
        const produkSnap = await getDoc(produkRef);
        const currentStok = produkSnap.data().stok;

        await updateDoc(produkRef, {
          stok: currentStok - 1, // bisa dikembangkan ke quantity > 1
        });
      }

      // Tambahkan ke koleksi pesanan
      const total = keranjang.reduce((sum, item) => sum + Number(item.harga), 0);

      await addDoc(collection(db, "pesanan"), {
        userId: user.uid,
        produk: keranjang,
        tanggal: Timestamp.now(),
        total,
        status: "diproses",
      });

      kosongkanKeranjang();
      alert("Checkout berhasil!");
    } catch (err) {
      alert("Checkout gagal");
      console.error(err);
    }
  };

  return (
    <KeranjangContext.Provider
      value={{
        keranjang,
        tambahKeKeranjang,
        hapusDariKeranjang,
        kosongkanKeranjang,
        checkout,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
};

export const useKeranjang = () => useContext(KeranjangContext);
