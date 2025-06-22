import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_MHRNaTTMi_A8ecAIz3u4iRUZl3oxiY0",
  authDomain: "socialmedia2025-70f7e.firebaseapp.com",
  projectId: "socialmedia2025-70f7e",
  storageBucket: "socialmedia2025-70f7e.firebasestorage.app",
  messagingSenderId: "994366612794",
  appId: "1:994366612794:web:d4e0e7a1df72829478dc03",
  measurementId: "G-BCB1E0GQ2V",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { app, analytics, auth, db };