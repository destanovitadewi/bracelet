// lib/firebase-admin.js
import admin from "firebase-admin";

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!privateKey || !clientEmail || !projectId) {
    throw new Error("Missing Firebase Admin environment variables.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey,
      clientEmail,
      projectId,
    }),
  });
}

export const db = admin.firestore();
