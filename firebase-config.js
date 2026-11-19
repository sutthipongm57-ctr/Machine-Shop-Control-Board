// ค่าตั้งของโปรเจกต์ Firebase
// คัดลอกจาก Firebase Console → Project settings → Your apps → Web app → SDK setup and configuration (Config)
// ค่าเหล่านี้เปิดเผยได้ ความปลอดภัยมาจาก firestore.rules และระบบล็อกอิน
window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
