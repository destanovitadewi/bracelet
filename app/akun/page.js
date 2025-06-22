"use client";

export default function AkunPage() {
  const user = {
    nama: "Desta Novita Dewi",
    email: "destanovitadw@mail.com",
    nohp: "0812-3456-7890",
    alamat: "Bandung, Jawa Barat",
    foto: "/foto-desta.jpeg", // pastikan file ini ada di folder /public
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-rose-500 mb-6 text-center">
        Akun Saya
      </h1>

      {/* Foto Profil */}
      <div className="flex justify-center mb-6">
        <img
          src={user.foto}
          alt="Foto Profil"
          className="w-32 h-32 rounded-full border-4 border-rose-300 shadow-md object-cover"
        />
      </div>

      {/* Info Akun */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <p className="text-sm text-gray-500">Nama Lengkap</p>
          <p className="text-lg font-medium text-gray-800">{user.nama}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium text-gray-800">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">No. HP</p>
          <p className="text-lg font-medium text-gray-800">{user.nohp}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Alamat</p>
          <p className="text-lg font-medium text-gray-800">{user.alamat}</p>
        </div>
      </div>
    </div>
  );
}
