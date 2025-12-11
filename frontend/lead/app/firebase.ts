// app/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIfabDrtRqTAiIM3fJf7y3oZ--8ys0HZg",
  authDomain: "lead-48cd1.firebaseapp.com",
  projectId: "lead-48cd1",
  storageBucket: "lead-48cd1.firebasestorage.app",
  messagingSenderId: "412758757312",
  appId: "1:412758757312:web:0ccd93d9bd66bc29518225",
  measurementId: "G-B746YG8EMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client-side
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;