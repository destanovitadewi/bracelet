// /app/api/auth/register/route.js
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { hash } from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'Data tidak lengkap' }), { status: 400 });
  }

  try {
    // Cek apakah username sudah ada
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return new Response(JSON.stringify({ message: 'Username sudah digunakan' }), { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Simpan user baru dengan role user (bukan admin)
    await addDoc(usersRef, {
      username,
      password: hashedPassword,
      role: 'user',
    });

    return new Response(JSON.stringify({ message: 'Registrasi berhasil' }), { status: 201 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan server' }), { status: 500 });
  }
}
