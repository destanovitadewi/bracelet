"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { useKeranjang } from "../contexts/KeranjangContext";

// ===== ICONS =====
function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25v-7.5z" />
    </svg>
  );
}
function GiftIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4m0 0v6a2 2 0 002 2h12a2 2 0 002-2v-6m-16 0l1.5-7.5a1 1 0 011-.5h11a1 1 0 011 .5L20 12" />
    </svg>
  );
}
function BagIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7V6a4 4 0 118 0v1m-8 0h8m-8 0a2 2 0 00-2 2v9a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2" />
    </svg>
  );
}
function UserIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.004 9.004 0 0112 15a9.004 9.004 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function MenuIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ===== COMPONENT =====
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn, loading, logout } = useAuth();
  const { keranjang } = useKeranjang();
  const router = useRouter();

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/register");
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <nav className="bg-white/80 border-b sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-rose-500"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 border-b sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo onClick={() => router.push("/")} />

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/" icon={<HomeIcon className="w-5 h-5" />} text="Beranda" />
          <NavLink href="/katalog" icon={<GiftIcon className="w-5 h-5" />} text="Katalog" />

          {isLoggedIn && (
            <>
              <NavLink href="/keranjang" icon={
                <div className="relative">
                  <BagIcon className="w-5 h-5" />
                  {keranjang.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {keranjang.length}
                    </span>
                  )}
                </div>
              } text="Keranjang" />

              <NavLink href="/pesanan" icon={<BagIcon className="w-5 h-5" />} text="Pesanan" />
              <NavLink href="/akun" icon={<UserIcon className="w-5 h-5" />} text="Akun" />
            </>
          )}
          {user?.role === "admin" && (
            <NavLink href="/admin/produk" icon={<GiftIcon className="w-5 h-5" />} text="Admin Produk" />
          )}

          {!isLoggedIn ? (
            <>
              <button onClick={handleLogin} className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600">
                Login
              </button>
              <button onClick={handleRegister} className="px-4 py-2 text-sm rounded-lg border border-rose-500 text-rose-500 hover:bg-rose-50 ml-2">
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Hi, {user?.username}</span>
              <button onClick={handleLogout} className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-gray-100 transition" aria-label="Toggle menu">
            {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <MobileNavLink href="/" icon={<HomeIcon className="w-5 h-5" />} text="Beranda" />
          <MobileNavLink href="/katalog" icon={<GiftIcon className="w-5 h-5" />} text="Katalog" />
          {isLoggedIn && (
            <>
              <MobileNavLink href="/keranjang" icon={<BagIcon className="w-5 h-5" />} text={`Keranjang (${keranjang.length})`} />
              <MobileNavLink href="/pesanan" icon={<BagIcon className="w-5 h-5" />} text="Pesanan" />
              <MobileNavLink href="/akun" icon={<UserIcon className="w-5 h-5" />} text="Akun" />
            </>
          )}
          {user?.role === "admin" && (
            <MobileNavLink href="/admin/produk" icon={<GiftIcon className="w-5 h-5" />} text="Admin Produk" />
          )}
          {!isLoggedIn ? (
            <>
              <button onClick={() => { handleLogin(); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50">Login</button>
              <button onClick={() => { handleRegister(); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-50">Register</button>
            </>
          ) : (
            <button onClick={() => { handleLogout(); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-white bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

// ===== Logo Component =====
function Logo({ onClick }) {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center">
        <GiftIcon className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
        Gelangku.id
      </span>
    </div>
  );
}

// ===== Links =====
function NavLink({ href, icon, text }) {
  return (
    <a href={href} className="flex items-center space-x-2 text-sm text-gray-700 hover:text-rose-500 transition">
      {icon}
      <span>{text}</span>
    </a>
  );
}

function MobileNavLink({ href, icon, text }) {
  return (
    <a href={href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50">
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  );
}
