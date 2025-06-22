// app/admin/page.js
"use client";
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { isLoggedIn, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/admin/login');
    }
  }, [loading, isLoggedIn]);

  if (loading || !isLoggedIn) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Admin</h1>
      <p>Selamat datang, admin! Gunakan menu untuk kelola produk dan pesanan.</p>
    </div>
  );
}
