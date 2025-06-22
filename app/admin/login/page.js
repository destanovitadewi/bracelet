// app/admin/login/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      loginAdmin({ username });
      router.push('/admin'); // redirect ke beranda admin
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Admin</h2>
        <input type="text" placeholder="Username" autoComplete="off" required 
               value={username} onChange={(e) => setUsername(e.target.value)}
               className="w-full mb-4 p-2 border rounded" />
        <input type="password" placeholder="Password" required
               value={password} onChange={(e) => setPassword(e.target.value)}
               className="w-full mb-6 p-2 border rounded" />
        <button type="submit" className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600">
          Masuk
        </button>
      </form>
    </div>
  );
}
