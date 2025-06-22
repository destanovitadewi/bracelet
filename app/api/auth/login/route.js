// app/api/auth/login/route.js
import { db } from "@/lib/firebase-admin";
import { compare } from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
        status: 400,
      });
    }

    const snapshot = await db
      .collection("users")
      .where("username", "==", username)
      .get();

    if (snapshot.empty) {
      return new Response(JSON.stringify({ message: "User tidak ditemukan" }), {
        status: 404,
      });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await compare(password, userData.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Password salah" }), {
        status: 401,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Login berhasil",
        user: {
          uid: userDoc.id,
          username: userData.username,
          role: userData.role,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server" }),
      { status: 500 }
    );
  }
}
