// lib/firebase-admin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Optional, kalau pakai Storage
    });
    console.log("✅ Firebase Admin Initialized");
  } catch (error) {
    console.error("❌ Firebase Admin Init Error:", error);
  }
}

// Export semua yang dibutuhkan
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage?.(); // Optional chaining

export { admin, db, auth, storage };
