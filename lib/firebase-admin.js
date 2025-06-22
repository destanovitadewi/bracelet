// lib/firebase-admin.js
import admin from "firebase-admin";

// Cek apakah sudah diinisialisasi
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
    throw new Error("❌ Firebase Admin environment variables are missing.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();
